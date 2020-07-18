import app from './app/app'
import loadEnv from './config/config.config'

loadEnv()
const port = parseInt(process.env.PORT || '3000', 10);

app.listen(port, (err: any) => {
  if(err) return console.error(err)
  return console.log(`server is listening on ${port} `)
})