import React, {useState} from 'react';
import {makeStyles} from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu'
import {Link, useLocation} from 'react-router-dom';
import {Drawer, InputBase, List, ListItem, ListItemIcon, ListItemText} from "@material-ui/core";
import {Book, Category, LocalLibrary, Search} from "@material-ui/icons";

const useStyles = makeStyles(theme => ({
    root: {
        backgroundColor: 'white',
        textDecoration: "none",
        color: props => props.color,
    },
    navList: {
        minWidth: 220,
    },
}));

const NavBar = () => {
    const classes = useStyles();

    const [drawerOpen, setDrawerOpen] = useState(false);

    const closeDrawer = () => {
        setDrawerOpen(false);
    };

    return (
        <>
            <AppBar position="static">
                <Toolbar variant="dense">
                    <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu"
                                onClick={(() => setDrawerOpen(true))}
                    >
                        <MenuIcon/>
                    </IconButton>
                    <Typography variant="h6" color="inherit">
                        Biblioteca mea
                    </Typography>
                </Toolbar>
                <Drawer
                    open={drawerOpen}
                    onClose={closeDrawer}
                >
                    <List component="nav" aria-label="main mailbox folders" className={classes.navList}>
                        <ListItem button component={Link} to="/" onClick={closeDrawer}>
                            <ListItemIcon>
                                <LocalLibrary/>
                            </ListItemIcon>
                            <ListItemText primary="Biblioteca"/>
                        </ListItem>
                        <ListItem button component={Link} to="/categorii" onClick={closeDrawer}>
                            <ListItemIcon>
                                <Category/>
                            </ListItemIcon>
                            <ListItemText primary="Categorii"/>
                        </ListItem>
                        <ListItem button component={Link} to="/carti" onClick={closeDrawer}>
                            <ListItemIcon>
                                <Book/>
                            </ListItemIcon>
                            <ListItemText primary="Carti"/>
                        </ListItem>
                    </List>
                </Drawer>
            </AppBar>
        </>
    );
};

export default NavBar;
