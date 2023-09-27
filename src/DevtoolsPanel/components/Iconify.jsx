import {forwardRef} from "react";
import { Icon } from "@iconify/react";
import { Box } from "@mui/material";

// eslint-disable-next-line react/prop-types,react/display-name
const Iconify = forwardRef(({ icon, width = 20, sx, ...other }, ref) => (
    <Box ref={ref} component={Icon} icon={icon} sx={{ width, height: width, ...sx }} {...other} />
));

export default Iconify;
