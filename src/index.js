const express = require("express");
const cors = require("cors");
const mysql = require("mysql2/promise");
const fetch = require("node-fetch");

const { port, dbconfig } = require("./config");

const app = express();

app.use(express.json());
app.use(cors());

app.get("/", async (req, res) => {
  try {
    const randomUsers = await fetch(
      "https://jsonplaceholder.typicode.com/users"
    );
    const randomUsersResponse = await randomUsers.json();
    const dataName = randomUsersResponse[5].name;
    const dataEmail = randomUsersResponse[5].email;
    const dataAddress = randomUsersResponse[5].address.city;

    const con = await mysql.createConnection(dbconfig);
    await con.execute(
      `INSERT INTO users (name, email, address) values (${mysql.escape(
        dataName
      )}, ${mysql.escape(dataEmail)}, ${mysql.escape(dataAddress)})`
    );
    const [response] = await con.execute("SELECT * FROM users;");
    await con.end();
    res.send(response);
  } catch (e) {
    console.log(e);
    res.status(400).send({ error: "Error" });
  }
});

//2a

app.post("/users", async (req, res) => {
  try {
    const con = await mysql.createConnection(dbconfig);
    const user = req.body;
    const response = await con.execute(
      `INSERT INTO users (name, email, address) values (${con.escape(
        user.name
      )}, ${con.escape(user.email)}, ${con.escape(user.address)});`
    );
    res.send(response[0]);
    await con.end();
  } catch (e) {
    console.log(e);
  }
});

//2b

app.get("/users", async (req, res) => {
  try {
    const con = await mysql.createConnection(dbconfig);
    const user = req.body;
    const response = await con.execute("SELECT * FROM users");
    res.send(response);
    await con.end();
  } catch (e) {
    console.log(e);
  }
});

//2c

app.get("/users/names", async (req, res) => {
  try {
    const con = await mysql.createConnection(dbconfig);
    const response = await con.execute(`SELECT id,name FROM users`);
    res.send(response[0]);
    await con.end();
  } catch (e) {
    console.error(e);
  }
});

//2d

app.get("/users/emails", async (req, res) => {
  try {
    const con = await mysql.createConnection(dbconfig);
    const response = await con.execute(`SELECT id,name,email FROM users`);
    res.send(response[0]);
    await con.end();
  } catch (e) {
    console.error(e);
  }
});

//2e

app.get("/users/address", async (req, res) => {
  try {
    const con = await mysql.createConnection(dbconfig);
    const response = await con.execute(`SELECT id,name,address FROM users`);
    res.send(response[0]);
    await con.end();
  } catch (e) {
    console.error(e);
  }
});

app.all("*", (req, res) => {
  res.status(404).send({ error: "Page not found" });
});

app.listen(port, () => console.log(`Listening on port ${port}`));
