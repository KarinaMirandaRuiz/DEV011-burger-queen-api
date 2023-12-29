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
Este proyecto consiste en desarrollar un servidor web para un pequeño restaurante de hamburguesas que desea gestionar pedidos a través de una tablet. El servidor, implementado en Node.js con Express, ofrece una API REST que permite realizar operaciones relacionadas con usuarios, productos y pedidos.

## Instalación y Ejecución
1. Clona este repositorio.
2. Instala las dependencias con npm install.
3. Configura las variables de entorno en un archivo .env.
4. Ejecuta el servidor con npm start.

## Endpoints

### Login

``POST/login``: Crea un token de autenticación.

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
  - 200: Operación exitosa
  - 400: Si no se proporciona el correo electrónico o la contraseña
  - 404: Si las credenciales no coinciden

- **Ejemplo del Token:**
```
{
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1aWQiOiI2NTg1ZWI3ZTkwMDI0YjYyOTlkYTI1NDciLCJlbWFpbCI6ImFkbWluQGxvY2FsaG9zdCIsImFkbWluIjp0cnVlLCJpYXQiOjE3MDM4Nzg2OTgsImV4cCI6MTcwMzg5MzA5OH0.seq2by_xYUsF6XduDK5mYMn1G4-qCiTPdraYlm1zLV8"
}
```
### Orders

``GET/orders``
Lista todos los pedidos.

- **Parámetros:**

_page (página actual, por defecto 1)
_limit (número de elementos por página, por defecto 10)

- **Respuestas:**

  - 200: Operación exitosa
  - 401: Si no hay encabezado de autenticación

``POST/orders``
Crea un nuevo pedido.

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
  - 400: Si no se indica userId o se intenta crear un pedido sin productos
  - 401: Si no hay encabezado de autenticación

``GET /orders/{orderId}``
Obtiene información de un pedido específico.

- **Parámetros:**

orderId (ID del pedido)

- **Respuestas:**

  - 200: Operación exitosa
  - 401: Si no hay encabezado de autenticación
  - 404: Si el pedido solicitado no existe

``PATCH /orders/{orderId}``
Modifica un pedido existente.

- **Parámetros:**

orderId (ID del pedido)

- **Cuerpo de la Solicitud:**

```
{
  "status": "delivered"
}
```

- **Respuestas:**

  - 200: Operación exitosa
  - 400: Si no se indican propiedades a modificar o el estado no es válido
  - 401: Si no hay encabezado de autenticación
  - 404: Si el pedido con el orderId indicado no existe

``DELETE /orders/{orderId}``
Elimina un pedido existente.

- **Parámetros:**

orderId (ID del pedido)

- **Respuestas:**

  - 200: Operación exitosa
  - 401: Si no hay encabezado de autenticación
  - 404: Si el pedido con el orderId indicado no existe

### Products
(Similar a endpoints de Pedidos, pero aplicados a productos)

Usuarios
(Similar a endpoints de Pedidos, pero aplicados a usuarios)
