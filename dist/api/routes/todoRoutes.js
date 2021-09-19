"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const todoController_1 = __importDefault(require("../controllers/todoController"));
// create router function
const router = (app) => {
    // todoList Routes
    // get and post request for /todos endpoints
    app
        .route("/test")
        .get(todoController_1.default.test);
    app
        .route("/movies")
        .get(todoController_1.default.searchForMovie);
    app
        .route("/movie")
        .get(todoController_1.default.searchMovieById);
    app
        .route("/similar")
        .get(todoController_1.default.searchSimilarById);
};
exports.default = router;
//# sourceMappingURL=todoRoutes.js.map