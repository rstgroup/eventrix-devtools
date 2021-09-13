import React, { useCallback } from 'react';
import { useEventrixState } from "eventrix";

const RouteLink = ({ children, to, component, className, activeClassName }) => {
    const [currentRoute, setCurrentRoute] = useEventrixState('currentRoute');
    const isActive = currentRoute === to;
    const redirect = useCallback((e) => {
        e.preventDefault();
        e.stopPropagation();
        if (!isActive) {
            setCurrentRoute(to)
        }
    }, [isActive, to, setCurrentRoute]);

    if (component) {
        const LinkComponent = component;
        return (
            <LinkComponent onClick={redirect} isActive={isActive}>
                {children}
            </LinkComponent>
        );
    }
    return (
        <a onClick={redirect} className={isActive ? activeClassName : className}>
            {children}
        </a>
    );
};

export default RouteLink;
