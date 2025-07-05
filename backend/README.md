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

### Example Request
{
  "username": "exampleUser",
  "email": "user@example.com",
  "password": "securePassword123"
}

### Response
- **201 Created**: Returned when the user is successfully registered.
  - Example Response:
  {
    "message": "User registered successfully",
    "user": {
      "id": "12345",
      "username": "exampleUser",
      "email": "user@example.com"
    }
  }

- **400 Bad Request**: Returned when the request body is missing required fields or if the data is invalid.
  - Example Response:
  {
    "error": "Validation error: username, email, and password are required."
  }

- **409 Conflict**: Returned when the username or email already exists in the database.
  - Example Response:
  {
    "error": "User already exists with this email or username."
  }

### Status Codes
- 201: Created
- 400: Bad Request
- 409: Conflict

This documentation provides a clear understanding of how to use the `/api/users/register` endpoint, including the required data and possible responses.