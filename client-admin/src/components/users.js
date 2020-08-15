import React from 'react'
import { List, Datagrid, TextField, EmailField, DateField } from 'react-admin'

export const UserList = (props) => (
  <List {...props}>
    <Datagrid rowClick="edit">
      <TextField source="id" />
      <TextField source="google_id" />
      <EmailField source="email" />
      <TextField source="firstname" />
      <TextField source="lastname" />
      <TextField source="avatar" />
      <TextField source="role" />
      <DateField source="created_at" />
    </Datagrid>
  </List>
)
