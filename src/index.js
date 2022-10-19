import app from './app.js'
import { createConection } from './database.js'

createConection()

const listener = app.listen(process.env.PORT || 8000, () =>
  console.log('Server is running on port ' + listener.address().port)
)
