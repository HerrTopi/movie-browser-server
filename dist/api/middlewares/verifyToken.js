"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
dotenv_1.default.config();
const getBearerToken = (req) => {
    var _a, _b;
    return ((_a = req === null || req === void 0 ? void 0 : req.headers) === null || _a === void 0 ? void 0 : _a.authorization) === undefined ?
        undefined :
        (_b = req === null || req === void 0 ? void 0 : req.headers) === null || _b === void 0 ? void 0 : _b.authorization.split(' ')[1];
};
// Verify Token
const verifyToken = (req, res, next) => {
    jsonwebtoken_1.default.verify(getBearerToken(req), process.env.TEST_SECRET_TOKEN, (err, authData) => {
        if (err) {
            res.status(403).json(err);
        }
        else {
            req.authData = authData;
            next();
        }
    });
};
exports.default = verifyToken;
//# sourceMappingURL=verifyToken.js.map