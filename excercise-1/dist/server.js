"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const cors_1 = __importDefault(require("cors"));
const dbConfig_1 = __importDefault(require("./config/dbConfig"));
// routes
const rockets_1 = __importDefault(require("./routes/rockets"));
dotenv_1.default.config();
// Connect to MongoDB
(0, dbConfig_1.default)();
const app = (0, express_1.default)();
const port = process.env.PORT || 5000;
// cors
app.use((0, cors_1.default)());
app.get('/', (req, res) => {
    res.send('Express - TypeScript Server');
});
// built-in middleware for json
app.use(express_1.default.json());
// routes
app.use('/rockets', rockets_1.default);
app.listen(port, () => {
    console.log(`[server]: Server is running at http://localhost:${port}`);
});
//# sourceMappingURL=server.js.map