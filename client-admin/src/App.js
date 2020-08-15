import React from 'react'
import { fetchUtils, Admin, Resource, ListGuesser } from 'react-admin'
import jsonServerProvider from 'ra-data-json-server'
import { stringify } from 'query-string'
import { UserList } from './components/users'
import { FolderList } from './components/folders'
import { PlaylistCreate, PlaylistEdit } from './components/playlists'
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

const myDataProvider = {
  ...dataProvider,
  getMany: (resource, params) => {
    if (resource === 'api/playlists') {
      console.log(resource, params)
      const { ids: folder } = params
      const query = { folder }
      const url = `${serverUrl}/${resource}?${stringify(query)}`
      const pass = (data) => console.log(data) || data
      const transformOne = ({ id, folder, ...rest }) => ({
        id: folder,
        folder,
        ...rest
      })
      const transform = ({ json }) => ({
        json: json.map(transformOne)
      })
      return httpClient(url)
        .then(transform)
        .then(({ json }) => ({ data: json }))
        .then(pass)
    }
    return dataProvider.getMany(resource, params)
  }
}

const App = () => (
  <Admin dataProvider={myDataProvider} title="Example Admin">
    <Resource name="api/whitelisted-users" list={ListGuesser} />
    <Resource name="api/users" list={ListGuesser} />
    <Resource name="api/folders" list={FolderList} />
    <Resource
      name="api/playlists"
      list={ListGuesser}
      create={PlaylistCreate}
      edit={PlaylistEdit}
    />
    <Resource name="api/videos" list={ListGuesser} />
  </Admin>
)

export default App
