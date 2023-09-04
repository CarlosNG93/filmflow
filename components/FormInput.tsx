

import React from 'react';

interface FormInputProps {
    label: string;
    type: string;
    placeholder?: string;
    value: string;
    onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
    errorMessage?: string;
}

const FormInput: React.FC<FormInputProps> = ({
    label,
    type,
    placeholder,
    value,
    onChange,
    errorMessage
}) => {
    return (
        <div>
            <label>{label}</label>
            <input type={type} placeholder={placeholder} value={value} onChange={onChange} />
            {errorMessage && <p>{errorMessage}</p>}
        </div>
    );
}

export default FormInput;
