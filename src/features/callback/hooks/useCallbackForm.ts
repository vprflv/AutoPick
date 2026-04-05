import React, {useState} from "react";


export function useCallbackForm(){
    const [consent, setConsent] = useState(false);

    const [formData, setFormData] = useState({
        name: '',
        phone: '',
        email: '',
        comment: '',
        source: 'Неизвестная страница',
        privacy: false,
    });


    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
        if (error) resetState();
    };
}