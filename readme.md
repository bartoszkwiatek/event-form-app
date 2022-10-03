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
### Add new event

#### URL
```
POST localhost:4000/events/
```

#### Request body

| Property | Requirements |
| ----------- | ----------- |
| title | string, 8-64 characters |
| shortDescription | string, 8-256 characters |
| fullDescription | string, 8-4096 characters |
| location | string, 8-64 characters |
| email | string, email |
| eventDate | string, format: ISO8601 |


Example request body: 
```
{
   "title":"Lorem event 1",
   "shortDescription":"Lorem ipsum dolor sit amet consectetur",
   "fullDescription":"Lorem ipsum dolor sit amet consectetur, adipisicing elit.",
   "email":"hiromu@arakawa.com",
   "location":"Random location",
   "eventDate":"2019-09-18T19:00:52Z"
}
```


Example correct response: 
```
{
   "id": "63371a90082b53f43ff241df",
   "title":"Lorem event 1",
   "shortDescription":"Lorem ipsum dolor sit amet consectetur",
   "fullDescription":"Lorem ipsum dolor sit amet consectetur, adipisicing elit.",
   "email":"hiromu@arakawa.com",
   "location":"Random location",
   "eventDate":"2019-09-18T19:00:52Z"
}
```

Example response to request with incorrect body:

```
{
    "title": "Title should string 8-64 characters",
    "shortDescription": "Short description should be string 8-256 characters",
    "fullDescription": "Short description should be string 8-4096 characters",
    "location": "Location should be string 8-64 characters",
    "email": "Email should be in format address@domain.com",
    "eventDate": "Date should be in ISO8601 format"
}
```

#### Status codes

| Status code | Description |
| ----------- | ----------- |
| 201 | Created |
| 422 | Incorrect body |
| 500 | Internal server error |


---

### Update event

#### URL
```
PUT localhost:4000/events/:eventId
```

#### Request params
| Params | Requirements |
| ----------- | ----------- |
| eventId | string, mongoID |

#### Request body

| Property | Requirements |
| ----------- | ----------- |
| title | string, 8-64 characters |
| shortDescription | string, 8-256 characters |
| fullDescription | string, 8-4096 characters |
| location | string, 8-64 characters |
| email | string, email |
| eventDate | string, format: ISO8601 |


Example request body: 
```
{
   "title":"Lorem event 1",
   "shortDescription":"Lorem ipsum dolor sit amet consectetur",
   "fullDescription":"Lorem ipsum dolor sit amet consectetur, adipisicing elit.",
   "email":"hiromu@arakawa.com",
   "location":"Random location",
   "eventDate":"2019-09-18T19:00:52Z"
}
```


Example correct response: 
```
{
   "id": "63371a90082b53f43ff241df",
   "title":"Lorem event 1",
   "shortDescription":"Lorem ipsum dolor sit amet consectetur",
   "fullDescription":"Lorem ipsum dolor sit amet consectetur, adipisicing elit.",
   "email":"hiromu@arakawa.com",
   "location":"Random location",
   "eventDate":"2019-09-18T19:00:52Z"
}
```

Example response to incorrect request:

```
{
    "eventId": "Event id is not correct",
    "title": "Title should string 8-64 characters",
    "shortDescription": "Short description should be string 8-256 characters",
    "fullDescription": "Short description should be string 8-4096 characters",
    "location": "Location should be string 8-64 characters",
    "email": "Email should be in format address@domain.com",
    "eventDate": "Date should be in ISO8601 format"
}
```

#### Status codes

| Status code | Description |
| ----------- | ----------- |
| 200 | OK |
| 404 | Not found |
| 422 | Incorrect body |
| 500 | Internal server error |


---

### Get all events

#### URL
```
GET localhost:4000/events/
```

Example correct response: 
```
[{
   "id": "63371a90082b53f43ff241df",
   "title":"Lorem event 1",
   "shortDescription":"Lorem ipsum dolor sit amet consectetur",
   "email":"hiromu@arakawa.com",
   "location":"Random location",
   "eventDate":"2019-09-18T19:00:52Z"
},
{
   "id": "43371a90082b53f43ff241df",
   "title":"Lorem event 2",
   "shortDescription":"Lorem ipsum dolor sit amet consectetur",
   "email":"hiromu@arakawa.com",
   "location":"Random location",
   "eventDate":"2019-10-18T19:00:52Z"
}]
```

#### Status codes
| Status code | Description |
| ----------- | ----------- |
| 200 | Ok |
| 500 | Internal server error |

### Get event details

#### URL
```
GET localhost:4000/events/:eventId
```

#### Request params
| Params | Requirements |
| ----------- | ----------- |
| eventId | string, mongoID |


Example correct response: 
```
{
   "id": "63371a90082b53f43ff241df",
   "title":"Lorem event 1",
   "shortDescription":"Lorem ipsum dolor sit amet consectetur",
    "fullDescription": "Short description should be string 8-4096 characters",
   "email":"hiromu@arakawa.com",
   "location":"Random location",
   "eventDate":"2019-09-18T19:00:52Z"
},
```

Example response to incorrect request:

```
{
    "eventId": "Event id is not correct",
}
```

#### Status codes
| Status code | Description |
| ----------- | ----------- |
| 200 | Ok |
| 404 | Not found |
| 500 | Internal server error |

### Delete event

#### URL
```
DELETE localhost:4000/events/:eventId
```

#### Request params
| Params | Requirements |
| ----------- | ----------- |
| eventId | string, mongoID |


Example correct response: 
```
{
   "id": "63371a90082b53f43ff241df",
},
```

Example response to incorrect request:

```
{
    "eventId": "Event id is not correct",
}
```

#### Status codes
| Status code | Description |
| ----------- | ----------- |
| 200 | Ok |
| 404 | Not found |
| 500 | Internal server error |

