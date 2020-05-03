# Commerce Bank Project -- Group 4     
### Team Members:   
Harrison Lara  
Daudi Williams  
Madison Hubbard  
  
## High Level Overview  
A web application that pulls in transaction details and allows the user to set triggers for notification rules and receive notifications around them.  The system should also save data to a database so recurring reports can be created.  

# Getting Started -- MERN (Mongo, Express, React, Node)

## Prerequisites
  1. Install node.js globally -- https://nodejs.org/en/
       npm i npm -g

  2. Install Mongo DB -- https://docs.mongodb.com/manual/administration/install-community/  
      Install for your appropriate OS. Leave all the default options selected.
      The command interpreter can be found at "C:\Program Files\MongoDB\Server\4.2\bin\mongo.exe"

  3. Install Postman -- https://www.postman.com/downloads/  (Optional)
      This allows us to test the applications queries manually. 

## Running Environment for Development
  1. cd/commerce-project/client
  2. npm i
  3. npm start
      This will allow you develop at http://localhost:8000  
      
## Starting and Stopping Mongo DB
  1. Open a shell with admin rights or make sure VS Code is ran as Administrator.
  2. To start -- net start MongoDB
  3. To stop -- net stop MongoDB

  ## Creating a Mongo DB
  1. Open a shell with admin rights or make sure VS Code is ran as Administrator.
  2. run -- Mongo
  3. You'll see a > -- use commerce-bank
  4. You've created a DB.

  ## Starting the Server
  1. cd/server
  2. npm i
  3. run `node index.js`
      This has the server(and Mongo) is running at http://localhost:3000

  ## Using API's with POSTMAN  
  1. Open Postman
  2. In the URL enter the desired route.
  3. Select the API type (POST, GET, Delete, PUT).
  4. Under the body tab, select RAW, change type to JSON and enter:  
  5. Open Mongo Compass, click connect (leave connection blank) and you will see collections created
  
  Navigate to API README to see available APIS and their associated requests, payloads and responses. 
  https://github.com/umkc-cs-451-2020-spring/semester-project-group-4/tree/master/Commerce-Project/server

## Running Tests (Jest)
  1. npm test -- runs tests, creates coverage report and updates snapshots  
  2. Coverage Report -- Navigate to coverage/Icov-report/index.html(open in browser)  

  
## Material UI  
Our source of components comes directly from Material UI.  
Examples of how to use components and their API's can be found at: https://material-ui.com/  
The API for a component defines the properties that are available to use. 

## Versioning/ Releases
 1. Create a new branch from master
 2. Run one of three commands
    npm version patch (bug fixes)
    npm version minor (features)  
    npm version major (breaking changes)  
  3. Commit changes to branch and create PR to master
  4. git push --tags (create tag in git)    

## Creating an Optimized Build
  1. npm build
