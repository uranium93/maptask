import React from 'react'
import NavSimple from '../../Components/navSimple/navSimple'
import { makeStyles } from '@material-ui/core'
import Map from '../Map/Map'
import { connect } from 'react-redux'

const useStyles = makeStyles({
    root: {
        marginTop: '64px',
        padding: '10px',
        width: '100%',
        minHeight: '80vh',
        overflowX: 'hidden'
    },
    readme: {
        display: 'flex',
        width: '100%',
        height: 'calc(100vh - 100px)',
        alignItems: 'center',
        justifyContent: 'center',
        overflowX: 'hidden'

    }
})
const HomePage = (props) => {
    const classes = useStyles()
    let content = <div className={classes.readme}><h3>
        This is a task about storing locations in map with a location name and discription
        To Use our app You need to Singup/Login
    </h3>
    </div>

    if (props.user.isAuth) {
        content = <Map />
    }
    return (
        <div>
            <NavSimple />
            <div className={classes.root}>{content}</div>

        </div>
    );
}

const mapStateToProps = state => ({
    user: state.user
});
export default connect(mapStateToProps)(HomePage);