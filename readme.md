This is the server side part of airNotes.
The client side and the server side code of this app are independent, and hence uploaded separately.

The backend is built with the help of Express js, which is a Node js web applicaiton framework.
Mongo DB is used as the main data base tool. To facilitate easy interaction between Node js and the Mongo DB server, Mongoose is used.

To ensure the security of data, Hashing and JWT authentication are also applied. Hashing is done using bcrypt.js and authenticaiton is done by the JSON Web Token.
The combinaiton of these two ensures that even if someone tries to hack the database, the private informaiton won't be leaked!!! 