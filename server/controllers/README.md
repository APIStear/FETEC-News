# Controllers Directory

This folder contains all business logic for each route. It is helped out by models and their static methods, and by services.

File name examples:

* `user.js` has the user controllers.
* `post.js` has the post controllers.

Correct lines of a controller file:

```javascript
ctr.create = () => async (req,res,next) => {
  const { userId } = req.params;
  const { name } = req.body;
  if(!name || name == "") return Promise.reject(new MyError(400, "Category name not received"));
  let category = new Category({name, owner: userId})

  await category.save();
  category = category.toJSON();
  category.notes = [];
  return res.status(201).json({category});
}
```

Incorrect lines of a controller file:

```javascript
ctr.create = () => async (req,res,next) => {
  const { userId } = req.params;
  const { name } = req.body;
  if(!name || name == "") return Promise.reject(new MyError(400, "Category name not received"));
  let category = new Category({name, owner: userId})

  // DB logic should not be here, for these cases a presave hook can be used.
  const user = User.findById(userId).exec()
  if(!user) return Promis.reject(new MyError(404, "User not found"))


  await category.save();

  
  category = category.toJSON();
  category.notes = [];
  return res.status(201).json({category});
}
```