import React from 'react'
import { Redirect, Route } from 'react-router-dom'

const PrivateRoute = ({ component: Component, ...rest }) => (
  <Route {...rest} render={ ({location, ...props}) => (
    localStorage.getItem('token')
      ? <Component {...props} />
      : <Redirect to={{pathname: '/login', state: {from: location, error: 'Debes iniciar sesión para hacer eso.'}}} />
  )}/>
);

export default PrivateRoute;