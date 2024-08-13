# User Exercise Tracker

This project is a microservice API for managing users and their exercise logs. It allows for creating users, adding exercises, and retrieving exercise logs with various filtering options.

## Description

This microservice provides endpoints to manage user data and exercise logs. You can create users, add exercises to their logs, and retrieve logs with specific details and filters.

### Endpoints

1. **POST** `/api/users`

   - **Description**: Create a new user with a username.
   - **Request Body**:
     - `username`: A string representing the user's username.
   - **Response**:
     ```json
     {
       "username": "fcc_test",
       "_id": "5fb5853f734231456ccb3b05"
     }
     ```

2. **GET** `/api/users`

   - **Description**: Retrieve a list of all users.
   - **Response**: An array of user objects, each containing `username` and `_id`.
     ```json
     [
       {
         "username": "fcc_test",
         "_id": "5fb5853f734231456ccb3b05"
       }
     ]
     ```

3. **POST** `/api/users/:_id/exercises`

   - **Description**: Add an exercise to a user’s log.
   - **Request Body**:
     - `description`: A string describing the exercise.
     - `duration`: A number representing the duration of the exercise in minutes.
     - `date` (optional): A string representing the date of the exercise. Defaults to the current date if not provided.
   - **Response**: The user object with the added exercise fields.
     ```json
     {
       "username": "fcc_test",
       "_id": "5fb5853f734231456ccb3b05",
       "exercise": {
         "description": "test",
         "duration": 60,
         "date": "Mon Jan 01 1990"
       }
     }
     ```

4. **GET** `/api/users/:_id/logs`

   - **Description**: Retrieve the full exercise log for a user.
   - **Query Parameters** (optional):
     - `from`: Start date in `yyyy-mm-dd` format.
     - `to`: End date in `yyyy-mm-dd` format.
     - `limit`: Number of logs to return.
   - **Response**:
     ```json
     {
       "username": "fcc_test",
       "count": 1,
       "_id": "5fb5853f734231456ccb3b05",
       "log": [
         {
           "description": "test",
           "duration": 60,
           "date": "Mon Jan 01 1990"
         }
       ]
     }
     ```

## Example Usage

1. Create a user:

   **POST** `/api/users`
   ```json
   {
     "username": "fcc_test"
   }
    ```

Example response:
```
{
  "username": "fcc_test",
  "_id": "5fb5853f734231456ccb3b05"
}
```

Add an exercise to a user:

POST /api/users/5fb5853f734231456ccb3b05/exercises

```
{
  "description": "test",
  "duration": 60,
  "date": "Mon Jan 01 1990"
}
```
Example response:

```
{
  "username": "fcc_test",
  "_id": "5fb5853f734231456ccb3b05",
  "exercise": {
    "description": "test",
    "duration": 60,
    "date": "Mon Jan 01 1990"
  }
}
```

Get a user's log:

GET /api/users/5fb5853f734231456ccb3b05/logs

Example response:
```
{
  "username": "fcc_test",
  "count": 1,
  "_id": "5fb5853f734231456ccb3b05",
  "log": [
    {
      "description": "test",
      "duration": 60,
      "date": "Mon Jan 01 1990"
    }
  ]
}
```

## Technologies Used
- Node.js: JavaScript runtime for the server.
- Express: Web framework used to build the HTTP server.
- MongoDB: Database used to store user and exercise data.

## Deploy
[Exercise tracker](https://exercise-tracker-a5gl.onrender.com/)
