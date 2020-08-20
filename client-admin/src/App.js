import React from 'react'
import { fetchUtils, Admin, Resource, ListGuesser } from 'react-admin'
import jsonServerProvider from 'ra-data-json-server'
// import { stringify } from 'query-string'
import Dashboard from './Dashboard'
import { UserList } from './components/users'
import { FolderList } from './components/folders'
import { PlaylistCreate, PlaylistEdit } from './components/playlists'
import { serverUrl } from './config'
import './App.css'

const httpClient = (url, options = {}) => {
  if (!options.headers) {
    options.headers = new Headers({ Accept: 'application/json' })
  }
  // add your own headers here
  options.headers.set('X-Custom-Header', 'foobar')
  return fetchUtils.fetchJson(url, options)
}
const dataProvider = jsonServerProvider(`${serverUrl}/api`, httpClient)

// const myDataProvider = {
//   ...dataProvider,
//   getMany: (resource, params) => {
//     if (resource === 'playlists') {
//       console.log(resource, params)
//       const { ids: folder } = params
//       const query = { folder }
//       const url = `${serverUrl}/${resource}?${stringify(query)}`
//       const pass = (data) => console.log(data) || data
//       const transformOne = ({ id, folder, ...rest }) => ({
//         id: folder,
//         folder,
//         ...rest
//       })
//       const transform = ({ json }) => ({
//         json: json.map(transformOne)
//       })
//       return httpClient(url)
//         .then(transform)
//         .then(({ json }) => ({ data: json }))
//         .then(pass)
//     }
//     return dataProvider.getMany(resource, params)
//   }
// }

const App = () => (
  <Admin
    dashboard={Dashboard}
    dataProvider={dataProvider}
    title="Example Admin"
  >
    <Resource name="whitelisted-users" list={ListGuesser} />
    <Resource name="users" list={UserList} />
    <Resource name="folders" list={FolderList} />
    <Resource
      name="playlists"
      list={ListGuesser}
      create={PlaylistCreate}
      edit={PlaylistEdit}
    />
    <Resource name="videos" list={ListGuesser} />
  </Admin>
)

export default App
