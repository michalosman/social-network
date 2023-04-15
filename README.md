# Social Network

Frontend part of a social network app which I made as a [final project](https://www.theodinproject.com/lessons/nodejs-odin-book) submission for [The Odin Project](https://www.theodinproject.com/).

[Live Demo](https://michalosman-social-network.onrender.com/) :point_left:

[API repository](https://github.com/michalosman/social-network-api)

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
git clone https://github.com/michalosman/social-network.git
cd social-network
```

### Set up environment variables

```
VITE_SERVER_URL=<Address of the server, e.g. http://localhost:5000/>
VITE_CLOUDINARY_URL=<Cloudinary API base URL, e.g. https://api.cloudinary.com/v1_1/{cloud_name}/image/upload>
VITE_CLOUDINARY_UPLOAD_PRESET=<Cloudinary upload preset>
VITE_TEST_USER_ID=<Test user ID (optional)>
```

### Install packages and start client

```
npm i
npm run build
npm run preview
```
