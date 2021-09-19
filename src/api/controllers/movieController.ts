import { Request, Response } from 'express';
import dotenv from "dotenv"
import axios from "axios"
import { getGenresById, formatMovieListResults } from "./utils"

dotenv.config()

//TODO: make a middleware to monitor too frequent requests from the same client and decline them if necessary
const searchMovieById = async (req: Request, res: Response) => {
    const { id } = req.query
    const response = await axios.get(`https://api.themoviedb.org/3/movie/${id}?api_key=${process.env.TMDB_API_KEY}`)

    //TODO: Error handling if the request fails or the response not present
    res.send({
        id: response.data.id,
        imdb_id: response.data.imdb_id,
        title: response.data.title,
        release_date: response.data.release_date,
        vote_average: response.data.vote_average,
    })
}

const searchSimilarById = async (req: Request, res: Response) => {
    const { id } = req.query
    //TODO: This should be optimised, so instead of getting this all the time, we'd get it only on server start and daily for example
    const genresById = await getGenresById()
    const response = await axios.get(`https://api.themoviedb.org/3/movie/${id}/similar?api_key=${process.env.TMDB_API_KEY}`)

    //TODO: Error handling if the request fails or the response not present
    res.send(formatMovieListResults(response.data.results, genresById))
}

const searchForMovie = async (req: Request, res: Response) => {
    const { query } = req.query
    //TODO: This should be optimised, so instead of getting this all the time, we'd get it only on server start and daily for example
    const genresById = await getGenresById()

    const response = await axios.get(`https://api.themoviedb.org/3/search/movie?query=${query}&api_key=${process.env.TMDB_API_KEY}`)

    //TODO: Error handling if the request fails or the response not present
    res.send(formatMovieListResults(response.data.results, genresById))
}

export default {
    searchForMovie,
    searchMovieById,
    searchSimilarById
}