
import React from 'react';

interface ButtonProps {
    variant: 'primary' | 'secondary';
    onClick: () => void;
    children?: React.ReactNode;
}

const Button: React.FC<ButtonProps> = ({ variant, onClick, children }) => (
    <button className={`btn-${variant}`} onClick={onClick}>
        {children}
    </button>
);

export default Button;
