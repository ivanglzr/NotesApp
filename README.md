### RUTAS

note = {
title: string,
content: string,
color: string
}

user = {
user: string,
email: string,
password: string,
notes: [ note ],
}

## Usuario

# Solicitar los usuarios o un usuario

-> _GET_ /user/:id?

# Crear un usuario en la DB

-> _POST_ /user/
{
user: user
}

# Editar un usuario

-> _PUT_ /user/:id
{
user: user
}

# Eliminar usuario

-> _DELETE_ /user/:id

## Notas

# Solicitar notas o una nora

-> _GET_ /user/:id/note/:id?

# Crear una nota en la DB

-> _POST_ /user/:id/note/
{
notes: [ note ]
}

# Editar nota

-> _PUT_ /user/:id/note/:id
{
note: note
}

# Eliminar nota

-> _DELETE_ /user/:id/note/:id
