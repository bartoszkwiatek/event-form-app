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

## Backend endpoints
### Create new event

```
POST localhost:4000/events/
```

| Status code | Description |
| ----------- | ----------- |
| 201 | Created |
| 500 | Internal server error |


### Get all events

```
GET localhost:4000/events/
```

| Status code | Description |
| ----------- | ----------- |
| 200 | Ok |
| 500 | Internal server error |
