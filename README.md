# DSS_News_Web_Blog

A News Web Blog focussed on user anonymity and security

### Setting up local DB

- Install and initialize postgres on you machine.
  - Remember the postgres password you intially set
- Use pgadmin 4 to create a new db on your machine
  - Name the db "news_blog"
- Navigate to the following file: "app\server\database\initalizeDB.js"
  - Change the field with the value "YOUR_PASSWORD_HERE" to your previously set postgres password

### Starting the app:

- Run the following commands in the terminal for the project

```
cd app
npm install
npm run dev
```

- Navigate to localhost:5000 in your web browser (we reccomend you use firefox)
