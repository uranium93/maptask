import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux'
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import { Link } from 'react-router-dom';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import NavSimple from '../../Components/navSimple/navSimple'
import Paper from '@material-ui/core/Paper';
import validator from 'validator'
import styles from './Singup.module.css'
import Loading from '../../Components/loading/Loading'
import { singup } from '../../store/actions/user'


function Terms() {
    return (
        <Typography variant="body2" color="textSecondary" align="center">
            {'Ne vous inquiétez pas, nous ne publions rien sans votre autorisation.'}
        </Typography>
    );
}

const useStyles = makeStyles(theme => ({
    '@global': {
        body: {
            backgroundColor: theme.palette.common.white,
        },
    },
    root: {
        height: '100%',
        padding: '0'

    },
    image: {
        backgroundImage: 'url(https://boxecommerce.com/images/layout/register.png)',
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'contain',
        backgroundPosition: 'center',
    },
    paper: {
        margin: theme.spacing(2, 4),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },

    avatar: {
        margin: theme.spacing(1),
        backgroundColor: '#30a7fd',
    },
    form: {
        width: '100%', // Fix IE 11 issue.
        marginTop: theme.spacing(1),
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
        backgroundColor: '#30a7fd'
    },
    choice: {
        width: '100%',
        textAlign: 'center',

        boxSizing: 'border-box',
        padding: theme.spacing(3, 1),
    },
}));

const Signup = (props) => {

    //redirect user when he is Authenticated
    if (props.user.isAuth) {
        props.history.push('/')
    }


    const classes = useStyles();

    // Save the inputs value in state
    const [inputState, setInputState] = useState({
        userName: '',
        email: '',
        password: '',

    })

    // Validation of inputs state
    const [emailValid, setEmailValid] = useState({ er: false, mess: '' })
    const [passwordValid, setPasswordValid] = useState({ er: false, mess: '' })
    const [confirmPassValid, setConfirmPassValid] = useState({ er: false, mess: '' })

    // Disable submit button when error
    const [submitState, setSubmitState] = useState(true)
    useEffect(() => {
        if (emailValid.er || confirmPassValid.er) {
            setSubmitState(true)
        } else {
            if (submitState) {
                setSubmitState(false)
            }
        }

    }, [emailValid.er, confirmPassValid.er, submitState])

    // Verify the form inputs and save it on the inputState state
    const onCHangeHandler = (event) => {

        const val = event.target.value
        const type = event.target.name
        let inputStateCopy = Object.assign({}, inputState)
        inputStateCopy[type] = val
        setInputState(inputStateCopy)

        switch (type) {

            case 'email':
                if (validator.isEmail(val)) {
                    return setEmailValid({ er: false, mess: '' })
                }
                return setEmailValid({ er: true, mess: 'Email doit etre : exemple@host.com' });


            case 'password':
                if (val.length > 8) {
                    return setPasswordValid({ er: false, mess: '' })
                }
                return setPasswordValid({ er: true, mess: 'Mot de passe doit etre supperieur a 8 caracteres' });
            case 'confirmPassword':
                if (val === inputState.password) {
                    return setConfirmPassValid({ er: false, mess: '' })
                }
                return setConfirmPassValid({ er: true, mess: 'Confirmer le meme mot de passe' });

            default: return null
        }

    }

    // Submit the fomr data of particulaires
    const onSubmitHandler = (event) => {
        event.preventDefault()

        const dataToSend = {
            userName: inputState.userName,
            email: inputState.email,
            password: inputState.password,
        }
        props.singup(dataToSend)
    }

    return (
        <React.Fragment >
            <NavSimple />
            <CssBaseline />
            {props.user.loading ? <Loading /> :
                <Grid container className={classes.root}>
                    <CssBaseline />
                    <Grid item xs={false} sm={4} md={7} className={classes.image} />
                    <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
                        <div className={classes.paper}>
                            <Avatar className={classes.avatar}>
                                <LockOutlinedIcon />
                            </Avatar>
                            <Typography component="h1" variant="h5">
                                Singup
                    </Typography>

                            <form className={classes.form} onSubmit={onSubmitHandler}>
                                <Grid container spacing={2}>
                                    <Grid item xs={12} >
                                        <TextField
                                            autoComplete="family-name"
                                            name="userName"
                                            variant="outlined"
                                            required
                                            fullWidth
                                            id="userName"
                                            label="UserName"
                                            autoFocus
                                            onChange={onCHangeHandler.bind()}
                                        />
                                    </Grid>

                                    <Grid item xs={12}>
                                        <TextField
                                            variant="outlined"
                                            required
                                            fullWidth
                                            id="email"
                                            label="Address Email"
                                            name="email"
                                            autoComplete="email"
                                            onChange={onCHangeHandler.bind()}
                                            error={emailValid.er}
                                            helperText={emailValid.mess}
                                        />
                                    </Grid>
                                    <Grid item xs={12}>
                                        <TextField
                                            variant="outlined"
                                            required
                                            fullWidth
                                            name="password"
                                            label="Mot de passe"
                                            type="password"
                                            id="password"
                                            autoComplete="current-password"
                                            onChange={onCHangeHandler.bind()}
                                            error={passwordValid.er}
                                            helperText={passwordValid.mess}
                                        />
                                    </Grid>
                                    <Grid item xs={12}>
                                        <TextField
                                            variant="outlined"
                                            required
                                            fullWidth
                                            name="confirmPassword"
                                            label="Confirm mot de passe"
                                            type="password"
                                            id="confirmPassword"
                                            autoComplete='off'
                                            onChange={onCHangeHandler.bind()}
                                            error={confirmPassValid.er}
                                            helperText={confirmPassValid.mess}

                                        />
                                    </Grid>

                                    <Grid item xs={12}>
                                        <Typography variant="body2" color="textSecondary">
                                            <FormControlLabel
                                                control={<Checkbox value="acceptTerms" color="secondary" required />}
                                                label="j'accepte les Conditions d’utilisation et Politique de confidentialité et de cookies. "
                                            />
                                        </Typography>
                                    </Grid>
                                </Grid>
                                <Button
                                    type="submit"
                                    fullWidth
                                    variant="contained"
                                    color="primary"
                                    disabled={submitState}
                                    className={classes.submit}

                                >
                                    Singup
                          </Button>
                                <Grid container justify="flex-end">
                                    <Grid item>
                                        <Link to='/login'>
                                            Login
                            </Link>
                                    </Grid>
                                </Grid>
                            </form>
                        </div>
                        <Box mt={5}>
                            <Terms />
                        </Box>
                        <br /><br />
                    </Grid>
                </Grid>
            }
        </React.Fragment>
    );
}

const mapDispatchToProps = {
    singup
}

const mapStateToProps = (state) => ({
    user: state.user,
})
export default connect(mapStateToProps, mapDispatchToProps)(Signup)