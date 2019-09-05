/* eslint-disable no-useless-computed-key */
import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import CssBaseline from '@material-ui/core/CssBaseline';
import useScrollTrigger from '@material-ui/core/useScrollTrigger';
import Slide from '@material-ui/core/Slide';
import { makeStyles } from '@material-ui/core';
import { NavLink } from 'react-router-dom'
import { connect } from 'react-redux'
import { logout } from '../../store/actions/user'


function HideOnScroll(props) {
    const { children, window } = props;
    // Note that you normally won't need to set the window ref as useScrollTrigger
    // will default to window.
    // This is only being set here because the demo is in an iframe.
    const trigger = useScrollTrigger({ target: window ? window() : undefined });

    return (
        <Slide appear={false} direction="down" in={!trigger}>
            {children}
        </Slide>
    );
}

const useStyles = makeStyles({
    toolbar: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        ['@media (max-width:800px)']: {
            flexDirection: 'column',
            padding: '10px'
        },
        '& a': {
            color: "white",
            textDecoration: 'none',
            margin: '10px'
        }

    },
    auth: {
        display: 'flex',
        '& h6': {
            cursor: 'pointer'
        }
    }
})

const NavSimple = (props) => {
    const classes = useStyles()
    let auth = <div className={classes.auth}>
        <NavLink to="/login" ><Typography variant="h6">Login</Typography></NavLink>
        <NavLink to="/singup" ><Typography variant="h6">Singup</Typography></NavLink>
    </div>
    if (props.user.isAuth) {
        auth = <div className={classes.auth}>
            <Typography variant="h6" onClick={() => props.logout()}>Logout</Typography>
        </div>
    }
    return (
        <React.Fragment>
            <CssBaseline />
            <HideOnScroll {...props}>
                <AppBar color="primary">
                    <Toolbar className={classes.toolbar}>
                        <NavLink to="/" ><Typography variant="h6">Home</Typography></NavLink>
                        <div>{auth}</div>
                    </Toolbar>

                </AppBar>
            </HideOnScroll>
        </React.Fragment>
    );
};

const mapStateToProps = (state) => ({
    user: state.user,
});

export default connect(mapStateToProps, { logout })(NavSimple);
