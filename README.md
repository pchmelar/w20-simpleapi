# w20-simpleapi
Simple API for W20 homeworks  
Live example on https://young-anchorage-14163.herokuapp.com

## Resource: car

```json
{
	"brand": String,
	"model": String,
	"year": Number,
	"ownerId": Schema.ObjectId,
	"plateId": Schema.ObjectId, 
}
```

GET /car - get list of cars  
Status codes: 200 - ok, 400 - bad request

GET /car?brand={String} - get list of cars filtered by brand  
Status codes: 200 - ok, 400 - bad request

GET /car?model={String} - get list of cars filtered by model  
Status codes: 200 - ok, 400 - bad request

GET /car?year={Number} - get list of cars filtered by year  
Status codes: 200 - ok, 400 - bad request

GET /car/:id - get specific car  
Status codes: 200 - ok, 400 - bad request, 404 - not found

POST /car - create car  
Status codes: 201 - created, 400 - bad request

PUT /car/:id - update specific car  
Status codes: 200 - ok, 400 - bad request, 404 - not found

DELETE /car/:id - delete specific car  
Status codes: 200 - ok, 400 - bad request, 404 - not found

## Resource: owner

```json
{
	"name": String,
	"surname": String,
	"age": Number,
	"places": Array,
}
```

GET /owner - get list of owners  
Status codes: 200 - ok, 400 - bad request

GET /owner/:id - get specific owner  
Status codes: 200 - ok, 400 - bad request, 404 - not found

POST /owner - create owner  
Status codes: 201 - created, 400 - bad request

PUT /owner/:id - update specific owner  
Status codes: 200 - ok, 400 - bad request, 404 - not found

DELETE /owner/:id - delete specific owner  
Status codes: 200 - ok, 400 - bad request, 404 - not found

## Resource: place

```json
{
    "street": String,
    "number": Number,
    "city": String,
    "postalCode": String,
    "country": String,
}
```

GET /place - get list of places  
Status codes: 200 - ok, 400 - bad request

GET /place/:id - get specific place  
Status codes: 200 - ok, 400 - bad request, 404 - not found

POST /place - create place  
Status codes: 201 - created, 400 - bad request

PUT /place/:id - update specific place  
Status codes: 200 - ok, 400 - bad request, 404 - not found

DELETE /place/:id - delete specific place  
Status codes: 200 - ok, 400 - bad request, 404 - not found

## Resource: plate

```json
{
	"plate": String,
}
```

GET /plate - get list of plates  
Status codes: 200 - ok, 400 - bad request

GET /plate/:id - get specific plate  
Status codes: 200 - ok, 400 - bad request, 404 - not found

POST /plate - create plate  
Status codes: 201 - created, 400 - bad request

PUT /plate/:id - update specific plate  
Status codes: 200 - ok, 400 - bad request, 404 - not found

DELETE /plate/:id - delete specific plate  
Status codes: 200 - ok, 400 - bad request, 404 - not found

## Resource: customer

```json
{
	"name": String,
	"orders": Array,
}
```

GET /customer - get list of customers  
Status codes: 200 - ok, 400 - bad request

GET /customer/:id - get specific customer  
Status codes: 200 - ok, 400 - bad request, 404 - not found

POST /customer - create customer  
Status codes: 201 - created, 400 - bad request

PUT /customer/:id - update specific customer  
Status codes: 200 - ok, 400 - bad request, 404 - not found

DELETE /customer/:id - delete specific customer  
Status codes: 200 - ok, 400 - bad request, 404 - not found