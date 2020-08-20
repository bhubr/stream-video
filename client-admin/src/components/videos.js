import React from 'react'
import {
  Create,
  Edit,
  SimpleForm,
  TextInput,
  TextField,
  ReferenceField,
  required
} from 'react-admin'

export const VideoCreate = (props) => (
  <Create {...props}>
    <SimpleForm>
      <TextInput source="title" />
      <TextInput source="file" />
      <TextInput source="description" options={{ multiline: true }} />
    </SimpleForm>
  </Create>
)

export const VideoEdit = (props) => (
  <Edit {...props}>
    <SimpleForm>
      <TextInput disabled label="Id" source="id" />
      <TextInput source="title" validate={required()} />
      <TextInput source="file" validate={required()} />
      <TextInput multiline source="description" validate={required()} />
      <ReferenceField
        label="Playlist"
        source="playlist_id"
        reference="playlists"
      >
        <TextField source="title" />
      </ReferenceField>
    </SimpleForm>
  </Edit>
)
