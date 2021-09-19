import express from 'express'
import cors from 'cors'

import routes from './api/routes/movieRoutes'

const app = express()

const allowedOrigins = ['https://movie-browser-client.herokuapp.com', 'http://localhost:3000'];

app.use(cors({
    origin(origin, callback) {
        if (!origin) return callback(null, true);
        if (allowedOrigins.indexOf(origin) === -1) {
            const msg = 'The CORS policy for this site does not ' +
                'allow access from the specified Origin.';
            return callback(new Error(msg), false);
        }
        return callback(null, true);
    },
    credentials: true
}));

const port = process.env.PORT || 3001

app.use(express.urlencoded({ extended: true }))
app.use(express.json())

routes(app)

app.listen(port, () => {
    return console.log(`server is listening on http://localhost:${port}`)
})