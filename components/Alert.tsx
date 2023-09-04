
import React from 'react';

interface AlertProps {
    type: 'success' | 'error' | 'info';
    children?: React.ReactNode;
}

const Alert: React.FC<AlertProps> = ({ type, children }) => (
    <div className={`alert-${type}`}>
        {children}
    </div>
);

export default Alert;
