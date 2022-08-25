# Facebook Clone

This is a frontend part of a Facebook Clone which I made as a [final project](https://www.theodinproject.com/lessons/nodejs-odin-book) submission for [The Odin Project](https://www.theodinproject.com/).

[API repository](https://github.com/michalosman/facebook-clone-api)

[Live Demo](todo) :point_left:

## Features

### Users

- [x] Register / Log in / Log out
- [x] Search user
- [x] Display profile
- [x] Edit own profile

### Friendships

- [x] Request friend
- [x] Accept friend
- [x] Reject friend
- [x] Remove friend

### Posts

- [x] Create post
- [x] Display own feed
- [x] Like/unlike post
- [x] Comment post

### TODO

- [ ] Log in with Facebook
- [ ] Integration tests (react-testing-library)
- [ ] E2E tests (Cypress)
- [ ] PWA

## Technologies used

- [TypeScript](https://www.typescriptlang.org/)
- [React](https://pl.reactjs.org/)
- [Chakra UI](https://chakra-ui.com/)
- [react-query](https://tanstack.com/query/v4)
- [Formik](https://formik.org/)
- [Yup](https://github.com/jquense/yup)

## Getting started

### Clone repository

```
git clone https://github.com/michalosman/facebook-clone.git
cd facebook-clone
```

### Set up environment variables

```
VITE_SERVER_URL=<Address of the server, e.g. http://localhost:5000/>
VITE_CLOUDINARY_URL=<Cloudinary API base URL, e.g. https://api.cloudinary.com/v1_1/{cloud_name}/image/upload>
VITE_CLOUDINARY_UPLOAD_PRESET=<Cloudinary upload preset>
```

### Install packages and start client

```
npm i
npm run build
npm run preview
```
