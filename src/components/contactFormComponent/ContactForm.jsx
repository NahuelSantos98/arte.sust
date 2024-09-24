import { useContext, useState } from "react"
import { useForm } from "react-hook-form"
import { LanguageContext } from "../../context/languageContext"
import contacto from '../../utils/img/contacto.jpeg' 

const ContactForm = () => {
    const { state } = useContext(LanguageContext)
    const isEnglish = state.language
    const { register, handleSubmit, formState: { errors }, watch } = useForm()
    const [sent, setSent] = useState(false)

    const commentValue = watch("Comment", "")
    const lengthComment = commentValue.length

    const submitForm = (data) => {
        console.log(data)
        setSent(true)
    }

    return (
        <div>
            <img src={contacto} alt="Imagen Sabrina Sust" />
            {
                !sent ? 
                <form  onSubmit={handleSubmit(submitForm)}>
                <input
                    placeholder={isEnglish ? "Name and Surname" : "Nombre y Apellido"}
                    type="text"
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
                {errors.name && <span>{errors.name.message}</span>}

                <input
                    placeholder="Email"
                    type="email"
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
                {errors.email && <span>{errors.email.message}</span>}

                <input
                    placeholder={isEnglish ? "Phone Number" : "Teléfono"}
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
                {errors.number && <span>{errors.number.message}</span>}
                
                <div>
                    <input 
                        placeholder={isEnglish ? "Comment" : "Comentario"}
                        type="text" 
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
                </div>

                {errors.Comment && <span>{errors.Comment.message}</span>}
                
                <button type="submit">{isEnglish ? "Send" : "Enviar"}</button>
            </form>
            :
                <div>
                    <h3>Gracias por contactarte conmigo!</h3>
                </div>
            }
        </div>
    )
}

export default ContactForm
