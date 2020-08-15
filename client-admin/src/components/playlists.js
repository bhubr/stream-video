import React from 'react'
import {
  Create,
  Edit,
  SimpleForm,
  TextInput,
  ReferenceManyField,
  Datagrid,
  TextField,
  EditButton,
  required
} from 'react-admin'

export const PlaylistCreate = (props) => (
  <Create {...props}>
    <SimpleForm>
      <TextInput source="title" />
      <TextInput source="folder" />
      <TextInput source="description" options={{ multiLine: true }} />
    </SimpleForm>
  </Create>
)

export const PlaylistEdit = (props) => (
  <Edit {...props}>
    <SimpleForm>
      <TextInput disabled label="Id" source="id" />
      <TextInput source="title" validate={required()} />
      <TextInput source="folder" validate={required()} />
      <TextInput multiline source="description" validate={required()} />
      <ReferenceManyField
        label="Videos"
        reference="videos"
        target="playlist_id"
      >
        <Datagrid>
          <TextField source="title" />
          <TextField source="description" />
          <TextField source="file" />
          <EditButton />
        </Datagrid>
      </ReferenceManyField>
    </SimpleForm>
  </Edit>
)
