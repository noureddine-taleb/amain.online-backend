import express, { Request, Response, RequestHandler } from 'express'
import api from '../routes/api.routes'
import morgan from 'morgan'
import path from 'path'
import { ApolloServer } from 'apollo-server-express';
import { resolvers } from '../graphql/resolvers';
import { typeDefs } from '../graphql/typedefs';
import { userAuth } from '../middlewares/user.middleware';

const app = express()
morgan.token('body', (req, _) => JSON.stringify((req as any).body))
const graphql = new ApolloServer({ typeDefs, resolvers })
app.use(express.json())
app.use(morgan('dev'))
app.use(morgan('(:body) \n'))
app.set('views', path.join(__dirname, '../../views'));
app.set("view engine","jade")
app.use('/', express.static(path.join(__dirname, '../../public')))
app.use('/api', api)
app.use(/*userAuth,*/ graphql.getMiddleware()) 


app.use(function (err: any, req: Request, res: Response, next: RequestHandler) {
    const { message, stack } = err
    const error = process.env.NODE_ENV === 'dev' ? { message, stack } : { message }
    return res.status(err.status || 500).json(error)
})

export default app