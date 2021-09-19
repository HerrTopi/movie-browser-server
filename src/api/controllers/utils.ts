import axios from "axios"

export const getGenresById = async () => {
    const genresResponse = await axios.get(`https://api.themoviedb.org/3/genre/movie/list?api_key=${process.env.TMDB_API_KEY}`)
    return genresResponse.data.genres
}

type Genre = {
    id: number,
    name: string
}

type TMDBMovieList = {
    title: string,
    poster_path: string,
    overview: string,
    vote_average: number,
    genre_ids: Array<number>,
    id: number
}

export const formatMovieListResults = (results: Array<TMDBMovieList>, genresById: Array<Genre>) => results.map(({
    title,
    poster_path,
    overview,
    vote_average,
    genre_ids,
    id
}) => {
    const genres = genre_ids.map((genreId: number) => genresById.find((genre: Genre) => genre.id === genreId).name)
    return {
        title,
        poster_path,
        overview,
        vote_average,
        genres,
        id
    }
})