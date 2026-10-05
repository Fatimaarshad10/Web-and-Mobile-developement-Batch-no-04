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



app.use(express.json())

// Create Users Table
const createTable = `
  CREATE TABLE IF NOT EXISTS users (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(150) UNIQUE NOT NULL,
    age INT
  )
`

pool.query(createTable, (error) => {
  if (error) {
    console.log('Table creation failed', error)
  } else {
    console.log('Users table is ready')
  }
})

// Get Products
app.get('/products', (req, res) => {
  res.json('hello')
})


// Create User
app.post('/users', (req, res) => {
  const { name, email, age } = req.body

  const query = `
    INSERT INTO users (name, email, age)
    VALUES ($1, $2, $3)
    RETURNING *
  `

  pool.query(query, [name, email, age], (error, result) => {
    if (error) {
      return res.status(500).json({
        message: 'Failed to create user',
        error: error.message
      })
    }

    res.status(201).json({
      message: 'User created successfully',
      user: result.rows[0]
    })
  })
})


// Get Users
app.get('/users', (req, res) => {

  const query = `SELECT * FROM users`

  pool.query(query, (error, result) => {
    if (error) {
      return res.status(500).json({
        message: 'Failed to get users',
        error: error.message
      })
    }

    res.json({
      message: 'Users fetched successfully',
      users: result.rows
    })
  })
})


// Update User
app.patch('/user/:id', (req, res) => {
  const { name, email, age } = req.body
  const { id } = req.params

  const query = `
    UPDATE users
    SET name = $1, email = $2, age = $3
    WHERE id = $4
    RETURNING *
  `

  pool.query(query, [name, email, age, id], (error, result) => {
    if (error) {
      return res.status(500).json({
        message: 'Failed to update user',
        error: error.message
      })
    }

    if (result.rows.length === 0) {
      return res.status(404).json({
        message: 'User not found'
      })
    }

    res.json({
      message: 'User updated successfully',
      user: result.rows[0]
    })
  })
})


// Delete User
app.delete('/user/:id', (req, res) => {
  const { id } = req.params

  const query = `
    DELETE FROM users
    WHERE id = $1
    RETURNING *
  `

  pool.query(query, [id], (error, result) => {
    if (error) {
      return res.status(500).json({
        message: 'Failed to delete user',
        error: error.message
      })
    }

    if (result.rows.length === 0) {
      return res.status(404).json({
        message: 'User not found'
      })
    }

    res.json({
      message: 'User deleted successfully',
      user: result.rows[0]
    })
  })
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