import {
    REGISTER_FAIL, REGISTER_START, REGISTER_SUCC,
    LOGIN_FAIL, LOGIN_START, LOGIN_SUCC,
    LOGOUT, ADD_LOCATION_FAIL, ADD_LOCATION_START, ADD_LOCATION_SUCC
} from '../actions/actionTypes'
const initialState = {
    token: localStorage.getItem('token'),
    locationLoading: false,
    isAuth: false,
    loading: false,
    userName: null,
    email: null,
    _id: null,
    locations: []
}

const user = (state = initialState, action) => {
    const { type, payload } = action
    switch (type) {

        case LOGOUT:
            localStorage.removeItem('token')
            return {
                ...state,
                token: null,
                isAuth: false,
                loading: false,
                userName: null,
                email: null,
                _id: null,
                locations: []
            }
        case LOGIN_START:
        case REGISTER_START:
            return {
                ...state,
                loading: true
            }

        case LOGIN_FAIL:
        case REGISTER_FAIL:
            return {
                ...state,
                loading: false
            }

        case REGISTER_SUCC:
            return {
                ...state,
                loading: false,
            }

        case LOGIN_SUCC:

            localStorage.setItem('token', payload.token)
            return {
                ...state,
                loading: false,
                isAuth: true,
                token: payload.token,
                locations: payload.locations,
                ...payload.user
            }

        case ADD_LOCATION_FAIL:
            return {
                ...state,
                locationLoading: false,
            }

        case ADD_LOCATION_START:
            return {
                ...state,
                locationLoading: true
            }
        case ADD_LOCATION_SUCC:
            localStorage.setItem('token', payload.token)
            let newLocations = [...state.locations]
            newLocations.push(payload.location)
            return {
                ...state,
                token: payload.token,
                locations: newLocations,
                locationLoading: false,
            }

        default: return state
    }

}

export default user;