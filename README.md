# INHALT - CMS 💻
## DEMO 🌍 ![Netlify](https://img.shields.io/netlify/7359500f-a137-4bc3-99e9-d94f3fd0d0b9?logo=netlify) ![Render](https://img.shields.io/badge/Render-passing-brightgreen?logo=render)
 Backend: https://inhalt-cms-backend.onrender.com
 <br>
 Frontend: https://inhalt-cms.netlify.app/
 <br>
 Registering user to cms disabled by me. But you can use this credentials for testing platform! <br>
 <strong>username: </strong> admin
 <br>
 <strong>password: </strong> admin
 #
## Description 📚
 Creating a content management system (CMS) is an ambitious task, but one that can be immensely rewarding.
 My own CMS project uses React, Typescript, Redux, Node.js., MongoDB and Express to create a powerful platform for managing websites and blogs. 
 The first step in creating my CMS was to decide which technologies I would use in the development process. 
 React was chosen because of its ability to easily render components on both the client-side and server-side of web applications; 
 Typescript for type safety when writing JavaScript code; Redux as an efficient state container; 
 Node.js as a runtime environment with extensive libraries available; 
 MongoDB for storing data quickly without needing any additional setup or configuration steps like setting up tables or columns manually; 
 And finally Express as our web framework with support from other middleware packages such 
 as Multer used for image storing at the server..  
 
  I have documented this project thoroughly by including detailed instructions in the README file hosted on Github repo so anyone who 
  wishes to understand how it works can do so easily by following these instructions step-by-step if they wish to replicate this work 
  themselves or simply want more information about what went into building it from scratch! Additionally I plan on using this same 
  technology stack when developing my blog page https://ozxk.dev (still in development) - allowing me full control over how everything looks & 
  functions while also 
  giving me access all sorts of analytics tools & features that come along with having your own custom built website/blogging platform! 

## Installation 💡 
 For frontend: `cd inhalt-cms && npm install` <br>
 For backend:  `cd inhalt-cms-server && npm install` <br>
 Before you run the code you should create `.env` for both projects.
 ### For Frontend Envoirment (inhalt-cms):
  `.env` requires only one key: value pair for **front-end**.
  ```.env
  VITE_API: 'YOUR_BACKEND_ENDPOINT_URL'
  ```
  Your keys should start with `VITE_` and your values should be in between of two quotes `''`.
  For using these keys in your code you should call `import.meta.env.YOUR_KEY`. It works as inline too. For example:
  ```typescript
  const result = await fetch(
    import.meta.env.VITE_API + "/auth/validate-token",
    {
      method: "GET",
      headers: {
        Authorization: `Bearer ${user?.accessToken!}`,
      },
    }
  )
  ```
  ### For Backend Envoirment (inhalt-cms-server):
  `.env` requires three key: value pairs for **back-end**.
  ```.env
  CONNECTION_URL:YOUR_MONGO_DB_CONNECTION_URL
  JWT_SECRET:YOUR_JWT_SECRET_KEY
  SERVER_URL:YOUR_BACKEND_ENDPOINT_URL
  ```
  You don't need any additional things at the backend. It's regular node.js .env file. So, you can use these keys with `process.env.PORT` code. <br>
  **⚠️ WARNING:** <br> 
  Don't delete `inhalt-cms-server/public/uploads/init.txt` file. When you're publishing your backend, you will need it 🤣

## Running and Building 🎁
 ### Development 💻
  For frontend: `cd inhalt-cms && npm run dev` <br>
  For backend:  `cd inhalt-cms-server && npm run dev` <br>
 ### Deployment 🖥️
  For frontend: `cd inhalt-cms && npm install && npm run build` <br>
  For backend:  `cd inhalt-cms-server && npm install  && npm run build` <br>
  
## Docs 📝
 If you need documentation about project just switch the `docs` branch with `git switch jsDoc` <br>
 Or you can just mail me 📬
 
## Frontend Development 🌞 
 ![Vite](https://img.shields.io/badge/vite-vite?style=for-the-badge&logo=vite&logoColor=white&color=purple) 
 ![React](https://img.shields.io/badge/react-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB) 
 ![Redux](https://img.shields.io/badge/redux-%23593d88.svg?style=for-the-badge&logo=redux&logoColor=white)
 ![TailwindCSS](https://img.shields.io/badge/tailwindcss-tailwindcss?style=for-the-badge&logo=tailwindcss&logoColor=white&color=blue) 
 ![TypeScript](https://img.shields.io/badge/typescript-%23007ACC.svg?style=for-the-badge&logo=typescript&logoColor=white) 
 ![HTML5](https://img.shields.io/badge/html5-%23E34F26.svg?style=for-the-badge&logo=html5&logoColor=white) 
 ![CSS3](https://img.shields.io/badge/css3-%231572B6.svg?style=for-the-badge&logo=css3&logoColor=white) 
 ![JavaScript](https://img.shields.io/badge/javascript-%23323330.svg?style=for-the-badge&logo=javascript&logoColor=%23F7DF1E) 
  
## Backend Development 🌚 
 ![NodeJS](https://img.shields.io/badge/node.js-6DA55F?style=for-the-badge&logo=node.js&logoColor=white) 
 ![Express](https://img.shields.io/badge/express-express?style=for-the-badge&logo=express&logoColor=white&color=black) 
 ![MongoDB](https://img.shields.io/badge/mongodb-mongodb?style=for-the-badge&logo=mongodb&logoColor=white&color=darkgreen)
 
## Contributions 👐
 I'm waiting your contributions for any features 😊
