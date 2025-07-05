# API Documentation

## /api/users/register

### Description

This endpoint allows users to register by providing their details. Upon successful registration, a new user will be created in the database.

### Request Method

POST

### Request Body

The request body must be in JSON format and should include the following fields:

- `username` (string, required): The desired username for the new user.
- `email` (string, required): The email address of the user.
- `password` (string, required): The password for the user account.

#### Example Request

```json
{
  "username": "exampleUser",
  "email": "user@example.com",
  "password": "securePassword123"
}
```

### Response

- **201 Created**: Returned when the user is successfully registered.

  ```json
  {
    "message": "User registered successfully.",
    "token": "<jwt_token>",
    "user": {
      "_id": "12345",
      "username": "exampleUser",
      "email": "user@example.com",
      "createdAt": "2024-06-01T12:00:00.000Z",
      "updatedAt": "2024-06-01T12:00:00.000Z",
      "__v": 0
    }
  }
  ```

- **400 Bad Request**: Returned when the request body is missing required fields or if the data is invalid.
  ```json
  {
    "errors": [
      {
        "msg": "Username is required",
        "param": "username",
        "location": "body"
      }
    ]
  }
  ```
  or
  ```json
  {
    "message": "All fields are required."
  }
  ```

---

## /api/users/login

### Description

This endpoint allows users to log in with their email and password. On successful authentication, a JWT token and user data are returned.

### Request Method

POST

### Request Body

The request body must be in JSON format and should include the following fields:

- `email` (string, required): The email address of the user.
- `password` (string, required): The password for the user account.

#### Example Request

```json
{
  "email": "user@example.com",
  "password": "securePassword123"
}
```

### Response

- **200 OK**: Returned when the user is successfully authenticated.

  ```json
  {
    "message": "User logged in successfully.",
    "token": "<jwt_token>",
    "user": {
      "_id": "12345",
      "username": "exampleUser",
      "email": "user@example.com",
      "createdAt": "2024-06-01T12:00:00.000Z",
      "updatedAt": "2024-06-01T12:00:00.000Z",
      "__v": 0
    }
  }
  ```

- **400 Bad Request**: Returned when the request body is missing required fields or if the data is invalid.

  ```json
  {
    "errors": [
      {
        "msg": "Invalid email",
        "param": "email",
        "location": "body"
      }
    ]
  }
  ```

  or

  ```json
  {
    "message": "All fields are required."
  }
  ```

- **401 Unauthorized**: Returned when the credentials are invalid.
  ```json
  {
    "message": "Invalid credentials."
  }
  ```

---

## /api/users/profile

### Description

This endpoint returns the profile information of the currently authenticated user. Authentication via JWT token (cookie) is required.

### Request Method

GET

### Authentication

- Requires a valid JWT token in the `token` cookie (set during login).

### Example Request

```
GET /api/users/profile
Cookie: token=<jwt_token>
```

### Response

- **200 OK**: Returned when the user is authenticated and the profile is fetched successfully.

  ```json
  {
    "user": {
      "_id": "12345",
      "username": "exampleUser",
      "email": "user@example.com",
      "createdAt": "2024-06-01T12:00:00.000Z",
      "updatedAt": "2024-06-01T12:00:00.000Z",
      "__v": 0
    }
  }
  ```

- **401 Unauthorized**: Returned when the user is not authenticated or the token is missing/invalid.

  ```json
  {
    "message": "Unauthorized"
  }
  ```

---

## /api/users/logout

### Description

This endpoint logs out the currently authenticated user by clearing the authentication token cookie.

### Request Method

GET

### Authentication

- Requires a valid JWT token in the `token` cookie (set during login).

### Example Request

```
GET /api/users/logout
Cookie: token=<jwt_token>
```

### Response

- **200 OK**: Returned when the user is logged out successfully.

  ```json
  {
    "message": "User logged out successfully."
  }
  ```

- **401 Unauthorized**: Returned when the user is not authenticated or the token is missing/invalid.

  ```json
  {
    "message": "Unauthorized"
  }
  ```

---

### Status Codes

- 201: Created (register)
- 200: OK (login)
- 400: Bad Request
- 401: Unauthorized

This documentation provides a clear understanding of how to use the `/api/users/register` and `/api/users/login` endpoints, including the required data and possible
