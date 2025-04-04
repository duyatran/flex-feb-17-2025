# M03W07 - Security & Real World HTTP Servers

### To Do
- [ ] Storing passwords
- [ ] Cryptographically signed cookies
- [ ] HTTP Secure (HTTPS)
- [ ] REST

### Storing Passwords
* We **never** want to store passwords as plain text
* Passwords should always be _hashed_
* **Hashing**:
  * The original string is passed into a function that performs some kind of transformation on it and returns a different string (the _hash_)
  * This is a one way process: a hashed value cannot be retrieved
* We make hashing more secure by adding a _salt_ to the original string prior to hashing
* This [helps to protect against Rainbow Table attacks](https://stackoverflow.com/questions/420843/how-does-password-salt-help-against-a-rainbow-table-attack)

### Encrypted Cookies
* Plain text cookies can be manipulated by users
* It's better practice to use _encrypted_ cookies
* **Encryption**:
  * Similar to hashing, the string is scrambled/transformed by a function
  * This is a two-way process: encrypted strings can be decrypted by the intended recipient with **shared keys**
  * Sender and recipient(s) need to share:
    * one key: symmetric encryption
    * two keys: assymmetric encryption (public and private key)

### HTTP Secure (HTTPS)
* HTTPS uses Transport Layer Security (TLS) to encrypt communication between client and server
* Encrypted using asymmetric cryptography (servers)
* The public key is available to anyone who wants it and is used to encrypt the communication
* The private key is known only to the receiver and is used to decrypt the communication
* See [this video](https://www.youtube.com/watch?v=10aVMoalON8) for a better explanation

### REST (Representational State Transfer)

* REST means that the path that we are going to should represent the data being transferred
* An API that uses the REST convention is said to be RESTful
* RESTful routes look like:

  | **Method** | **Path** | **Purpose** |
  |:---:|:---|:---|
  | GET | /resources | Retrieve all of a resource (Browse) |
  | GET | /resources/:id | Retrieve a particular resource (Read) |
  | POST | /resources/:id | Update a resource (Edit) |
  | POST | /resources | Create a new resource (Add) |
  | POST | /resources/:id/delete | Delete an existing resource (Delete) |

* RESTful API's have some advantages:
  * If I know that your API is RESTful, then I can easily guess at what endpoints you have defined and I don't need to read your documentation to figure it out
  * Results in clean URLs (ie. `/resources` instead of `/get-my-resource`)
  * The desired action is implied by the HTTP verb
  * This method of specifying URLs is chainable (eg. `/users/123`, `/users/123/resources` or `/users/123/resources/456`)

* Selectors are always plural (eg. `/resources`, `/users`)
* Actions are always singular (eg. `/login`, `/register`)

### More HTTP Methods
- We have more [*verbs*](https://developer.mozilla.org/en-US/docs/Web/HTTP/Methods) available to us than just `GET` and `POST`
- Popular ones are `PUT`, `PATCH`, and `DELETE`
- `PUT`: used to replace an existing resource
- `PATCH`: update part of an exisiting resource
- `DELETE`: delete an existing resource
- We can access these other methods via AJAX requests (we'll introduce you to AJAX in week 4) or by using the [`method-override`](https://www.npmjs.com/package/method-override) package
- Using these new verbs, our routes table now looks like:

  | **Method** | **Path** | **Purpose** |
  |:---:|:---|:---|
  | GET | /resources | Retrieve all of a resource (Browse) |
  | GET | /resources/:id | Retrieve a particular resource (Read) |
  | PUT | /resources/:id | Replace a resource (Edit) |
  | PATCH | /resources/:id | Update a resource (Edit) |
  | POST | /resources | Create a new resource (Add) |
  | DELETE | /resources/:id | Delete an existing resource (Delete) |

### Useful Links
* [How HTTPS Works (...and SSL/TLS too)](https://www.youtube.com/watch?v=10aVMoalON8)
* [Client Session vs Server Session](http://www.rodsonluo.com/client-session-vs-server-session)
* [A typical RESTful API guide](https://restfulapi.net/rest-api-best-practices/)
