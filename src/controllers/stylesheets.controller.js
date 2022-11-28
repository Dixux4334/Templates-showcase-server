import { v4 as uuid } from 'uuid'
import { getConection } from '../database.js'
import { writeDB, getCSS, decodeBase64 } from '../utils/helper.util.js'

export const getStylesheets = (req, res) => {
  const stylesheets = getConection().data.stylesheets

  res.json(stylesheets)
}

export const createStylesheet = async (req, res) => {
  const newStylesheet = {
    id: uuid(),
    code: req.body.code,
    name: req.body.name,
  }

  const db = getConection()

  db.data.stylesheets.push(newStylesheet)

  writeDB(db, res, newStylesheet)
}

export const updateStylesheet = async (req, res) => {
  const db = getConection()
  const styleSheetFound = db.data.stylesheets.find(
    styleSheet => styleSheet.id === req.params.id
  )
  if (!styleSheetFound) return res.sendStatus(404)

  styleSheetFound.code = req.body.code
  styleSheetFound.name = req.body.name

  db.data.stylesheets.map(styleSheet =>
    styleSheet.id === req.params.id ? styleSheetFound : styleSheet
  )

  writeDB(db, res, styleSheetFound)
}

export const deleteStylesheet = async (req, res) => {
  const db = getConection()

  const styleSheetFound = db.data.stylesheets.find(
    styleSheet => styleSheet.id === req.params.id
  )

  if (!styleSheetFound) return res.sendStatus(404)

  const stylesheetsUpdated = db.data.stylesheets.filter(
    styleSheet => styleSheet.id !== req.params.id
  )

  db.data.stylesheets = stylesheetsUpdated

  writeDB(db, res, db.data.stylesheets)
}
