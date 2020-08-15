import React from 'react'
import OAuth2Login from 'react-simple-oauth2-login'
import api from '../services/api'
import { googleOAuth } from '../config'

// response contains the code
const onSuccess = (response) => {
  const code = decodeURIComponent(response.code)
  const scope = decodeURIComponent(response.scope)
  console.log(scope, code)
  api.oAuth2Callback({ code })
    .then((data) => console.log('callback returned', data))
}

const onFailure = (response) => console.error(response)

const { authorizationURL, clientID, scope, callbackURL } = googleOAuth

const Login = () => (
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

export default Login