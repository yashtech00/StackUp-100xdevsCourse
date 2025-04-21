"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const cors_1 = __importDefault(require("cors"));
const db_1 = __importDefault(require("./db/db"));
const userRouter_1 = __importDefault(require("./router/userRouter"));
const adminRouter_1 = __importDefault(require("./router/adminRouter"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const app = (0, express_1.default)();
const corsOptions = {
    origin: ['https://tweetify-tau.vercel.app', 'http://localhost:3000'],
    credentials: true,
};
app.use((0, cors_1.default)(corsOptions));
(0, db_1.default)();
app.use(express_1.default.json({ limit: "5mb" }));
app.use(express_1.default.urlencoded({ extended: true }));
app.use((0, cookie_parser_1.default)());
const PORT = process.env.PORT || 8001;
app.use("/user", userRouter_1.default);
app.use("/admin", adminRouter_1.default);
console.log("hello");
app.listen(PORT, () => {
    console.log(`Server is connected to ${PORT}`);
});
