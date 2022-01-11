## Introduction
The Frontend is created in React and the server is developped with Express.

## Groupomania 

To run the Frontend you have to install [React-Redux](https://react-redux.js.org/introduction/getting-started) version 7.1+ 

## Server 

- Clone this repo. 
- Install [MySQL](https://dev.mysql.com/downloads/mysql/) 
macos : brew install mysql
- Run the sql server : 
mysql.server start
- Connect to server : 
mysql --user=root
- Create database on the sql terminal :
CREATE database groupomania;
- Quit sql terminal :
quit;
- Go to config file :
cd backend/config/
- Import database script :
mysql --user=root groupomania < ./database.sql
- Check database :
mysql --user=root
use groupomania;
show tables;

You should have
+-----------------------+
| Tables_in_groupomania |
+-----------------------+
| comments              |
| posts                 |
| users                 |
+-----------------------+
3 rows in set (0,01 sec)

From within the project folder, go to the Back end with `cd backend` then run `npm install`. 
Install globaly nodemon : `npm i -g nodemon`
You can run the server with `nodemon server.js`. 

In another terminal, go to the folder Front end with `cd frontend` and run `npm install` then `npm start`. The server should run on `localhost` on port `8080`. 

