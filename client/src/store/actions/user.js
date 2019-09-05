import axios from 'axios'
import { setAlert } from './alert'
import {
    REGISTER_FAIL, REGISTER_START, REFRESH_TOKEN, REGISTER_SUCC,
    LOGIN_FAIL, LOGIN_START, LOGIN_SUCC,
    LOGOUT,
    ADD_LOCATION_FAIL, ADD_LOCATION_START, ADD_LOCATION_SUCC
} from './actionTypes'
import { set } from 'mongoose'



const headers = { 'content-type': 'application/json' }

export const singup = ({ userName, email, password }) => async dispatch => {
    try {
        dispatch({
            type: REGISTER_START
        })

        const body = JSON.stringify({ userName, email, password })
        await axios.post('/api/user/singup', body, { headers })
        dispatch({
            type: REGISTER_SUCC,
        })
        dispatch(setAlert(`You are One of us now ;) `, 'success'))

    } catch (err) {
        dispatch({
            type: REGISTER_FAIL
        })
        dispatch(setAlert('The user existe', 'warning'))
    }
}

export const login = ({ email, password }) => async dispatch => {
    try {
        dispatch({
            type: LOGIN_START
        })
        const body = JSON.stringify({ email, password })
        const res = await axios.post('/api/user/login', body, { headers })
        dispatch({
            type: LOGIN_SUCC,
            payload: {
                user: res.data.user,
                token: res.data.token,
                locations: res.data.locations
            }
        })
        dispatch(setAlert(`Welcome ${res.data.user.userName}`, 'success'))

    } catch (err) {
        dispatch({
            type: LOGIN_FAIL
        })
        dispatch(setAlert('Wrong Email or Password', 'error'))
    }
}

export const logout = () => async dispatch => {
    try {
        dispatch({
            type: LOGOUT
        })
        dispatch(setAlert("Logout ", 'success'))
    } catch (error) {
        console.log(error)
    }

}

export const tokenLogin = () => async dispatch => {
    try {
        const token = localStorage.getItem('token')
        const body = JSON.stringify({ token })
        const res = await axios.post('/api/user/tokenLogin', body, { headers })
        dispatch({
            type: LOGIN_SUCC,
            payload: {
                user: res.data.user,
                token: res.data.token,
                locations: res.data.locations
            }
        })
    } catch (err) {
        dispatch({
            type: LOGOUT
        })
        dispatch(setAlert("Session closed", 'warning'))
    }
}

export const addLocation = (name, discription, lngLat) => async dispatch => {
    try {
        dispatch({
            type: ADD_LOCATION_START
        })
        const token = localStorage.getItem('token')
        const body = JSON.stringify({ token, name, discription, lngLat })
        const res = await axios.post('/api/locations/add', body, { headers })
        dispatch({
            type: ADD_LOCATION_SUCC,
            payload: {
                location: res.data.location,
                token: res.data.token
            }

        })
        dispatch(setAlert('Location saved', 'success'))
    } catch (err) {
        console.log(err)
        dispatch({
            type: ADD_LOCATION_FAIL
        })
        dispatch(setAlert('Can\'t connect to database', 'error'))
    }
}