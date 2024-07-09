const express = require("express");
const bodyParser = require("body-parser");
const { Pool } = require("pg");
const cors = require("cors");

const app = express();
const port = 3000;

app.use(cors());
app.use(bodyParser.json());

/**
 * @description: Credentials required for DB connections.
 */
const pool = new Pool({
  host: "localhost",
  user: "postgres",
  password: "arjun",
  database: "TestDB",
  port: 5432,
});

/**
 * @description: Listens to POST api calls and inserts the received data into DB
 * @param name: String
 * @param dob: Date
 * @param address: String
 */
app.post("/users", async (req, res) => {
  const { name, dob, address } = req.body;

  if (!name || !dob || !address) {
    return res.status(400).json({ message: " All fields are required" });
  }

  try {
    const query = "INSERT INTO users (name,dob,address) VALUES ($1,$2,$3)";
    await pool.query(query, [name, dob, address]);
    res.status(200).json({ message: "User Added successfully" });
  } catch (err) {
    console.error("Error inserting data into DB", err);
    return res
      .status(500)
      .json({ message: "An Error occurred while saving the user" });
  }
});

/**
 * @description: Creates the Listener
 */
app.listen(port, () => {
  console.log(" Server is running on port ${port}");
});
