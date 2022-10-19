import { Router } from 'express'
import {
  createTemplate,
  deleteTemplate,
  getTemplates,
  updateTemplate,
} from '../controllers/templates.controller.js'

const apiRouter = Router()

apiRouter.get('/templates', getTemplates)
apiRouter.post('/templates/', createTemplate)
apiRouter.put('/templates/:id', updateTemplate)
apiRouter.delete('/templates/:id', deleteTemplate)

export default apiRouter
