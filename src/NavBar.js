import React, {useState} from 'react';
import {makeStyles} from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu'
import {Link, useHistory, useLocation} from 'react-router-dom';
import {Drawer, InputBase, List, ListItem, ListItemIcon, ListItemText, Menu, MenuItem} from "@material-ui/core";
import {AccountCircle, Book, Category, LocalLibrary, Search} from "@material-ui/icons";

const useStyles = makeStyles(theme => ({
    root: {
        backgroundColor: 'white',
        textDecoration: "none",
        color: props => props.color,
    },
    navList: {
        minWidth: 220,
    },
    profile: {
        position: "absolute",
        right: 20,
        display: "flex",
        alignItems: "center"
    }

}));

const NavBar = () => {
    const classes = useStyles();

    const [drawerOpen, setDrawerOpen] = useState(false);

    const username = localStorage.getItem("username");
    const isLoggedIn = !!username;

    const closeDrawer = () => {
        setDrawerOpen(false);

    };
    const [anchorEl, setAnchorEl] = React.useState(null);
    const isMenuOpen = Boolean(anchorEl);
    const handleMenuClose = () => {
        setAnchorEl(null);
    };
    let history = useHistory();

    const handleLogout = () => {
        localStorage.removeItem("username")
        history.push(`/sign-in`);
    }

    const menuId = 'primary-search-account-menu';
    const renderMenu = (
        <Menu className={classes.profile}
              anchorEl={anchorEl}
              anchorOrigin={{vertical: 'top', horizontal: 'right'}}
              id={menuId}
              keepMounted
              transformOrigin={{vertical: 'top', horizontal: 'right'}}
              open={isMenuOpen}
              onClose={handleMenuClose}
        >
            {
                isLoggedIn ? (
                    [
                        <MenuItem key="1" onClick={handleMenuClose} component={Link} to="/profile">Profilul meu</MenuItem>,
                        <MenuItem key="2" onClick={handleMenuClose} onClick={handleLogout}>Log Out</MenuItem>
                    ]
                ) : (
                    [
                        <MenuItem key="3" onClick={handleMenuClose} component={Link} to="/sign-in">Log in</MenuItem>,
                        <MenuItem key="4" onClick={handleMenuClose} component={Link} to="/sign-up">Inregistreaza-te</MenuItem>
                    ]
                )
            }
        </Menu>
    );
    const handleProfileMenuOpen = (event) => {
        setAnchorEl(event.currentTarget);
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
                    <div className={classes.profile}>
                        {
                            isLoggedIn &&
                            <Typography>Buna, {username}</Typography>
                        }
                        <IconButton
                            edge="end"
                            aria-label="account of current user"
                            aria-controls={menuId}
                            aria-haspopup="true"
                            onClick={handleProfileMenuOpen}
                            color="inherit"
                        >
                            <AccountCircle/>
                        </IconButton>
                    </div>
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
                {renderMenu}
            </AppBar>
        </>
    );
};

export default NavBar;
