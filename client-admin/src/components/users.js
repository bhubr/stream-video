import React from 'react'
import {
  List,
  Datagrid,
  TextField,
  ImageField,
  EmailField,
  DateField,
  ReferenceArrayField,
  SingleFieldList,
  ChipField
} from 'react-admin'

export const UserList = (props) => (
  <List {...props}>
    <Datagrid rowClick="edit">
      <TextField source="id" />
      <TextField source="google_id" />
      <EmailField source="email" />
      <TextField source="firstname" />
      <TextField source="lastname" />
      <ImageField
        source="avatar"
        referrerPolicy="no-referrer"
        className="img-small"
      />
      <TextField source="role" />
      <ReferenceArrayField
        label="Playlists"
        reference="playlists"
        source="playlist_ids"
      >
        <SingleFieldList>
          <ChipField source="title" />
        </SingleFieldList>
      </ReferenceArrayField>
      <DateField source="created_at" />
    </Datagrid>
  </List>
)
