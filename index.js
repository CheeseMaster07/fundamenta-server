import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import cors from 'cors';
import { exec } from 'child_process'

import homeRoutes from './routes/home.js'
import stocksRoutes from './routes/stocks.js'
import userRoutes from './routes/user.js'
import pythonRoutes from './routes/python.js'

const app = express();

app.use(bodyParser.json({ limit: "30mb", extended: true }))
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }))
app.use(cors())

app.use('/', homeRoutes)
app.use('/stocks', stocksRoutes)
app.use('/user', userRoutes)
app.use('/python', pythonRoutes)

const CONNECTION_URL = 'mongodb+srv://gabbepabbe:1x3YYY8910@cluster0.dvzxzlr.mongodb.net/?retryWrites=true&w=majority'
const PORT = process.env.PORT || 5000

mongoose.connect(CONNECTION_URL, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => app.listen(PORT, () => console.log(`Server is running on port ${PORT}`)))
  .catch((error) => console.log('Error:', error.message))
