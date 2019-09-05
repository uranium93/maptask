import React, { useState, useEffect } from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import { Link } from 'react-router-dom';
import Paper from '@material-ui/core/Paper';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import NavSimple from '../../Components/navSimple/navSimple'
import { connect } from 'react-redux'
import validator from 'validator'
import PureLoading from '../../Components/loading/pureLoading'
import { login } from '../../store/actions/user'



const useStyles = makeStyles(theme => ({
    root: {
        height: '100vh',

    },
    image: {
        backgroundImage: 'url(https://res.cloudinary.com/dayqylkck/image/upload/v1567711051/undraw_mobile_prototyping_grmd_vj6p3j.png)',
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'contain',
        backgroundPosition: 'center',
    },
    paper: {
        margin: theme.spacing(8, 4),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    avatar: {
        margin: theme.spacing(1),
        backgroundColor: '#6AB8EE',
    },
    form: {
        width: '100%', // Fix IE 11 issue.
        marginTop: theme.spacing(1),
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
        backgroundColor: '#6AB8EE'
    },
}));



const Login = (props) => {
    if (props.user.isAuth) {
        props.history.push('/')
    }
    const classes = useStyles();
    const [inputeState, setInputeState] = useState({ email: '', password: '' })
    const [emailValid, setEmailValid] = useState({ er: false, mess: '' })

    // Disable submit button when error
    const [submitState, setSubmitState] = useState(true)
    useEffect(() => {
        if (emailValid.er) {
            setSubmitState(true)
        } else {
            if (submitState) {
                setSubmitState(false)
            }
        }

    }, [emailValid.er, submitState])


    const onSubmitHandler = (event) => {
        event.preventDefault()
        props.login(inputeState)
    }
    const onChangeHandler = (event) => {
        switch (event.target.name) {
            case 'email':
                if (validator.isEmail(event.target.value)) {
                    setEmailValid({ er: false, mess: '' })
                } else {
                    setEmailValid({ er: true, mess: 'Email doit etre : exemple@host.com' });
                }
                setInputeState({ email: event.target.value, password: inputeState.password })
                break;
            case 'password':
                setInputeState({ email: inputeState.email, password: event.target.value })
                break;
            default:
                break;

        }

    }

    return (
        <React.Fragment>
            <NavSimple />
            <Grid container component="main" className={classes.root}>
                <CssBaseline />
                <Grid item xs={false} sm={4} md={7} className={classes.image} />
                <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
                    <div className={classes.paper}>
                        <Avatar className={classes.avatar}>
                            <LockOutlinedIcon />
                        </Avatar>
                        <Typography component="h1" variant="h5">
                            LOGIN
                        </Typography>
                        <form className={classes.form} onSubmit={onSubmitHandler.bind()}>
                            <TextField
                                variant="outlined"
                                margin="normal"
                                required
                                fullWidth
                                id="email"
                                label="Address Email "
                                name="email"
                                autoComplete="email"
                                autoFocus
                                value={inputeState.email}
                                onChange={onChangeHandler.bind()}
                                error={emailValid.er}
                                helperText={emailValid.mess}
                            />
                            <TextField
                                variant="outlined"
                                margin="normal"
                                required
                                fullWidth
                                name="password"
                                label="Mot de passe"
                                type="password"
                                id="password"
                                value={inputeState.password}
                                autoComplete="current-password"
                                onChange={onChangeHandler.bind()}
                            />

                            {props.user.loading ? <PureLoading /> :
                                <Button
                                    type="submit" fullWidth
                                    variant="contained" color="primary"
                                    className={classes.submit} disabled={submitState}>

                                    Login
                            </Button>
                            }
                            <Grid container>

                                <Grid item>
                                    {"Don't have an accoubt ?"}
                                    <Link to="/singup" >
                                        Singup
                                    </Link>
                                </Grid>
                            </Grid>
                            <Box mt={5}>

                            </Box>
                        </form>
                    </div>
                </Grid>
            </Grid>

        </React.Fragment>
    );
}

const mapDispatchToProps = {
    login

}

const mapStateToProps = state => ({
    user: state.user,
})

export default connect(mapStateToProps, mapDispatchToProps)(Login)