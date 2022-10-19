import { Router } from "express"
import { getPage } from "../controllers/pages.controller.js"

const pagesRouter = Router()

pagesRouter.get("/:id", getPage)

export default pagesRouter