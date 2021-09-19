"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const movieRoutes_1 = __importDefault(require("./api/routes/movieRoutes"));
const app = express_1.default();
const allowedOrigins = ['https://movie-browser-client.herokuapp.com', 'http://localhost:3000'];
app.use(cors_1.default({
    origin(origin, callback) {
        if (!origin)
            return callback(null, true);
        if (allowedOrigins.indexOf(origin) === -1) {
            const msg = 'The CORS policy for this site does not ' +
                'allow access from the specified Origin.';
            return callback(new Error(msg), false);
        }
        return callback(null, true);
    },
    credentials: true
}));
const port = process.env.PORT || 3001;
app.use(express_1.default.urlencoded({ extended: true }));
app.use(express_1.default.json());
movieRoutes_1.default(app);
app.listen(port, () => {
    return console.log(`server is listening on http://localhost:${port}`);
});
//# sourceMappingURL=app.js.map