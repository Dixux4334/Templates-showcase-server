import { getConection } from '../database.js'
import { decodeBase64 } from '../utils/helper.util.js'

export const getPage = (req, res) => {
  const templateFound = getConection().data.templates.find(
    template => template.id === req.params.id
  )

  if (!templateFound) return res.sendStatus(404)

  const html = templateFound.languages.find(el => el.name === 'html')
  const scss = templateFound.languages.find(el => el.name === 'scss')
  const js = templateFound.languages.find(el => el.name === 'js')

  res.render('templatePage.hbs', {
    name: templateFound.id,
    html: decodeBase64(html.code),
    css: decodeBase64(scss.compiled),
    js: decodeBase64(js.code),
  })
  // res.json(templateFound)
}
