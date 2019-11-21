<p align="center"><img width="300" src="https://hikerfeed.com/_nuxt/img/f3d1507.svg"></p>

---

# RESTful Resource

<img src="https://github.com/hikerfeed/restful-resource/workflows/Node CI/badge.svg" />

---

A simple resource for enforcing REST conventions your HTTP requests. 


### Installation

```ts
npm i @hikerfeed/restful-resource --save
```

### Usage

```ts
import { createRestfulResource } from '@hikerfeed/restful-resource';
import http from 'my-http';

const UserResource = createRestfulResource('users');

http.get(UserResource.index()); // => '/users'
http.post(UserResource.create()); // => '/users/create'
http.post(UserResource.store()); // => '/users'
http.get(UserResource.show(3)); // => '/users/3'
http.get(UserResource.edit(4)); // => '/users/4/edit'
http.patch(UserResource.update(5)); // => '/users/5'
http.delete(UserResource.destroy('5')); // => '/users/5'
```
