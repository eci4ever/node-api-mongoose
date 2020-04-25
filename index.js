const express = require('express')
const app = express()
const dotenv = require('dotenv')
const morgan = require('morgan')
const mongoose = require('mongoose')

dotenv.config()

//Connect database using .env
mongoose.connect(process.env.DB_CONNECT, { useNewUrlParser: true, useUnifiedTopology: true },
    () => console.log('database connected'))

//Middleware
app.use(express.json())
app.use(morgan('dev')) //logging middleware

//Import route
const authRoute = require('./router/auth')
const postRoute = require('./router/post')
const productRoute = require('./router/products')
const orderRoute = require('./router/orders')

//Route Middleware
app.use('/api/user', authRoute)
app.use('/api/post', postRoute)
app.use('/api/products', productRoute)
app.use('/api/orders', orderRoute)

app.listen(3000, () => console.log('Server up and running'))