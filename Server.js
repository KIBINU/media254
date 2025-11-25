import express from "express";
import mysql from "mysql2";
import cors from "cors";

const app = express();
app.use(cors());
app.use(express.json());

const db = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
});

db.connect(err => {
  if (err) throw err;
  console.log("MySQL connected");
});

app.post("/api/quotes", (req, res) => {
  const { name, email, phone, service, message } = req.body;
  const sql = "INSERT INTO quotes (name, email, phone, service, message) VALUES (?, ?, ?, ?, ?)";
  db.query(sql, [name, email, phone, service, message], (err, result) => {
    if (err) return res.status(500).send(err);
    res.json({ message: "Quote submitted successfully!" });
  });
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

