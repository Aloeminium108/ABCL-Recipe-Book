// DEPENDENCIES
import express, { Request, Response } from 'express'
import cors from 'cors'
import usersController from './controllers/user_data_controller'
import recipesController from './controllers/recipe_data_controller'
import reviewsController from './controllers/rating_reviews_controller'

const app = express()

// CONFIGURATION / MIDDLEWARE
require('dotenv').config()

// this corsOptions snippet was adapted from https://stackoverflow.com/questions/42710057/fetch-cannot-set-cookies-received-from-the-server
const corsOptions = {
    origin: process.env.ORIGIN,
    credentials:  true
}
  
app.use(cors(corsOptions))

app.use(express.json())
app.use(express.urlencoded({ extended: false }))

// ROOT
app.get('/', (req: Request, res: Response) => {
    res.status(200).json({
        message: 'Welcome to the Recipe API'
    })
})

// CONTROLLERS 
app.use('/users', usersController)
app.use('/recipes', recipesController)
app.use('/reviews', reviewsController)

// LISTEN
app.listen(process.env.PORT, () => {
    console.log(`Cooking on port: ${process.env.PORT}`)
})