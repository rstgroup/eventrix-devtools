import React, {useCallback, useEffect, useRef, useState} from 'react';
import SearchField from "./SearchField";
import styles from './SearchBox.scss';
import Button from "../Button";
import classnames from "classnames";

const SearchBox = ({ placeholder, filtersStateName, label, filters: FilterComponent }) => {
    const [isFilterTooltipOpened, setFiltersTooltipOpened] = useState(false);
    const filtersRef = useRef();

    const toggleFiltersTooltip = useCallback(() => {
        setFiltersTooltipOpened(!isFilterTooltipOpened);
    }, [isFilterTooltipOpened, setFiltersTooltipOpened]);

    const clickOutsideListener = useCallback((e) => {
        if(!filtersRef.current.contains(e.target)) {
            setFiltersTooltipOpened(false);
        }
    }, [filtersRef, setFiltersTooltipOpened]);

    useEffect(() => {
        window.addEventListener('click', clickOutsideListener);
        return () => {
            window.removeEventListener('click', clickOutsideListener);
        }
    }, [clickOutsideListener, filtersRef]);

    return (
        <div className={styles.SearchBox}>
            <SearchField label={label} filtersStateName={filtersStateName} />
            {FilterComponent ?
                <div className={styles.filters} ref={filtersRef}>
                    <Button kind="primary" onClick={toggleFiltersTooltip}>Filters</Button>
                    <div
                        className={
                            classnames({
                                [styles.filtersTooltip]: true,
                                [styles.opened]: isFilterTooltipOpened,
                            })
                        }
                    >
                        <FilterComponent filtersStateName={filtersStateName} />
                    </div>
                </div>
                : null
            }
        </div>
    )
};

export default SearchBox;
