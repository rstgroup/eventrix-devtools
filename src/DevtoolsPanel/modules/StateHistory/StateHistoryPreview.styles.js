export const paperStyles = (theme) => ({
    height: "calc(100vh - 126px)",
    position: "absolute",
    top: 0,
    right: 0,
    width: theme.breakpoints.between('xs', 'md') ? "calc(100vw - 80px)" : "calc(100vw - 230px)",
    maxWidth: "600px",
    zIndex: 1
});

export const contentStyles = (theme) => ({
    height: "calc(100vh - 210px)",
    overflow: "auto",
});
