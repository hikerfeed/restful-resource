<p align="center"><img width="300" src="https://hikerfeed.com/_nuxt/img/f3d1507.svg"></p>

---

# RESTful Resource

<img src="https://github.com/hikerfeed/restful-resource/workflows/Node CI/badge.svg" />

---

### Installation

```ts
npm i @hikerfeed/restful-resource --save
```

---

### Usage

A simple resource for enforcing REST conventions your HTTP requests. RESTful resource does _not_ make HTTP requests. Instead, it returns the proper routes that would match the controller name. For example, take this Laravel route which maps to a controller action:


```php
Route::get('/users', 'UsersController@index');
```

You can utilize RESTful resource like:

```ts
import { createRestfulResource } from '@hikerfeed/restful-resource';
import http from 'my-http';

const UserResource = createRestfulResource('users');

http.get(UserResource.index()); // => '/users'
```

Calling `UserResource.index()` will return the appropriate route for REST conventions, in this case for the `index` action. Each resource method accepts a `String`, `Number`, or `Array`. You may call any of the standard REST methods as such:

```ts
const UserResource = createRestfulResource('users');

http.get(UserResource.index()); // => '/users'
http.post(UserResource.create()); // => '/users/create'
http.post(UserResource.store()); // => '/users'
http.get(UserResource.show(3)); // => '/users/3'
http.get(UserResource.edit(4)); // => '/users/4/edit'
http.patch(UserResource.update(5)); // => '/users/5'
http.delete(UserResource.destroy('5')); // => '/users/5'
```

This works nicely with a framework like Laravel which allows you to define a controller as a resource:

```php
Route::resource('users', 'UsersController');
```

---

#### Nested Routes

In plenty of cases you may have nested routes such as `/users/2/photos`. In this case, you can simply add a `.` between names. If you want to pass an id to the parent and child resource you may pass an `Array` of numbers.

```ts
const UserPhotosResource = createRestfulResource('users.photos');

http.get(UserPhotosResource.index(2)); // => '/users/2/photos'
http.get(UserPhotosResource.update([2, 33])); // => '/users/2/photos/33'
```

---

#### Excluding Routes

Let's say you have a controller on your backend that excludes the actions such as `create`, `edit`. In Laravel, it may look like this:

```php
Route::resource('hikes', 'HikesController')->except(['create', 'edit']);
```

This would generate the following routes: 

- `GET   /hikes   HikesController@index`
- `POST  /hikes   HikesController@store`
- `GET   /hikes   HikesController@show`
- `POST  /hikes   HikesController@update`
- `POST  /hikes   HikesController@destroy`


To ensure you're not calling routes that don't exist on your API, you can pass the `exclude` option like so:

```ts
// typescript
import { createRestfulResource, RestfulResource } from '@hikerfeed/restful-resource';

const HikesResource = createRestfulResource('hikes', {
  except: [RestfulResource.Routes.Create, RestfulResource.Routes.Edit],
});

HikesResource.index(); // /hikes
HikesResource.create() // throws an Error
```

```js
// javascript
import { createRestfulResource } from '@hikerfeed/restful-resource';

const HikesResource = createRestfulResource('hikes', {
  except: ['create', 'edit'],
});

HikesResource.index(); // /hikes
HikesResource.create() // throws an Error
```

---

#### Only Including Certain Routes

On the contrary, you may want to _only_ include certain routes. In Laravel this may look like: 

```php
Route::resource('hikes', 'HikesController')->only(['index']);
```

You may pass an `only` option like so:

```ts
// typescript
import { createRestfulResource, RestfulResource } from '@hikerfeed/restful-resource';

const HikesResource = createRestfulResource('hikes', {
  only: [RestfulResource.Routes.Index],
});

HikesResource.index(); // /hikes
HikesResource.edit() // throws an Error
```

```js
// javascript
import { createRestfulResource } from '@hikerfeed/restful-resource';

const HikesResource = createRestfulResource('hikes', {
  only: ['index'],
});

HikesResource.index(); // /hikes
HikesResource.edit() // throws an Error
```
