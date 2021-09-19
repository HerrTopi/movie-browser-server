"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
const axios_1 = __importDefault(require("axios"));
dotenv_1.default.config();
const test = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const response = yield axios_1.default.get(`https://api.themoviedb.org/3/movie/550?api_key=${process.env.TMDB_API_KEY}`);
    console.log('Status Code:', response.data);
    //TODO, errorchecking
    const formattedRes = response.data.result.map(({ title, poster_path, overview, vote_average, genre_ids }) => ({ title, poster_path, overview, vote_average, genre_ids }));
    res.send(formattedRes);
});
const searchMovieById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.query;
    const response = yield axios_1.default.get(`https://api.themoviedb.org/3/movie/${id}?api_key=${process.env.TMDB_API_KEY}`);
    console.log(id, response);
    res.send({
        id: response.data.id,
        imdb_id: response.data.imdb_id,
        title: response.data.title,
        release_date: response.data.release_date,
        vote_average: response.data.vote_average,
    });
});
const formatMovieListResults = (results, genresById) => results.map(({ title, poster_path, overview, vote_average, genre_ids, id }) => {
    const genres = genre_ids.map(genreId => genresById.find(genre => genre.id === genreId).name);
    return {
        title,
        poster_path,
        overview,
        vote_average,
        genres,
        id
    };
});
const getGenresById = () => __awaiter(void 0, void 0, void 0, function* () {
    const genresResponse = yield axios_1.default.get(`https://api.themoviedb.org/3/genre/movie/list?api_key=${process.env.TMDB_API_KEY}`);
    return genresResponse.data.genres;
});
const searchSimilarById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.query;
    const genresById = yield getGenresById();
    const response = yield axios_1.default.get(`https://api.themoviedb.org/3/movie/${id}/similar?api_key=${process.env.TMDB_API_KEY}`);
    console.log(id, response);
    res.send(formatMovieListResults(response.data.results, genresById));
});
const searchForMovie = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { query } = req.query;
    //TODO: This should be optimised, so instead of getting this all the time, we'd get it only on server start and daily for example
    const genresById = yield getGenresById();
    console.log(genresById);
    const response = yield axios_1.default.get(`https://api.themoviedb.org/3/search/movie?query=${query}&api_key=${process.env.TMDB_API_KEY}`);
    res.send(formatMovieListResults(response.data.results, genresById));
});
exports.default = {
    test,
    searchForMovie,
    searchMovieById,
    searchSimilarById
};
//# sourceMappingURL=todoController.js.map