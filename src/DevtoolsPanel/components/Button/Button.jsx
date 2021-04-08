import React from 'react';
import styles from './Button.scss';

const Button = ({ children, onClick, kind = 'default' }) => {
    const kinds = {
        default: styles.default,
        primary: styles.primary,
        secondary: styles.secondary,
        positive: styles.positive,
        negative: styles.negative,
    };
    return (
        <button onClick={onClick} className={kinds[kind]}>
            {children}
        </button>
    )
};

export default Button;
