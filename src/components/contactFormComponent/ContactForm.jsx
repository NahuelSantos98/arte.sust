import { useContext, useEffect, useState } from "react"
import { useForm } from "react-hook-form"
import { LanguageContext } from "../../context/languageContext"
import style from './contactForm.module.css'

const siteKey = import.meta.env.VITE_RECAPTCHA_SITE_KEY

const loadRecaptcha = (key) => {
    if (window.grecaptcha) {
        return new Promise((resolve) => {
            window.grecaptcha.ready(() => resolve(window.grecaptcha))
        })
    }

    return new Promise((resolve, reject) => {
        const script = document.createElement('script')
        script.src = `https://www.google.com/recaptcha/api.js?render=${key}`
        script.async = true
        script.onload = () => window.grecaptcha.ready(() => resolve(window.grecaptcha))
        script.onerror = () => reject(new Error('recaptcha'))
        document.head.appendChild(script)
    })
}

const ContactForm = () => {
    const { state } = useContext(LanguageContext)
    const isEnglish = state.language
    const { register, handleSubmit, formState: { errors }, watch, reset } = useForm()
    const [sent, setSent] = useState(false)
    const [sending, setSending] = useState(false)
    const [sendError, setSendError] = useState('')

    const commentValue = watch("comment", "")
    const lengthComment = commentValue.length

    useEffect(() => {
        if (!siteKey) return
        loadRecaptcha(siteKey).catch(() => {})
    }, [])

    const submitForm = async (data) => {
        setSendError('')
        setSent(false)

        if (!siteKey) {
            setSendError(isEnglish ? "The contact form is not configured yet." : "El formulario todavía no está configurado.")
            return
        }

        setSending(true)

        try {
            const grecaptcha = await loadRecaptcha(siteKey)
            const recaptchaToken = await grecaptcha.execute(siteKey, { action: 'contact' })
            const response = await fetch('/contactMail.php', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    name: data.name,
                    email: data.email,
                    number: data.number,
                    comment: data.comment,
                    recaptchaToken,
                }),
            })
            const result = await response.json().catch(() => ({}))

            if (!response.ok || !result.ok) {
                throw new Error('send failed')
            }

            setSent(true)
            reset()
        } catch {
            setSendError(isEnglish ? "The message could not be sent. Try again." : "No se pudo enviar el mensaje. Intentá de nuevo.")
        } finally {
            setSending(false)
        }
    }

    return (
        <div className={style.containerFormAndThanks}>

            <form onSubmit={handleSubmit(submitForm)} className={style.formContainer}>
                        <h3>{isEnglish ? "Let's talk!!" : 'Hablemos!!'}</h3>
                        <div className={style.inputContainer}>
                            <input
                                placeholder={isEnglish ? "Name and Surname" : "Nombre y Apellido"}
                                type="text"
                                name="name"
                                id="name"
                                {...register("name", {
                                    required: {
                                        value: true,
                                        message: isEnglish ? "The name is required" : "El nombre es requerido"
                                    },
                                    maxLength: {
                                        value: 200,
                                        message: isEnglish ? "The maximum number of characters is 200" : "El máximo de caracteres es 200"
                                    },
                                    minLength: {
                                        value: 3,
                                        message: isEnglish ? "The minimum number of characters is 3" : "El mínimo de caracteres es 3"
                                    },
                                    pattern: {
                                        value: /^[A-Za-zÁÉÍÓÚáéíóúÑñ\s]+$/,
                                        message: isEnglish ? "Only letters and spaces allowed" : "Solo se permiten letras y espacios"
                                    }
                                })}
                            />
                            {errors.name && <span className={style.errorMessageInput}>{errors.name.message}</span>}
                        </div>


                        <div className={style.inputContainer}>
                            <input
                                placeholder="Email"
                                type="email"
                                name="email"
                                id="email"
                                {...register("email", {
                                    required: {
                                        value: true,
                                        message: isEnglish ? "The email is required" : "El email es requerido"
                                    },
                                    pattern: {
                                        value: /^[\w.%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/,
                                        message: isEnglish ? "It must be a valid email" : "Introduzca un email válido"
                                    },
                                    minLength: {
                                        value: 5,
                                        message: isEnglish ? "The minimum number of characters is 5" : "El mínimo de caracteres es 5"
                                    },
                                })}
                            />
                            {errors.email && <span className={style.errorMessageInput}>{errors.email.message}</span>}
                        </div>

                        <div className={style.inputContainer}>
                            <input
                                placeholder={isEnglish ? "Phone Number" : "Teléfono"}
                                name="number"
                                id="number"
                                type="tel"
                                {...register("number", {
                                    required: {
                                        value: true,
                                        message: isEnglish ? "The phone number is required" : "El número de teléfono es requerido"
                                    },
                                    minLength: {
                                        value: 5,
                                        message: isEnglish ? "The minimum number of digits is 5" : "El mínimo de dígitos es 5"
                                    },
                                    maxLength: {
                                        value: 15,
                                        message: isEnglish ? "The maximum number of digits is 15" : "El máximo de dígitos es 15"
                                    },
                                    pattern: {
                                        value: /^[0-9]+$/,
                                        message: isEnglish ? "Only numbers are allowed" : "Solo se permiten números"
                                    }
                                })}
                            />
                            {errors.number && <span className={style.errorMessageInput}>{errors.number.message}</span>}

                        </div>

                        <div className={`${style.textareaContainer} ${style.inputContainer}`}>
                            <textarea
                                placeholder={isEnglish ? "Comment" : "Comentario"}
                                name="comment"
                                id="comment"
                                maxLength={200}
                                {...register("comment", {
                                    required: {
                                        value: true,
                                        message: isEnglish ? "The comment is required" : "El comentario es requerido"
                                    },
                                    minLength: {
                                        value: 3,
                                        message: isEnglish ? "The minimum number of characters is 3" : "El mínimo de caracteres es 3"
                                    },
                                    maxLength: {
                                        value: 200,
                                        message: isEnglish ? "The maximum number of characters is 200" : "El máximo de caracteres es 200"
                                    }
                                })}
                            />
                            <p>{lengthComment}/200</p>
                            {errors.comment && <span className={style.errorMessageInput}>{errors.comment.message}</span>}
                        </div>

                            <div className={`${style.inputContainer} ${style.buttonSubmitContainer}`}>
                            <button className={style.submitFormComment} type="submit" disabled={sending}>
                                {sending ? (isEnglish ? "Sending..." : "Enviando...") : (isEnglish ? "Send" : "Enviar")}
                            </button>
                            {sendError && <span className={style.errorMessageInput}>{sendError}</span>}
                            </div>
                    </form>

        {sent &&
            <div className={style.confirmationMessageContainer}>
                <p>{isEnglish? "The email has been sent, in a few days Sabrina will contact you." : "El email fue enviado, en unos dias Sabrina se contactara contigo"}</p>
            </div>
            }

        </div>
    )
}

export default ContactForm
