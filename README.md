How to get started:

Clone the repository using git clone.

Frontend:

2.1. Navigate to the client folder and run npm install or yarn in the terminal.

2.2. Create a .env file in the core folder. Inside .env, set VITE_API_URL='your_api_url_here', where 'your_api_url_here' is the path to your API.

2.3. Run yarn dev or npm run dev in the terminal.

Backend:

3.1. Navigate to the server folder and run npm install or yarn in the terminal.

3.2. Create a .env file in the core folder. Inside .env, set the following variables:
- PORT=4444: Specify the port for the server.
- DATABASE_URL='mongodb+srv:///': Provide the path to the MongoDB database.
- PASSWORD='': Set your password for the database.
- JWT_KEY='': Define your JWT key.
- PARSE_URL='': Set your public rss link

3.3. Run yarn dev or npm run dev in the terminal.

Swagger:

To check APIs, start the server and navigate to `"http://localhost:${your port}/api-docs" + "/api-docs"`.

