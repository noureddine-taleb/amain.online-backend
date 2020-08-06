import express, { Request, Response, RequestHandler } from 'express'
import api from '../routes/api.routes'
import logger from 'morgan'
import path from 'path'

const app = express()
app.use(express.json());
app.use(logger('dev'));

app.use('/', express.static(path.join(__dirname, '../../public')));
app.use('/api', api)

app.use(function (err: any, req: Request, res: Response, next: RequestHandler) {
    const { message, stack } = err
    const error = process.env.NODE_ENV === 'dev' ? { message, stack } : { message }
    return res.status(err.status || 500).json(error)
})

export default app