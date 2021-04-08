import React from 'react';
import styles from './ModuleHeader.scss';

const ModuleHeader = ({ children, icon, title }) => {
    return (
        <div className={styles.moduleHeader}>
            <h2>{icon} {title}</h2>
            <div className={styles.actionButtons}>
                {children}
            </div>
        </div>
    )
};

export default ModuleHeader;
