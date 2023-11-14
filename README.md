# ShittyAuthServer-Frontend
This project is intended to be a replacement for the WebinterfaceAPI-based default frontend of the [ShittyAuthServer](https://github.com/MrLetsplay2003/ShittyAuthServer).

It is currently heavily work in progress and not production ready!

## Configuration
By default, the frontend will use `http://localhost:8880/api/shittyauth` as the API URL.

To change this, edit the `public/config.json` file and insert the correct URL.

## Notes
Currently, to prevent CORS issues, you should run the frontend under the same origin (host + port) as the backend (e.g. using a reverse proxy setup).

## Building
To build the project for deployment, just run the
```
$ npm run build
```
command. This will generate all necessary files in the `dist` directory.

Then, just host the files using any HTTP server you like.
