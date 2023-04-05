import express, { NextFunction, Request, Response } from 'express'
import morgan from 'morgan'
import bodyParser from 'body-parser'


import { apiResponseError, apiResponseSuccess } from './response/response'
import { router as cusmtomerRouter } from './bank/custome.routes'

const app = express()
const PORT = 3000


/** use morgan */
app
    .use(morgan('dev'))
    .use(express.json())
    .use(bodyParser.json())
    .use(express.static('assets'))
    .use('/api/v1/customers/', cusmtomerRouter)





app.use((req: Request, resp: Response, next: NextFunction) => {
    const message = `Bad request, url : ${req.url} isnt available try this later!!!`
    resp.status(404).json(
        apiResponseError(message, false, undefined)
    )
})




app.listen(PORT, () => {
    console.log(`Application started in http://localhost:${PORT}`)
})