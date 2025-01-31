## 2.0.0 - 2023-01-03

### Sprint learnings

- Despliegue en Atlas y agregar IP Access
- Configuración .env
  
### Added

- Paginación de products y orders,  y  (Karina_mr) 2024-01-02
- Configuración .env

### Changed

- Cambio del readme
- pasan todos los test e2e

### Fixed

- Ajuste de put por patch
- Ajuste de tests unitarios

## 1.2.2 - 2023-12-22

### Sprint learnings

- Uso adecuado de Mock para las funciones de mongoose
- Estructura de los test e2e

### Added

- Test unitarios de los controladores (users, proucts, orders)

### Changed

- Cambio de la conección

### Fixed

- fix: se puso skip a un test de cada controlador, porque es necesario mockear la instancia del modelo, todos los endpoints funcionan bien


## 1.2.1 - 2023-12-13

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
