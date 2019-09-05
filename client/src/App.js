import React, { Suspense, lazy, useEffect } from 'react';
import { Route, Switch } from 'react-router-dom'
import { makeStyles } from '@material-ui/core'
import Alert from './Components/alert/alert'
import Loading from './Components/loading/Loading'
import { connect } from 'react-redux'
import { tokenLogin } from './store/actions/user'



const HomePage = lazy(() => import('./Containers/homePage/HomePage'));
const Login = lazy(() => import('./Containers/Login/Login'))
const Singup = lazy(() => import('./Containers/Singup/Singup'))


const useStyles = makeStyles({
  root: {
    width: "100vw",
    overflowX: "hidden"
  }
})

const App = (props) => {
  const classes = useStyles()
  useEffect(() => {
    const token = localStorage.getItem('token')
    if (token) {
      props.tokenLogin()
    }
  }, [])
  let alertComponent = null;
  if (props.alerts.msg != null && props.alerts.msg !== undefined) {
    const msg = props.alerts.msg
    const type = props.alerts.type
    const id = props.alerts.id
    alertComponent = <Alert alert={{ msg, type, id }} />
  }

  return (
    <div className={classes.root}>
      {alertComponent}

      <Suspense fallback={<Loading />}>
        <Switch>

          <Route path="/singup" component={Singup} />
          <Route path="/login" component={Login} />
          <Route path="/" component={HomePage} />
        </Switch>
      </Suspense>

    </div>
  );
}


const mapStateToProps = state => ({
  alerts: state.alert,
  user: state.user
})

const mapDispatchToProps = {
  tokenLogin
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
