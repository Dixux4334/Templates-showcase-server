import { v4 as uuid } from 'uuid'
import { getConection } from '../database.js'
import {
  decodeBase64,
  encodeBase64,
  compileSCSS,
  writeDB,
  getCSS,
} from '../utils/helper.util.js'

export const getTemplates = (req, res) => {
  const templates = getConection().data.templates

  res.json(templates)
}

export const createTemplate = async (req, res) => {
  const scss = decodeBase64(req.body.scss)

  let css = await getCSS(scss)
  if (!css.successfullyCompiled) {
    res.status(400).send({ message: css.error })
    return
  }

  const newTemplate = {
    id: uuid(),
    languages: [
      {
        name: 'html',
        code: req.body.html,
      },
      {
        name: 'scss',
        code: req.body.scss,
        compiled: css.code,
      },
      {
        name: 'js',
        code: req.body.js,
      },
    ],
    tags: req.body.tags,
  }

  const db = getConection()

  db.data.templates.push(newTemplate)

  writeDB(db, res, newTemplate)
}

export const updateTemplate = async (req, res) => {
  const db = getConection()
  const templateFound = db.data.templates.find(
    template => template.id === req.params.id
  )
  if (!templateFound) return res.sendStatus(404)

  const scss = decodeBase64(req.body.scss)

  let css = await getCSS(scss)
  if (!css.successfullyCompiled) {
    res.status(400).send({ message: css.error })
    return
  }

  const languages = [
    {
      name: 'html',
      code: req.body.html,
    },
    {
      name: 'scss',
      code: req.body.scss,
      compiled: css.code,
    },
    {
      name: 'js',
      code: req.body.js,
    },
  ]

  templateFound.languages = languages

  templateFound.tags = req.body.tags

  db.data.templates.map(template =>
    template.id === req.params.id ? templateFound : template
  )

  writeDB(db, res, templateFound)
}

export const deleteTemplate = async (req, res) => {
  const db = getConection()
  const templateFound = db.data.templates.find(
    template => template.id === req.params.id
  )

  if (!templateFound) return res.sendStatus(404)

  const templatesUpdated = db.data.templates.filter(
    template => template.id !== req.params.id
  )

  db.data.templates = templatesUpdated

  writeDB(db, res, db.data.templates)
}
