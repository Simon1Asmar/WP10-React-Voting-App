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

Here's the resource data
```json
[
  {
    "name": "Simon",
    "email": "simon@simon.com",
    "password": "password1",
    "voted": true,
    "votedTo": {
      "name": "Glowberry",
      "imageLink": "https://drinkprime.com/cdn/shop/files/GlowberryFrontRenderUpdated_1000x.png",
      "numOfVotes": 1,
      "id": "1"
    },
    "isAdmin": true,
    "id": "1"
  },
  {
    "name": "John",
    "email": "john@doe.com",
    "password": "password2",
    "voted": false,
    "votedTo": {},
    "isAdmin": false,
    "id": "2"
  }
]
```

### Testing Accounts
For testing the React application, you can use the following users:

| Type  | Name  | Email           | Password  |
| ----- | ----- | --------------- | --------- |
| Admin | Simon | simon@simon.com | password1 |
| User  | John  | john@doe.com    | password2 |

## VotingOptions API

The VotingOptions API is structured with the following schema:

| Field       | Type          |
|-------------|---------------|
| id          | Object ID     |
| name        | string        |
| imageLink   | string        |
| numOfVotes  | number        |

Here is the resource data:

```json
[
  {
    "name": "Glowberry",
    "imageLink": "https://drinkprime.com/cdn/shop/files/GlowberryFrontRenderUpdated_1000x.png",
    "numOfVotes": 1,
    "id": "1"
  },
  {
    "name": "Lemonade",
    "imageLink": "https://drinkprime.com/cdn/shop/files/BottleFront_1000x.png",
    "numOfVotes": 0,
    "id": "2"
  },
  {
    "name": "Strawberry Watermelon",
    "imageLink": "https://drinkprime.com/cdn/shop/products/Front_1000x.png",
    "numOfVotes": 0,
    "id": "3"
  },
  {
    "name": "Meta Moon",
    "imageLink": "https://drinkprime.com/cdn/shop/products/Prime-Metamoon-ProductDetail-front_1000x.png",
    "numOfVotes": 0,
    "id": "4"
  },
  {
    "name": "Ice Pop",
    "imageLink": "https://drinkprime.com/cdn/shop/products/PrimeHydration_1serve_IcePop_0000_1000x.png",
    "numOfVotes": 0,
    "id": "5"
  },
  {
    "name": "Blue Raspberry",
    "imageLink": "https://drinkprime.com/cdn/shop/products/PrimeHydration_1serve_bluerasberry_0000_1000x.png",
    "numOfVotes": 0,
    "id": "6"
  },
  {
    "name": "Tropical Punch",
    "imageLink": "https://drinkprime.com/cdn/shop/products/PrimeHydration_1serve_tropicalpunch_0000_1000x.png",
    "numOfVotes": 0,
    "id": "7"
  },
  {
    "name": "Lemon Lime",
    "imageLink": "https://drinkprime.com/cdn/shop/products/PrimeHydration_1serve_lemonlime_0000_1000x.png",
    "numOfVotes": 0,
    "id": "8"
  },
  {
    "name": "Grape",
    "imageLink": "https://drinkprime.com/cdn/shop/products/PrimeHydration_1serve_grape_0000_1000x.png",
    "numOfVotes": 0,
    "id": "9"
  },
  {
    "name": "Orange",
    "imageLink": "https://drinkprime.com/cdn/shop/products/PrimeHydration_1serve_orange_0000_1000x.png",
    "numOfVotes": 0,
    "id": "10"
  }
]
```
