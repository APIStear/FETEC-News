# Routes Directory

This folder contains all routes, ordered by REST objects. No business logic should be contained in routes.

File name examples:

* `user.js` has all user routes.
* `post.js` has all post routes.

Correct line of a routes file: 

```javascript
// FIND ALL
router.get('/', aHandler(userCtr.findAll()));
```

Incorrect line of a routes file:

```javascript
// FIND ALL
router.get('/', aHandler((req,res,next) => {
  // logic to find all users
}));
```