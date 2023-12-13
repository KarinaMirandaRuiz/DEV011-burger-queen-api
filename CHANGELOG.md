## 1.2.0 - 2023-12-13

### Sprint learnings

- Mejor uso de Postman
- Mejos uso de promesas

### Added

- CRUD de Ordenes
- CRUD de Productos

### Changed

- Se cambió el Schema de productos y ordenes para no tener dependencias a otros schemas

### Fixed

- Se corrigió la autenticación en caso de no enviar los datos correctos, no queda esperando la promesa


## 1.1.1 - 2023-12-06

### Sprint learnings

- Organización de archivos en controller
- Manipulación de DB com mongoose
- Uso de postman para otro tipo de verbos

### Added

- Se realizo funcionalidad de get y post de users, y se editó el texto de algunos status
- Se agregó la función getUserbyId y se cambió get/:uid
- Controller/user: se agregaron las funciones getUsersJSON,getUserByEmail,saveUser,putUser,deleteUser. Rutes/users: se hizo put y delete

### Changed

- isAuthenticated, isAdmin. Depuración de conecciones a mongoDB. Postman autentica al pasarle el token
- Rutes/users: modificó get, post

### Fixed

- Corrección del error al autenticarse y cambio de la DB
- Se arregló requireAuth y requireAdmin.

### Removed

- Se cambió el tipo de dato de roles, de obj a string


## 1.0.0 - 2023-11-29

### Sprint learnings

- Bases de datos no relacionales
- Creación de Schemas y modelos
- Agregar y consultar docs de las colecciones
- Encriptar un password

### Added

- Creación de usuarios en routes, en el controlador y avance en la autenticación routes
- Schemas con mongoose y coneccion con mongodb test

### Changed

- Creación de usuarios en routes, en el controlador y avance en la autenticación routes
- Schemas con mongoose y coneccion con mongodb test

### Fixed

- Corrección de schemas con el tipo Date

### Removed

- Se eliminó el archivo único de schemas y se dividió dentro de la carpeta de los modelos
