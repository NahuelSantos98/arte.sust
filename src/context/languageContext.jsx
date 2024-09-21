import { createContext, useReducer } from "react";

const initialState = {
    language: JSON.parse(localStorage.getItem('language')) ?? false,
};

function reducer(state, action) {
    switch (action.type) {
        case 'CHANGE_LANGUAGE_SPANISH': {
            localStorage.setItem('language', false); 
            return { ...state, language: false };
        }
        case 'CHANGE_LANGUAGE_ENGLISH': {
            localStorage.setItem('language', true); 
            return { ...state, language: true };
        }
        default:
            throw new Error('Tipo de acción desconocida');
    }
}

export const LanguageContext = createContext();

export const LanguageContextProvider = ({ children }) => {
    const [state, dispatch] = useReducer(reducer, initialState);

    const changeLanguageSpanish = () => {
        dispatch({ type: 'CHANGE_LANGUAGE_SPANISH' });
    };

    const changeLanguageEnglish = () => {
        dispatch({ type: 'CHANGE_LANGUAGE_ENGLISH' });
    };

    return (
        <LanguageContext.Provider value={{ state, changeLanguageSpanish, changeLanguageEnglish }}>
            {children}
        </LanguageContext.Provider>
    );
};
