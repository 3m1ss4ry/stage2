# API Documentation

Welcome to the documentation for the Express.js CRUD API with Sequelize and MySQL. This API allows you to perform CRUD (Create, Read, Update, Delete) operations on "person" records in a MySQL database.

## Base URL

The base URL for all API endpoints is:

http://localhost:3000/api


## API Endpoints

### Create a Person

- **URL:** `/`
- **Method:** `POST`
- **Request Body:**
  - `name` (string, required): The name of the person.
  - `age` (integer): The age of the person.

**Example Request:**

```http
POST http://localhost:3000/api
Content-Type: application/json

{
  "name": "John Doe",
  "age": 30
}
Example Response (201 Created):


{
  "id": 1,
  "name": "John Doe",
  "age": 30,
  "createdAt": "2023-09-xxTxx:xx:xx.xxZ",
  "updatedAt": "2023-09-xxTxx:xx:xx.xxZ"
}
Read a Person
URL: /:id
Method: GET
URL Parameters:
id (integer, required): The ID of the person.
Example Request:

GET http://localhost:3000/api/1
Example Response (200 OK):

{
  "id": 1,
  "name": "John Doe",
  "age": 30,
  "createdAt": "2023-09-xxTxx:xx:xx.xxZ",
  "updatedAt": "2023-09-xxTxx:xx:xx.xxZ"
}
Example Response (404 Not Found):

{
  "message": "Person not found"
}
Update a Person
URL: /:id
Method: PUT
URL Parameters:
id (integer, required): The ID of the person.
Request Body:
name (string, required): The updated name of the person.
age (integer): The updated age of the person.
Example Request:

PUT http://localhost:3000/api/1
Content-Type: application/json

{
  "name": "Updated Name",
  "age": 35
}
Example Response (200 OK):

{
  "id": 1,
  "name": "Updated Name",
  "age": 35,
  "createdAt": "2023-09-xxTxx:xx:xx.xxZ",
  "updatedAt": "2023-09-xxTxx:xx:xx.xxZ"
}
Example Response (404 Not Found):

{
  "message": "Person not found"
}
Delete a Person
URL: /:id
Method: DELETE
URL Parameters:
id (integer, required): The ID of the person.
Example Request:

DELETE http://localhost:3000/api/1
Example Response (204 No Content):

No content is returned on successful deletion.

Example Response (404 Not Found):

{
  "message": "Person not found"
}
Error Handling
The API handles errors gracefully and returns appropriate HTTP status codes and error messages in the response. Common error scenarios include validation errors, not found (404), and server errors (500).

Security Considerations:
Ensure that your API is only accessible over HTTPS to encrypt data in transit.
Implement authentication and authorization mechanisms as needed to restrict access.
Validate user input to prevent SQL injection and other security vulnerabilities.
Apply rate limiting to prevent abuse and DoS attacks.
Keep your dependencies up-to-date to patch security vulnerabilities.
Contributing
Contributions are welcome! If you find any issues or have suggestions for improvements, please open an issue or create a pull request.

