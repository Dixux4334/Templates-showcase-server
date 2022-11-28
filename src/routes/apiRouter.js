import { Router } from 'express'
import {
  createTemplate,
  deleteTemplate,
  getTemplates,
  updateTemplate,
} from '../controllers/templates.controller.js'
import {
  createStylesheet,
  deleteStylesheet,
  getStylesheets,
  updateStylesheet,
} from '../controllers/stylesheets.controller.js'

const apiRouter = Router()

apiRouter.get('/templates', getTemplates)
apiRouter.post('/templates', createTemplate)
apiRouter.put('/templates/:id', updateTemplate)
apiRouter.delete('/templates/:id', deleteTemplate)

apiRouter.get('/stylesheets', getStylesheets)
apiRouter.post('/stylesheets', createStylesheet)
apiRouter.put('/stylesheets/:id', updateStylesheet)
apiRouter.delete('/stylesheets/:id', deleteStylesheet)

export default apiRouter
