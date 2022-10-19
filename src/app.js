import express from 'express'
import apiRouter from './routes/apiRouter.js'
import { join, dirname } from 'path'
import { fileURLToPath } from 'url'
import cors from 'cors'
import morgan from 'morgan'
import pagesRouter from './routes/pagesRouter.js'

const __dirname = dirname(fileURLToPath(import.meta.url))
const app = express()

app.set('view engine', 'hbs')
app.set('views', join(__dirname, 'views'))
// app.use(morgan('combined'))
app.use(cors())
app.use(express.json())

app.use('/api', apiRouter)
app.use('/pages', pagesRouter)

export default app
