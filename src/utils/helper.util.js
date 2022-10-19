import * as sass from 'node-sass'

export const encodeBase64 = string =>
  Buffer.from(string, 'utf8').toString('base64')
export const decodeBase64 = string =>
  Buffer.from(string, 'base64').toString('utf8')

export const compileSCSS = scss => {
  return new Promise((resolve, reject) => {
    sass.render(
      {
        data: scss,
      },
      (error, result) => {
        if (error) return reject(error)

        return resolve(result.css.toString())
      }
    )
  })
}
export const getCSS = async scss => {
  const data = {
    successfullyCompiled: false,
    code: '',
    error: '',
  }
  try {
    data.code = encodeBase64(await compileSCSS(scss))
    data.successfullyCompiled = true
  } catch (error) {
    data.successfullyCompiled = false
    data.error = error.message
  }

  return data
}
export const writeDB = async (db, res, data) => {
  await db
    .write()
    .then(() => res.json(data))
    .catch(() => {
      res.status(500).send('DB error')
    })
}
