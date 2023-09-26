import * as React from 'react';
import MenuList from '@mui/material/MenuList';
import MenuItem from '@mui/material/MenuItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemIcon from '@mui/material/ListItemIcon';
import {
    DateRangeIcon, EmitIcon,
    HistoryIcon,
    ListenerIcon,
    ReceiverIcon,
    StorageIcon
} from "../../components/icons";
import {ROUTES} from "../../constants/routes";
import {useEventrixState} from "eventrix";
import Tooltip from "@mui/material/Tooltip";
import {Stack, useMediaQuery, useTheme} from "@mui/material";
import {itemTextStyles, logoStyles, navbarStyles} from "./Menu.styles";

const routesList = [
    {
        path: ROUTES.CURRENT_STATE,
        label: 'Current State',
        icon: <StorageIcon />
    },
    {
        path: ROUTES.STATE_HISTORY,
        label: 'State History',
        icon: <DateRangeIcon />
    },
    {
        path: ROUTES.EVENTS_HISTORY,
        label: 'Events History',
        icon: <HistoryIcon />
    },
    {
        path: ROUTES.EMITTER,
        label: 'Emitter',
        icon: <EmitIcon />
    }
]



const Menu = () => {
    const [currentRoute, setCurrentRoute] = useEventrixState('currentRoute');
    const theme = useTheme();
    const isSmallScreen = useMediaQuery(theme.breakpoints.between('xs', 'md'));

    return (
        <Stack sx={navbarStyles}>
            <Stack sx={logoStyles}>
                <img alt="Eventrix devtools" src={isSmallScreen ? "assets/eventrix_128x128.png" : "assets/logo_devtools.svg"} />
            </Stack>
            <MenuList>
                {routesList.map(({path, label, icon}) => (
                    <MenuItem key={path} onClick={() => setCurrentRoute(path)} selected={currentRoute === path}>
                        <Tooltip title={label}>
                            <ListItemIcon>
                                {icon}
                            </ListItemIcon>
                        </Tooltip>
                        <ListItemText sx={itemTextStyles}>{label}</ListItemText>
                    </MenuItem>
                ))}
            </MenuList>
        </Stack>
    );
}

export default Menu;
