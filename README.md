# Ticketing App Backend 
The backend of the application was build using Express.js on NodeJS

[Here is the link of the front end of this application](https://github.com/h4k5r/Ticketing-Web-FrontEnd "Front End")


# Before Getting Started
Create a file names ApiKeys.js in the project directory with the following keys exported
```javascript
exports.mongoUrl = 'YourMongoDBUrl';
exports.jwtUserKey = 'secretJWTKey';
exports.jwtAdminKey = 'secretAdminJWTKey';
exports.twilioAccountSID = 'YourTwilioAccountSID';
exports.twilioAuthToken = 'YourTwilioAuthToken';
```
# Getting Started
To install all the node modules used in this project.
```shell
npm install
```

To run the application with nodemon listening to any changes. 
```shell
npm start
```
