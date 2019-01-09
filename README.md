# usp-web-viewer

To realise the theory, Urban Strategy Playground; a research group which aims to generate tools to identify and analyse potential development strategies for densification in urban settings and to aid decision-taking authorities devise city planning schemes and legislation, has provided analysis tools on different platforms.

The main objective of this project is to realise such tool on the web platform using latest web technologies such as WebGL to display and manipulate 3D models on the web browsers and ReactJS to create fast and smooth web interface to let people analyse the strategy plans on the internet without installing an application in their devices.

## Live Demo
[USP Web Viewer](https://usp-web-viewer.herokuapp.com/?model=objexamples/Project.zip)

## Local setup for development

- Install [node.js](https://nodejs.org/en/) LTS release (tested on v8.9.x but should also work on v10).
- Install [yarn](https://yarnpkg.com/en/).
- clone the project in your local drive.
- go to the project root directory where the file _package.json_ lies and run the command `yarn install` to install the packages.

```
yarn install
``` 

- After the packages are installed, run the command `yarn build:dev` to build the project. This command will first build the project and start a watcher so when you change to files and save it, it will rebuild automatically and deployed.

```
yarn build:dev
```

- Once the project is compiled and served after running the above command, go to `localhost:8080` in the web browser to use the application.

## Production Build

- Follow the first four points from the above instructions on [_local setup for development_](#local-setup-for-development)
- After the dependencies are installed, from the main project directory, run the command `yarn build`. This command will build the production build and put the file in _dist/bundle.js_

```
yarn build
```

- Once the project is build, run the command `yarn start` to start the node server. _(src/server.js)_

```
yarn start
```
- Go to `localhost:8080` in your browser to run the application if you are on your local computer.

## Using server other than node.js

Since the whole application is client side (browser based) application, any server can be used to host these files.

Infact the node server _(src/server.js)_ is just a static server that hosts `index.html` and other files from the project directory.


If you want to use the server of your choice then just serve this project from the server's `public` folder and implement RESTful api and persistency layer of your choice.


## How it works

To load models either drop models into the drag and drop box in the dashboard from objexamples folder.
Alternatively we can provide query parameter pointing to the file in the source directory. 

for example: `/?model=objexamples/Project.zip`