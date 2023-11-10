import React from 'react'
import { List, Datagrid, EmailField, TextField, EditButton, DeleteButton} from 'react-admin';

export default function UserList(props) {
  return (
    <List {...props}>
    <Datagrid>
        <TextField source="id" />
        <TextField source="name" />
        <EmailField source="email" />
        <EditButton basePath="/users" />
        <DeleteButton basePath="/users" />
    </Datagrid>
</List>
  )
}
