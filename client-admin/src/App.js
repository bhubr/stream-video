import React from 'react'
import { fetchUtils, Admin, Resource, ListGuesser } from 'react-admin'
import jsonServerProvider from 'ra-data-json-server'
import { UserList } from './components/users'
import { serverUrl } from './config'

const httpClient = (url, options = {}) => {
  if (!options.headers) {
    options.headers = new Headers({ Accept: 'application/json' })
  }
  // add your own headers here
  options.headers.set('X-Custom-Header', 'foobar')
  return fetchUtils.fetchJson(url, options)
}
const dataProvider = jsonServerProvider(serverUrl, httpClient)

const App = () => (
  <Admin dataProvider={dataProvider} title="Example Admin">
    <Resource name="api/whitelisted-users" list={ListGuesser} />
    <Resource name="api/users" list={UserList} />
  </Admin>
)

export default App
