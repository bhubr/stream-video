import React from 'react'
import { List, Datagrid, TextField, ReferenceField } from 'react-admin'

export const FolderList = (props) => (
  <List {...props}>
    <Datagrid rowClick="edit">
      <TextField source="id" />
      <ReferenceField
        label="Playlist"
        source="folder_name"
        reference="api/playlists"
      >
        <TextField source="title" />
      </ReferenceField>
      <TextField source="folder_name" />
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
