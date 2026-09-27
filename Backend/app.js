// const express = require("express");
import express from 'express'
import pool from './db.js';

const app = express();

// app.get()
// get , update , delete , add (CRUD)

app.get('/products', (req, res) => {
  res.json("hello")
})


pool.query("SELECT NOW()", (error, result) => {
  if (error) {
    console.log("Database Failed", error)
  }
  else {
    console.log("Database is connected", result.rows)
  }
})



app.listen(5000, () => {
  console.log('Server running on port 5000');
});


// Supabase + database
// postgresql + mysql
// How to create tables with queries (migration file)
// Edge functions

// test cases

// http://localhost:5000/