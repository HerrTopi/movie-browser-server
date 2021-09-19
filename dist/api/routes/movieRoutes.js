"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const movieController_1 = __importDefault(require("../controllers/movieController"));
// TODO if necessary, add namespace to every router
const router = (app) => {
    app
        .route("/movies")
        .get(movieController_1.default.searchForMovie);
    app
        .route("/movie")
        .get(movieController_1.default.searchMovieById);
    app
        .route("/similar")
        .get(movieController_1.default.searchSimilarById);
};
exports.default = router;
//# sourceMappingURL=movieRoutes.js.map