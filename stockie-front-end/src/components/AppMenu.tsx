import { AppBar, Toolbar, IconButton, Typography, Button } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import { Link, useLocation } from "react-router-dom";
import React from 'react';


export const AppMenu = () => {
    const location = useLocation();
    const path = location.pathname;

    return (
        <AppBar position="static">
            <Toolbar>
                <Button
                    variant={path.startsWith("/users") ? "outlined" : "text"}
                    to="/users"
                    component={Link}
                    color="inherit"
                    sx={{ mr: 5 }}>
                    Users
                </Button>
                <Typography
                    variant="h6"
                    noWrap
                    component="a"
                    href="/"
                    sx={{
                        mr: 2,
                        fontFamily: "monospace",
                        fontWeight: 700,
                        letterSpacing: ".3rem",
                        color: "inherit",
                        textDecoration: "none",
                        flexGrow: 1
                    }}>
                    Stockie
                </Typography>
                <Button
                    variant={path.startsWith("/dashboard") ? "outlined" : "text"}
                    to="/dashboard"
                    component={Link}
                    color="inherit"
                    sx={{ mr: 2 }}>
                    Dashboard
                </Button>
            </Toolbar>
        </AppBar>
    );
};
