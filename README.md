# OZXK.DEV Blog Back-End 💻

This is the back-end of the OZXK.DEV blog, which includes a custom CMS for managing blog posts. It was built using MongoDB, Express.js, Node.js, and TypeScript.

## Features 🌟

Some of the features included in the back-end are:

- Authentication: Users can create an account and login to access the CMS and manage blog posts.
- CRUD operations: The CMS allows for creating, reading, updating, and deleting blog posts.
- Shareable posts: Each blog post can be shared via a unique URL that can be easily copied and shared on social media or other platforms.
- Search functionality: Users can search for posts using keywords or phrases.
- Categories and tags: Posts can be organized into categories and tagged with keywords for easier browsing and searching.

## Technologies Used 💫

The back-end of the OZXK.DEV blog was built using the following technologies:

- **MongoDB**: A powerful NoSQL database that provides high performance and scalability.
- **Express.js**: A popular web application framework built on top of Node.js that provides a robust set of features for building web applications and APIs.
- **Node.js**: A powerful JavaScript runtime that allows for the development of high-performance, scalable, and cross-platform applications.
- **Multer**: A middleware used for handling file uploads in Node.js.
- **Cors**: A middleware used to enable CORS (Cross-Origin Resource Sharing) in Express.js.
- **Helmet**: A middleware used to enhance the security of Express.js applications.
- **Morgan**: A middleware used for logging HTTP requests in Express.js.

These technologies were carefully chosen to ensure performance, scalability, and security. MongoDB's flexible data model allows for the storage of complex data structures, making it easy to store and retrieve blog post data. Express.js provides a simple and intuitive interface for building web applications and APIs, while Node.js provides fast and efficient handling of HTTP requests and other tasks.

Multer was used to handle file uploads, while Cors was used to enable cross-origin resource sharing in the application. Helmet was used to enhance the security of the Express.js application, providing additional protection against common web application vulnerabilities. Finally, Morgan was used to log HTTP requests, making it easier to debug and troubleshoot issues with the application.

Overall, these technologies were chosen to provide a robust, reliable, and secure back-end for the OZXK.DEV blog.

<hr>

### Authentication 🔐

User authentication is handled using JSON Web Tokens (JWTs). When a user creates an account or logs in, a JWT is generated and sent to the client. The JWT is used to authenticate requests to the CMS API.

### API Endpoints ✈️

There 4 main API endpoints:

- `/auth` - for authentication

- `/posts`: For CMS operations - requires authentication
- `/media/imgs`: For media files - requires authentication
- `/general`: For general/public API requests - doesn't require authentication

#### Authentication 🔐

- `POST /auth/register`: Register a new user - disabled for now
- `POST /auth/login`: Login a user
- `GET /auth/validate-token`: Validate a user's token

#### CMS 📖

- `GET /posts/page/:id`: Get a page of posts
- `GET /posts/:id`: Get a single post
- `POST /posts`: Create a new post
- `PATCH /posts/:id`: Update an existing post
- `DELETE /posts/:id`: Delete a post
- `GET /posts/search/:searchTem/:pageIndex`: Search for posts using a search term and page index

#### Media 🖼️

- `POST /media/imgs/by-file`: Upload an image file

#### General 🏘️

- `GET /general/page/:category/:pageIndex`: Get a page of posts for a specific category
- `GET /general/post/:slug`: Get a single post
- `GET /general/search/:searchTem/:pageIndex`: Search for posts using a search term and page index
- `GET /general/categories`: Get all categories

<hr>

## How to Use 📝

To run this back-end locally, you will need to have Node.js and MongoDB installed on your machine.

1. Clone the GitHub repository to your local machine.
2. Navigate to the backend directory and run `npm install` to install the required dependencies.
3. Create a `.env` file in the backend directory and add the following environment variables:

`.env` requires three key: value pairs for **back-end**.

```.env
CONNECTION_URL:YOUR_MONGO_DB_CONNECTION_URL
JWT_SECRET:YOUR_JWT_SECRET_KEY
PORT:OPTIONAL
SERVER_URL=http://localhost:8000 - CHANGE THIS AFTER PUBLISH
IMAGE_MIDDLEWARE=CLOUDINARY - OR MULTER
CLOUDINARY_CLOUD_NAME=YOUR_CLOUDINARY_CLOUD_NAME
CLOUDINARY_API_KEY=YOUR_CLOUDINARY_API_KEY
CLOUDINARY_API_SECRET=YOUR_CLOUDINARY_API_SECRET
```

You don't need any additional things at the backend. It's regular node.js .env file. Also, you can use these keys with `process.env.PORT` code. <br>

## Running and Building 🎁

### Development 💻

`npm run dev` <br>

### Deployment 🖥️

`npm install  && npm run build` <br>

<hr>

## Contributions 👐

I'm waiting your contributions for any features 😊

### TO-DO 📝

- [ ] Write Tests
- [ ] Create API Endpoints Document for Backend: Postman?

## License 📜

This back-end is licensed under the MIT License. See the LICENSE file for more information.
