import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom'
import { Provider } from 'react-redux'
import { createStore, combineReducers, compose, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'

import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';

import App from './App';
import alert from './store/reducer/alert'
import user from './store/reducer/user'


// Create mui Theme 
const theme = createMuiTheme({
    palette: {
        primary: {
            main: '#30a7fd'
        },
        secondary: {
            main: '#EE3233'
        },


    }
},
)

//combine all reducers
const rootReducer = combineReducers({
    alert,
    user,
})
// adding the redux dev tools ps:check api documentation
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
// creating the store with applying the thunk middleware
const storeWithThunk = createStore(rootReducer, composeEnhancers(applyMiddleware(thunk)))

const app = (
    <Provider store={storeWithThunk}>
        <BrowserRouter>
            <MuiThemeProvider theme={theme}>
                <App />
            </MuiThemeProvider>
        </BrowserRouter>
    </Provider>
)
ReactDOM.render(app, document.getElementById('root'));
