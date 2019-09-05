import { SET_ALERT } from './actionTypes'
import uuidv4 from 'uuid/v4'

export const setAlert = (msg, type) => dispatch => {
    const id=uuidv4()
    dispatch({
        type: SET_ALERT,
        payload: { msg, type,id }
    });
};