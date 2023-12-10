# React Voting App

[Netlify Link](https://visionary-panda-e6dd39.netlify.app)

**Note:** The APIs used in this project are powered by [MockAPI](https://www.mockapi.io/).

## User's API

The User's API is structured with the following schema:

| Field    | Type      |
| -------- | --------- |
| id       | Object ID |
| name     | string    |
| email    | string    |
| password | string    |
| voted    | boolean   |
| votedTo  | Object    |
| isAdmin  | boolean   |

For testing the React application, you can use the following users:

| Type  | Name  | Email           | Password  |
| ----- | ----- | --------------- | --------- |
| Admin | Simon | simon@simon.com | password1 |
| User  | John  | john@doe.com    | password2 |
