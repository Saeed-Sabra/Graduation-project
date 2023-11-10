import React from 'react'
import { Edit, SimpleForm, TextInput} from 'react-admin';

export default function UserEdit(props) {
  return (
    <Edit title='Edit User' {...props}>
    <SimpleForm>
        <TextInput disabled source="id"/>
        <TextInput source="name" />
        <TextInput source="email" />
        <TextInput multiline source="body" />
    </SimpleForm>
</Edit>
  )
}
