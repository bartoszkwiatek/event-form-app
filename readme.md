# Event form app

## Project setup

To run this project (requires `docker`): 
```bash
docker compose build
docker compose up
# frontend runs on localhost:3000
# backend runs on localhost:4000

# to stop the containers
docker compose stop
```

In order to run tests packages need to be installed locally in frontend and backend folder
```bash
npm install
```

## Tests
In order to run tests packages need to be installed locally using `npm install`

### Frontend unit tests
in `frontend` folder
```bash
npm test
```

### Frontend e2e tests
To run e2e tests project must be running in docker, then in `frontend` folder:

To open cypress 
```bash
npm run cypress
```

To run headless e2e tests

```bash
npm run test:e2e
```

To run e2e tests in browser
```bash
npm run test:e2e:browser
```

### Backend tests
To run backend tests project must be running in docker, then in `backend` folder
```bash
npm test
```

## Backend endpoints 
### Create new event

#### URL
```
POST localhost:4000/events/
```

#### Request body

| Property | Requirements |
| ----------- | ----------- |
| firstName | string, not empty |
| lastName | string, not empty |
| email | string, email |
| eventDate | string, format: YYYY-MM-DD or YYYY/MM/DD |


Example request body: 
```
{
    "firstName": "Hiromu",
    "lastName": "Arakawa",
    "email": "hiromu@arakawa.com",
    "eventDate": "2022-02-22"
}
```


Example correct response: 
```
{
    "firstName": "Hiromu",
    "lastName": "Arakawa",
    "email": "hiromu@arakawa.com",
    "eventDate": "2022-02-22T00:00:00.000Z"
}
```

Example response to request with incorrect body:

```
{
    "firstName": "First name should be non-empty string",
    "lastName": "Last name should be non-empty string",
    "email": "Email should be in format address@domain.com",
    "eventDate": "Date should be in format YYYY-MM-DD"
}
```

### Status codes

| Status code | Description |
| ----------- | ----------- |
| 201 | Created |
| 422 | Incorrect body |
| 500 | Internal server error |


---


### Get all events

```
GET localhost:4000/events/
```

| Status code | Description |
| ----------- | ----------- |
| 200 | Ok |
| 500 | Internal server error |


