import React from 'react'
import OAuth2Login from 'react-simple-oauth2-login'
import { Redirect } from 'react-router-dom'
import api from '../services/api'
import withAuth from '../hoc/withAuth'
import { googleOAuth } from '../config'


const onFailure = (response) => console.error(response)

const { authorizationURL, clientID, scope, callbackURL } = googleOAuth

const Login = ({ user, setUser }) => {

  // response contains the code
  const onSuccess = (response) => {
    const code = decodeURIComponent(response.code)
    const scope = decodeURIComponent(response.scope)
    console.log(scope, code)
    api.oAuth2Callback({ code })
      .then(setUser)
  }

  if (user) {
    return (
      <Redirect to='/' />
    )
  }
  return (
    <OAuth2Login
      buttonText="Login with Google"
      authorizationUrl={authorizationURL}
      clientId={clientID}
      scope={scope}
      redirectUri={callbackURL}
      onSuccess={onSuccess}
      onFailure={onFailure}
    />
  )
}

export default withAuth(Login)
