import React from 'react'
import { List, Datagrid, TextField, ReferenceField } from 'react-admin'
import ExistingField from './ExistingField'

export const FolderList = (props) => (
  <List {...props}>
    <Datagrid rowClick="edit">
      <TextField source="id" />
      <ReferenceField
        label="Playlist"
        source="playlist_id"
        reference="playlists"
      >
        <TextField source="title" />
      </ReferenceField>
      <ExistingField field="playlist_id" source="folder_name" />
    </Datagrid>
  </List>
)
// export const Api/folderList = props => (
//   <List {...props}>
//       <Datagrid rowClick="edit">
//           <TextField source="id" />
//           <TextField source="filename" />
//       </Datagrid>
//   </List>
// );
