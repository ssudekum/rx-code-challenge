# rx-code-challenge

To use this API:

You will need to have Node installed on your machine. You can download it here - https://nodejs.org/en/

Clone the project to your local machine and run `npm install`, followed by `npm start`, to start the node server.

Once you have started the server, you can use the following to access the API

POST http://localhost:3000/nearest-pharmacy 

JSON body example:
```
{
    "latitude": 39,
    "longitude": -95
}
```

You will receive a 400 Bad Request if either value is missing, or they are outside of their possible ranges (-90 < lat < 90, -180 < lon < 180)

I use Postman (https://www.postman.com/postman/) to make most API requests, but there are a variety of ways that you can make requests.
