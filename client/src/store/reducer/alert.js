import { SET_ALERT } from '../actions/actionTypes'
const initialState = {}

const alertReducer = (state = initialState, action) => {
    switch (action.type) {

        case SET_ALERT:
            return {
                id:action.payload.id,
                msg: action.payload.msg,
                type: action.payload.type
            }

        default:
            return state

    }
}

export default alertReducer;