# Commerce Bank Project -- Group 4     
### Team Members:   
Harrison Lara  
Daudi Williams  
Madison Hubbard  
Osama Alhaiki   
Sung Ho Lee  
  
## High Level Overview  
A web application that pulls in transaction details and allows the user to set triggers for notification rules and receive notifications around them.  The system should also save data to a database so recurring reports can be created.  

# Getting Started

## Prerequisites
  1. Install node.js globally -- https://nodejs.org/en/
       npm i npm -g
  2. Install mySQL -- https://dev.mysql.com/downloads/workbench/

## Running Environment for Development
  1. cd/commerce_project
  2. npm i
  3. npm start
      This will allow you develop at http://localhost:3000  

## Starting the Server
  1. cd/client/server
  2. npm i
  3. run node app.js
      This has the server(and MySQL) is running at http://localhost:3306

## Running Tests (Jest)
  1. npm test

## Creating a Build (Dont worry about this)
  1. npm build

## Versioning/ Releases
 1. Create a new branch from master
 2. Run one of three commands
    npm version patch (bug fixes)
    npm version minor (features)  
    npm version major (breaking changes)  
  3. Commit changes to branch and create PR to master
  4. git push --tags (create tag in git)    
