import { Application } from 'express'
import todoList from '../controllers/movieController'

// TODO if necessary, add namespace to every router
const router = (app: Application) => {
    app
        .route("/movies")
        .get(todoList.searchForMovie)
    app
        .route("/movie")
        .get(todoList.searchMovieById)
    app
        .route("/similar")
        .get(todoList.searchSimilarById)
}
export default router