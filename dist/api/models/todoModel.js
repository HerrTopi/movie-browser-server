'use strict';
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// Import mongoose
const mongoose_1 = __importDefault(require("mongoose"));
// Declare schema and assign Schema class
const Schema = mongoose_1.default.Schema;
// Create Schema Instance and add schema properties
const TodoSchema = new Schema({
    text: {
        type: String,
        required: true
    },
    status: {
        type: Boolean,
        required: true
    },
    createdOn: {
        type: Date,
        default: Date.now
    }
});
// create and export model
exports.default = mongoose_1.default.model("todoModel", TodoSchema);
//# sourceMappingURL=todoModel.js.map