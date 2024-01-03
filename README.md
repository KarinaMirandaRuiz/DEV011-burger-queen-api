# Burger Queen API

## Índice

* [1. Resumen del Proyecto](#resumen-del-proyecto)
* [2. Instalación y Ejecución](#instalación-y-ejecución)
* [3. Endpoints](#endpoints)
  * [3.1 Login](#login)
  * [3.2 Users](#users)
  * [3.3 Products](#products)
  * [3.4 Orders](#orders)

## Resumen del Proyecto
Este proyecto consiste en desarrollar un servidor web para un restaurante de hamburguesas que desea gestionar pedidos a través de una tablet. El servidor, implementado en Node.js con Express, ofrece una API REST que permite realizar operaciones relacionadas con usuarios, productos y ordenes.

## Instalación y Ejecución
1. Clona este repositorio.
2. Instala las dependencias con ``npm install``.
3. Configura las variables de entorno en un archivo ``.env``.
4. Ejecuta el servidor con ``npm start``.

## Endpoints

### Login

- ``POST /login`` Crea un token de autenticación.

  - **Parámetros:**
  
  No requiere parámetros.
  
  - **Cuerpo de la Solicitud:**
  ```
  {
    "email": "anita.borg@systers.xyz",
    "password": "g6WQSrsv7rC7et5B"
  }
  ```
  
  - **Respuestas:**
    - 200: Operación exitosa con ``resp.json``:
     ```
     {
         "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1aWQiOiI2NTg1ZWI3ZTkwMDI0YjYyOTlkYTI1NDciLCJlbWFpbCI6ImFkbWluQGxvY2FsaG9zdCIsImFkbWluIjp0cnVlLCJpYXQiOjE3MDM4Nzg2OTgsImV4cCI6MTcwMzg5MzA5OH0.seq2by_xYUsF6XduDK5mYMn1G4-qCiTPdraYlm1zLV8"
     }
     ```
    - 400: Si no se proporciona el correo electrónico o la contraseña
    - 404: Si las credenciales no coinciden


### Users

- ``GET /users`` Lista todos los usuarios.

  - **Parámetros:**

    - page: página actual, por defecto 1
    - limit: número de elementos por página, por defecto 10

  - **Respuestas:**

    - 200: Operación exitosa
    - 401: Si no hay encabezado de autenticación
    - 403: Si el token de autenticación no es de una usuaria administradora

- ``POST /users`` Crea un nuevo usuario.

  - **Cuerpo de la Solicitud:**

  ```
  {
    "email": "grace.hopper@mail.xyz",
    "password": "9XXLqVhq3vw9yjNt",
    "role": "admin"
  }
  ```
  - **Respuestas:**

    - 201: Operación exitosa
    - 400: Si no se no se proveen ``email``, ``password`` o ``role``
    - 401: Si no hay encabezado de autenticación
    - 403: Si ya existe usuaria con ese ``email``

- ``GET /users/{uid}`` Obtiene información de un usuario específico.

  - **Parámetros:**

    - uid: ID del usuario

  - **Respuestas:**

    - 200: Operación exitosa
    - 401: Si no hay encabezado de autenticación
    - 403: Si el token de autenticación no es de una usuaria administradora o no es de la misma usuaria que corresponde al parametro ``uid``
    - 404: Si la usuaria solicitada no existe

- ``PATCH /users/{uid}`` Modifica un usuario existente.

  - **Parámetros:**

    - uid: ID del usuario

  - **Cuerpo de la Solicitud:**

  ```
  {
    "email": "grace.hopper@systers.xyz",
    "password": "9XXLqVhq3vw9yjNt",
    "role": "admin"
  }
  ```

  - **Respuestas:**

    - 200: Operación exitosa
    - 400: Si no se no se proveen ``email``, ``password`` o ``role``
    - 401: Si no hay encabezado de autenticación
    - 403: Caso 1: si el token de autenticación no es de una usuaria administradora o no es de la misma usuaria que corresponde al parametro ``uid``. Caso 2: una usuaria no admin intenta modificar su ``role``
    - 404: Si la usuaria solicitada no existe

- ``DELETE /users/{uid}`` Elimina un usuario existente.

  - **Parámetros:**

    - ``uid``: ID del usuario

  - **Respuestas:**

    - 200: Operación exitosa
    - 401: Si no hay encabezado de autenticación
    - 403: Sí el token de autenticación no es de una usuaria administradora o no es de la misma usuaria que corresponde al parametro ``uid``
    - 404: Si la usuaria solicitada no existe

### Products

- ``GET /products`` Lista todos los productos.
  
  - **Parámetros:**

    - page: página actual, por defecto 1
    - limit: número de elementos por página, por defecto 10

  - **Respuestas:**

    - 200: Operación exitosa
    - 401: Si no hay encabezado de autenticación

- ``POST /products`` Crea un nuevo producto.

  - **Cuerpo de la Solicitud:**

  ```
  {
      "name": "Donita",
      "price": 20,
      "image": "https://upload.wikimedia.org/wikipedia/commons/thumb/4/48/Dona_sencilla_mexicana.jpg/1280px-Dona_sencilla_mexicana.jpg",
      "type": "Desayuno",
      "dateEntry": "2024-01-02T21:14:10.000Z"
  }
  ```
  - **Respuestas:**

    - 201: Operación exitosa
    - 400: Si no se proveen ``name`` o ``price``
    - 401: Si no hay encabezado de autenticación
    - 403: Si el token de autenticación no es de una usuaria administradora

- ``GET /products/{productId}`` Obtiene información de un producto específico.

  - **Parámetros:**

    - productId: ID del producto

  - **Respuestas:**

    - 200: Operación exitosa
    - 401: Si no hay encabezado de autenticación
    - 404: Si el producto solicitado no existe

- ``PATCH /products/{productId}`` Modifica un producto existente.

  - **Parámetros:**

    - productId: ID del producto

  - **Cuerpo de la Solicitud:**

  ```
  {
      "name": "Dona",
      "price": 25,
  }
  ```

  - **Respuestas:**

    - 200: Operación exitosa
    - 400: Si no se indican ninguna propiedad a modificar
    - 401: Si no hay encabezado de autenticación
    - 403: Si el token de autenticación no es de una usuaria administradora
    - 404: Si el producto con ``productId`` indicado no existe

- ``DELETE /products/{productId}`` Elimina un producto existente.

  - **Parámetros:**

    - productId: ID del producto

  - **Respuestas:**

    - 200: Operación exitosa
    - 401: Si no hay encabezado de autenticación
    - 403: Sí el token de autenticación no es de una usuaria administradora
    - 404: Si el producto con ``productId`` indicado no existe

### Orders

- ``GET /orders`` Lista todos los pedidos.
  
  - **Parámetros:**

    - page: página actual, por defecto 1
    - limit: número de elementos por página, por defecto 10

  - **Respuestas:**

    - 200: Operación exitosa
    - 401: Si no hay encabezado de autenticación

- ``POST /orders`` Crea una nueva orden.

  - **Cuerpo de la Solicitud:**

  ```
  {
    "userId": 15254,
    "client": "Carol Shaw",
    "products": [
      {
        "qty": 5,
        "product": {
          "id": 1214,
          "name": "Ham and Cheese Sandwich",
          "price": 1000,
          "type": "Breakfast"
        }
      }
    ],
    "status": "pending",
    "dateEntry": "2022-03-05 15:14:10"
  }
  ```
  - **Respuestas:**

    - 201: Operación exitosa
    - 400: Si no se indica ``userId`` o se intenta crear una orden sin productos
    - 401: Si no hay encabezado de autenticación

- ``GET /orders/{orderId}`` Obtiene información de una orden específica.

  - **Parámetros:**

    - orderId: ID de una orden

  - **Respuestas:**

    - 200: Operación exitosa
    - 401: Si no hay encabezado de autenticación
    - 404: Si el pedido solicitado no existe

- ``PATCH /orders/{orderId}`` Modifica una orden existente.

  - **Parámetros:**

    - orderId: ID de una orden

  - **Cuerpo de la Solicitud:**

  ```
  {
    "status": "delivered"
  }
  ```

  - **Respuestas:**

    - 200: Operación exitosa
    - 400: Si no se indican propiedades a modificar o el ``status`` no es válido
    - 401: Si no hay encabezado de autenticación
    - 404: Si el pedido con el ``orderId`` indicado no existe

- ``DELETE /orders/{orderId}`` Elimina un pedido existente.

  - **Parámetros:**

    - orderId: ID del pedido

  - **Respuestas:**

    - 200: Operación exitosa
    - 401: Si no hay encabezado de autenticación
    - 404: Si el pedido con el ``orderId`` indicado no existe
