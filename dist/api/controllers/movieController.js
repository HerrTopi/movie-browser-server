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
const utils_1 = require("./utils");
dotenv_1.default.config();
//TODO: make a middleware to monitor too frequent requests from the same client and decline them if necessary
const searchMovieById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.query;
    const response = yield axios_1.default.get(`https://api.themoviedb.org/3/movie/${id}?api_key=${process.env.TMDB_API_KEY}`);
    //TODO: Error handling if the request fails or the response not present
    res.send({
        id: response.data.id,
        imdb_id: response.data.imdb_id,
        title: response.data.title,
        release_date: response.data.release_date,
        vote_average: response.data.vote_average,
    });
});
const searchSimilarById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.query;
    //TODO: This should be optimised, so instead of getting this all the time, we'd get it only on server start and daily for example
    const genresById = yield utils_1.getGenresById();
    const response = yield axios_1.default.get(`https://api.themoviedb.org/3/movie/${id}/similar?api_key=${process.env.TMDB_API_KEY}`);
    //TODO: Error handling if the request fails or the response not present
    res.send(utils_1.formatMovieListResults(response.data.results, genresById));
});
const searchForMovie = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { query } = req.query;
    //TODO: This should be optimised, so instead of getting this all the time, we'd get it only on server start and daily for example
    const genresById = yield utils_1.getGenresById();
    const response = yield axios_1.default.get(`https://api.themoviedb.org/3/search/movie?query=${query}&api_key=${process.env.TMDB_API_KEY}`);
    //TODO: Error handling if the request fails or the response not present
    res.send(utils_1.formatMovieListResults(response.data.results, genresById));
});
exports.default = {
    searchForMovie,
    searchMovieById,
    searchSimilarById
};
//# sourceMappingURL=movieController.js.map