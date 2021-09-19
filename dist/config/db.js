"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// Export mongoose
const mongoose_1 = __importDefault(require("mongoose"));
//Assign MongoDB connection string to Uri and declare options settings
const uri = "mongodb+srv://HerrTopi:TartosBeke@cluster0.dekw3.mongodb.net/test?retryWrites=true&w=majority";
// Declare a variable named option and assign optional settings
const options = {
    useNewUrlParser: true,
    useUnifiedTopology: true
};
// Connect MongoDB Atlas using mongoose connect method
mongoose_1.default.connect(uri, options).then(() => {
    console.log("Database connection established!");
}, err => {
    {
        console.log("Error connecting Database instance due to:", err);
    }
});
//# sourceMappingURL=db.js.map