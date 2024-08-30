# News_Web_Blog

A News Web Blog focussed on user anonymity and security

### Setting up local DB:

- Install and initialize Postgres on your machine.
  - Remember the Postgres password you initially set
- Use pgadmin 4 to create a new Database on your machine
  - Name the Database "news_blog"
- Navigate to the following file: "app\server\database\initalizeDB.js"
  - Change the field with the value "YOUR_PASSWORD_HERE" to your previously set Postgres password

### Starting the app:

- Run the following commands in the project terminal

```
cd app
```
```
npm install
```
```
npm run dev
```

- Navigate to localhost:5000 in your web browser (we recommend you use Firefox)
