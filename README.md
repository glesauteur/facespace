# FaceSpace
This Facespace app is very simplified version of a social network application. You can sign in, add friends and scroll their profile. 
The use of the localstorage is there to make sure the person stays signed in.
The API has been built following the REST principles.

## Screenshots

<img width="1438" alt="Screen Shot 2022-05-12 at 3 14 18 PM" src="https://user-images.githubusercontent.com/11652333/168168428-f93114d8-9910-4d73-8fef-b5e4f5e3fcaa.png">
<img width="1440" alt="Screen Shot 2022-05-12 at 3 14 30 PM" src="https://user-images.githubusercontent.com/11652333/168168429-9caa8db0-1919-4a55-868e-303a09955549.png">
<img width="1439" alt="Screen Shot 2022-05-12 at 3 14 50 PM" src="https://user-images.githubusercontent.com/11652333/168168432-513617d1-eeb2-4a8f-a738-c0695c223ce1.png">

## Demo

https://user-images.githubusercontent.com/11652333/168168408-d8e3e76f-2c1c-4e52-baca-17135ae65c0d.mp4

## Local Development

To run the frontend: 
- `cd frontend`
- `yarn install`
- `yarn dev:frontend`

To run the backend (server): 
- `cd backend`
- `yarn install`
- `yarn dev:backend`

## Limitations

  - This project does not use a proper persistence mechanism and is all in-memory.
  - Auth was not implemented. Sessions are all local storage.
