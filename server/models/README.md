# Models Directory

This folder contains all `mongoose` models. These contain schemas, methods, and statics that are used to lookup, modify, and/or delete a document from *MongoDB*. This does not contain business logic, but only how documents are obtained and modified from the database

File name examples:

* `user.js` has the user model.
* `post.js` has the post model.

Correct lines of a model file:

```javascript
userSchema.methods.comparePassword = async function (password) {
  const matches = await bcrypt.compare(password, this.password);
  return matches;
};
```

Incorret lines of a model file:

```javascript
userSchema.methods.comparePassword = async function (password) {
  const matches = await bcrypt.compare(password, this.password);
  if(matches) {
    return {
      success: true, 
      message: "Your password is correct!",
      popupColor: green,
      user: this,
      token: ""
      // ... 
    }
  } else {
    return {
      success: true, 
      message: "Your password is incorrect!",
      popupColor: red,
      // ...
    }
  }
};
```