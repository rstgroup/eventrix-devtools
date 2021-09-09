import React, {useCallback, useEffect, useState} from 'react';
import SearchField from "./SearchField";
import styles from './SearchBox.scss';
import Button from "../Button";
import classnames from "classnames";

const SearchBox = ({ placeholder, filtersStateName, label, filters: FilterComponent }) => {
    const [isFilterTooltipOpened, setFiltersTooltipOpened] = useState(false);
    const toggleFiltersTooltip = useCallback(() => {
        setFiltersTooltipOpened(!isFilterTooltipOpened);
    }, [isFilterTooltipOpened, setFiltersTooltipOpened]);
    useEffect(() => {

    }, [isFilterTooltipOpened, setFiltersTooltipOpened])
    return (
        <div className={styles.SearchBox}>
            <SearchField label={label} filtersStateName={filtersStateName} />
            {FilterComponent ?
                <div className={styles.filters}>
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
