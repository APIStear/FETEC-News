# Middleware Directory

This folder contains all middelware methods. These are methods that run regularly before, but can be after in some cases, our controller that either prepare, validate, or add data to the request needed by the controller. This is usually actions used by multiple endpoints, such as authentication checks, parameter validation, and error handling.

Each middleware function *must* have `req`, `res`, and `next`, but can also have `error` if it is added after the controller. The latter is usually to handle an error passed by the controller, either to do some cleanup, or to decide wether or not it is safe to show the error to the user, or it needs some