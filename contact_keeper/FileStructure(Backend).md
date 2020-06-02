# Backend File Structure

## Overview of the file structure

| File Tree                      | functionality                                                |
| ------------------------------ | ------------------------------------------------------------ |
| 📦contact_keeper                |                                                              |
| ┣ `📂client`                    | `(Front-end folder)`                                         |
| ┣ 📂config                      | `(Configurations folder for different deployment environment)` |
| ┃ ┣ 📜db.js                     | (Connect mongoDB)                                            |
| ┃ ┣ 📜default.json              | (Some variables used during development)                     |
| ┃ ┗ 📜production.json           | (Same variables <u>(usually with different values)</u> during production) |
| ┣ 📂middleware                  | `(Token verification)`                                       |
| ┃ ┗ 📜auth.js                   | (Compare token with secret)                                  |
| ┣ 📂models                      | `(Prototypes of documents in each collections)`              |
| ┃ ┣ 📜Contact.js                | (Contact collection)                                         |
| ┃ ┗ 📜User.js                   | (User collection)                                            |
| ┣ 📂routes                      | `(Route folder for available routes)`                        |
| ┃ ┣ 📜auth.js                   | (Authentification endpoints)                                 |
| ┃ ┣ 📜contacts.js               | (Contacts-related endpoints)                                 |
| ┃ ┗ 📜users.js                  | (User-related endpoints)                                     |
| ┣ 📂node_modules                | `(NodeJS dependencies)`                                      |
| ┣ 📜FileStructure(Back-end).md  |                                                              |
| ┣ 📜FileStructure(Front-end).md |                                                              |
| ┣ 📜README.md                   |                                                              |
| ┣ 📜package-lock.json           |                                                              |
| ┣ 📜package.json                |                                                              |
| ┗ 📜server.js                   | ***(Main app.js)***                                          |
|                                |                                                              |

---

## Explanation

### Process of running files

`server.js` defines three `routes`. Each `route.js` contains several `endpoints` where each end points may collaborating with different `models` and use variables stored in `config`. During the whole process, `middleware.js` provides specific functionalities (such as parsing token to id), and accepts the request data and passes it to the server to continue.

|  server   | middleware/ |   Routes/   |   models   |     Config      |      |
| :-------: | :---------: | :---------: | :--------: | :-------------: | ---- |
|           |             |   auth.js   | Contact.js | production.json |      |
| server.js |   auth.js   | contacts.js |            |      db.js      |      |
|           |             |  users.js   |  User.js   |  default.json   |      |

---

### server.js 

It is the main app file for back-end. The first file to be run everytime we start the server. It keeps listening to the port defined for development, and update the server everytime changes made in its components (routes, middlewares)

| Functionality       | function                                            | Dependency |
| ------------------- | --------------------------------------------------- | ---------- |
| connect to database | `connextDB()`                                       | db.js      |
| Inite middleware    | ```app.use(express.json({ extended: false }));```   | express    |
| Define routes       | `app.use("/api/users", require("./routes/users"));` | express    |
| Listen to the port  | `app.listen()`                                      | express    |
| Production          | path.resolve()                                      | path       |

*Once we inite the middleware, we can accept data from request input (as json format in body)*

### Questions:

- [ ] When does `app`, `process`, `res` been declared? What are they used for?
- [ ] How does it interact with other files? Especially with middlewares?
- [ ] What is `app.use()` used for?([link](https://expressjs.com/en/4x/api.html#middleware-callback-function-examples))

---

### routes/auth.js 

It is a route component which contains 2 endpoints related to authentification, included in the table below.

|            ENdpoint            | Dependency       |
| :----------------------------: | :--------------- |
| http://localhost:5000/api/auth | express.router() |

| Functionality | Function        | Description        | Access  |
| :-----------: | --------------- | ------------------ | ------- |
|      GET      | `router.get()`  | Get logged in user | Private |
|     POST      | `router.post()` | Logged in user     | Public  |

HTTP requests in steps:

|   HTTP request   | Steps                                                | dependency         |
| :--------------: | ---------------------------------------------------- | ------------------ |
|       GET        | 1. Check the authentification by comparing tokens    | middleware/auth.js |
|                  | 2. Search logged in user in mongoDB through mongoose | models/User.js     |
|   (If exists)    | 3. Pass `User` (document) found to `res`             | express            |
|     (If not)     | [3. Sent Alert Message]                              | express            |
| GET-return: JSON | [User] or [Alert Message]                            | /                  |




|   HTTP request    | Steps                                                        | dependency        |
| :---------------: | ------------------------------------------------------------ | ----------------- |
|       POST        | 1. Validate the form                                         | express-validator |
|                   | 2. Compare emails [if exists, get User(document)] [if not, alert] | models/User.js    |
|                   | 3. Compare password                                          | bcrypt            |
|    (if exists)    | 4.1. Sign the payload (user object with id attribute only), create `token` | jsonwebtoken      |
|                   | 4.2. Sent `token` to `res`                                   | express           |
|     (if not)      | [4. Sent alert message]                                      | express           |
| POST-return: JSON | [token] or [Alert Message]                                   | /                 |

---

### routes/users.js  

It is a user component which contains only 1 endpoint related to users, included in the table below.

|            ENdpoint             | Dependency       |
| :-----------------------------: | :--------------- |
| http://localhost:5000/api/users | express.router() |

| Functionality | Function        | Description     | Access |
| :-----------: | --------------- | --------------- | ------ |
|     POST      | `router.post()` | Register a user | Public |

HTTP requests in steps:

|   HTTP request    | Steps                                                        | dependency        |
| :---------------: | ------------------------------------------------------------ | ----------------- |
|       POST        | 1. Validate the form                                         | express-validator |
|                   | 2. Check if the email exists                                 | models/User.js    |
|     (If not)      | 3.1 Encrypt the password                                     | bcrypt            |
|                   | 3.2 Save the User to mongoDB (user collection)               | models/User.js    |
|                   | 3.3 Sign the payload (user object with id attribute only), create `token` | jsonwebtoken      |
|                   | 3.4 Pass the `token` to `res`                                | express           |
|    (If exists)    | [3. Sent alert message]                                      | express           |
| POST-return: JSON | [token] or [Alert Message]                                   | /                 |

---

### routes/contacts.js 

It is a contacts component which contains 4 endpoint related to contacts included in the table below.

|              ENdpoint              | Dependency       |
| :--------------------------------: | :--------------- |
| http://localhost:5000/api/contacts | express.router() |

| Functionality | function          | Description                          | Access  |
| :-----------: | ----------------- | ------------------------------------ | ------- |
|     POST      | `router.post()`   | Update a contact of a logged in user | Private |
|      PUT      | `router.put()`    | Add a contact to logged in user      | Private |
|      GET      | `router.get()`    | Get all contacts of a logged in user | Private |
|    DELETE     | `router.delete()` | Delete a contact of a logged in user | Private |

HTTP requests in steps:



|       HTTP request        | Steps                                             | dependency         |
| :-----------------------: | ------------------------------------------------- | ------------------ |
|           POST            | 1. Check the authentification by comparing tokens | middleware/auth.js |
| (If matches an `User.id`) | 2. Validate the form                              | express-validator  |
|    (If form completed)    | 3. Add Contact to mongoDB                         | models/Contact.js  |
|                           | 4. Pass `Contact` to `res`                        | express            |
|        (If failed)        | [Sent alert message]                              | express            |
|     POST-return: JSON     | [token] or [Alert Message]                        | /                  |

PUT Endpoint: http://localhost:5000/api/contacts/:id    (_id of the Contact document to be changed)

|        HTTP request         | Steps                                                        | dependency         |
| :-------------------------: | ------------------------------------------------------------ | ------------------ |
|             PUT             | 1. Check the authentification by comparing tokens            | middleware/auth.js |
|                             | 2. Validate the form [Alert message if blanks]               | express-validator  |
|                             | 3. Check if the Contact exists                               | models/Contact.js  |
|                             | 4. Check userid of the Contact (prevent deleting others contacts) |                    |
|        (If all pass)        | 5. Update the Contact in mongoDB                             | models/Contact.js  |
|                             | 6. Pass `Contact` to `res`                                   | express            |
| (If failed or server error) | [Sent alert message]                                         | express            |
|      POST-return: JSON      | [token] or [Alert Message]                                   | /                  |



|       HTTP request        | Steps                                             | dependency         |
| :-----------------------: | ------------------------------------------------- | ------------------ |
|            GET            | 1. Check the authentification by comparing tokens | middleware/auth.js |
| (If matches an `User.id`) | 2. Find all contacts with `User.id` matched       | models/Contact.js  |
|                           | 3. Pass `Array of Contacts` to `res`              | bcrypt             |
|         (If not)          | [2. Sent alert message (unauthorized)]            | middleware/auth.js |
|     (If server error)     | [Sent alert message]                              | express            |
|     POST-return: JSON     | [token] or [Alert Message]                        | /                  |



|        HTTP request         | Steps                                                | dependency        |
| :-------------------------: | ---------------------------------------------------- | ----------------- |
|           DELETE            | 1. Validate the form                                 | express-validator |
|                             | 2. Check if the email exists                         | models/User.js    |
|          (If not)           | 3.1 Encrypt the password                             | bcrypt            |
|                             | 3.2 Save the Contact to mongoDB (contact collection) | models/User.js    |
|                             | 3.3 Pass the `Contact` to `res`                      | express           |
| (If exists or server error) | 5. Sent alert message                                | express           |
|      POST-return: JSON      | [token] or [Alert Message]                           | /                 |

|        HTTP request         | Steps                                             | dependency         |
| :-------------------------: | ------------------------------------------------- | ------------------ |
|           DELETE            | 1. Check the authentification by comparing tokens | middleware/auth.js |
|  (If matches an `User.id`)  | 2. Check if the Contact exists                    | models/Contact.js  |
|         (If exists)         | 3. Delete the Contact in mongoDB                  | models/Contact.js  |
|                             | 4. Pass `success msg` object to `res`             | express            |
| (If failed or server error) | [Sent alert message]                              | express            |
|      POST-return: JSON      | [token] or [Alert Message]                        | /                  |

---

### middleware/auth.js

It is a widdleware component, which does not check authentification, but parse the token to User.id for further authentification in different endpoints.

| Functionality    | function                                          | Dependency |
| ---------------- | ------------------------------------------------- | ---------- |
| Velidate request | `const token = req.header("x-auth-token");`       |            |
| Parse token      | ```app.use(express.json({ extended: false }));``` | express    |









