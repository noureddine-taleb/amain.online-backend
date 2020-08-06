import app from './app/app'
import bsDB from './config/db.config'
import bsENV from './config/env.config'
bsENV() // bootstrap env vars first
bsDB() // bootstrap db connection

const port = parseInt(process.env.PORT || '3000', 10);

app.listen(port, (err: any) => {
  if(err) return console.error(err)
  return console.log(`server : http://localhost:${port} `)
})