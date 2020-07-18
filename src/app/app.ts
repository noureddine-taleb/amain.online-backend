import express, { Request, Response, RequestHandler } from 'express'
import api from '../routes/api.routes'
import logger from 'morgan'

const app = express()

app.use(logger('dev'));

app.use('/', api)

// error handler
app.use((err: any, req: Request, res: Response, next: RequestHandler) => {
    const { message, stack } = err
    const error = process.env.NODE_ENV === 'dev' ? { message, stack } : { message }
    return res.status(err.status || 500).json(error)
})

export default app