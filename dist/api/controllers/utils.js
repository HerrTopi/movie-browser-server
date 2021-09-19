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
exports.formatMovieListResults = exports.getGenresById = void 0;
const axios_1 = __importDefault(require("axios"));
const getGenresById = () => __awaiter(void 0, void 0, void 0, function* () {
    const genresResponse = yield axios_1.default.get(`https://api.themoviedb.org/3/genre/movie/list?api_key=${process.env.TMDB_API_KEY}`);
    return genresResponse.data.genres;
});
exports.getGenresById = getGenresById;
const formatMovieListResults = (results, genresById) => results.map(({ title, poster_path, overview, vote_average, genre_ids, id }) => {
    const genres = genre_ids.map((genreId) => genresById.find((genre) => genre.id === genreId).name);
    return {
        title,
        poster_path,
        overview,
        vote_average,
        genres,
        id
    };
});
exports.formatMovieListResults = formatMovieListResults;
//# sourceMappingURL=utils.js.map