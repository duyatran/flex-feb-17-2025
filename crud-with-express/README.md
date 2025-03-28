# M03W06 - CRUD with Express
### To Do
- [ ] CRUD with Express
- [ ] Render data for the user using EJS templates
- [ ] Use forms to submit HTTP requests
- [ ] Explore the Post-Redirect-Get pattern

### CRUD on HTTP
- API: Application Programming Interface
- CRUD: set of operations that is typically done on a particular *resource* (or set of resources)
  - C: Create (New Resource Form + Save)
  - R: Read (Index/List + Show)
  - U: Update (Edit Form + Update)
  - D: Delete

### Routes
- Web Servers communicates to clients (browsers) in HTTP protocol
- HTTP Verbs: GET, POST, PUT, PATCH, DELETE
- A **route** is made up of an HTTP *verb* and *path*
- RESTful API for our bookstore page

```
CRUD      METHOD      PATH                ALTERNATIVE

CREATE    POST        /books                                  # Add a new book
READ      GET         /books                                  # List all books (index)
READ      GET         /books/:id                              # Show a specific book
UPDATE    POST        /books/:id          PUT /books/:id      # Edit a specific book
DELETE    POST        /books/:id/delete   DELETE /books/:id   # Delete a specific book
```

- Some supporting routes for serving HTML pages

```
CREATE    GET         /books/new        # Display NEW book form
UPDATE    GET         /books/:id/edit   # Display EDIT book form
```

### EJS (Embedded JavaScript)
- Helps us write HTML templates
- EJS supports adding JS logic to HTML templates
- EJS is back-end, and runs BEFORE it is sent to the browser (i.e. EJS does NOT run in a browser)
- V in the MVC pattern for separation of concerns
- By default, Express assumes template files are in your project's `/views` directory.
- EJS supports splitting and including **partial** views, so certain parts (header/navbar) of the
  page might be extracted out and [included](https://github.com/mde/ejs#includes).
- Data can be passed to both views and partials, see [examples here](https://www.digitalocean.com/community/tutorials/how-to-use-ejs-to-template-your-node-application#step-4-passing-data-to-views-and-partials)

### Forms vs Anchor Tags
- Anchor tags are generally used to link between websites or to different pages on the same site
- Anchor tags (`<a></a>`) only make `GET` requests
- Forms are used to transmit user data to servers
- Forms can only make either `GET` or `POST` requests (specified by the `method` attribute).
  - A workaround is possible with the [method-override](https://dev.to/moz5691/method-override-for-put-and-delete-in-html-3fp2) middleware

#### GET in form
- Query parameters specified right in the URL
- Easy to share
- Appropriate for searches and retrieving resources consistently

```HTML
<form method="GET" action="https://google.com/search">
    <input name="q">
```

`https://google.com/search?q=query+parameter+strings`

#### POST in form
- Not easily bookmarkable
- Does not show submission values in URL
- Appropriate for sign-ins, creating/updating data, etc. => actions you don't want as easily repeated or visible

```HTML
<form method="POST" action="https://site.com/sign-in">
    <input name="user">
    <input name="pass">
```

### Useful Links
- [CRUD](https://en.wikipedia.org/wiki/Create,_read,_update_and_delete)
- [Express](https://github.com/expressjs/express)
- [Embedded JavaScript (EJS)](https://github.com/mde/ejs)
- [Morgan](https://expressjs.com/en/resources/middleware/morgan.html)
- [Nodemon](https://github.com/remy/nodemon#nodemon)
- [HTTP Forms](https://developer.mozilla.org/en-US/docs/Learn/HTML/Forms/Sending_and_retrieving_form_data)
- [Method override for PUT and DELETE in HTML](https://dev.to/moz5691/method-override-for-put-and-delete-in-html-3fp2)
