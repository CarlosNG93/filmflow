
import { useState } from 'react';

const useForm = <T extends Object>(initialState: T) => {
    const [form, setForm] = useState(initialState);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value,
        });
    };

    const reset = () => {
        setForm(initialState);
    };

    return {
        form,
        handleChange,
        reset,
    };
};

export default useForm;
