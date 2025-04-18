"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const db_1 = __importDefault(require("./db"));
const userRouter_1 = __importDefault(require("./router/userRouter"));
const adminRouter_1 = __importDefault(require("./router/adminRouter"));
const app = (0, express_1.default)();
app.use((0, cors_1.default)());
(0, db_1.default)();
app.use(express_1.default.json());
const PORT = process.env.PORT || 8001;
app.use("/user", userRouter_1.default);
app.use("/admin", adminRouter_1.default);
app.listen(PORT, () => {
    console.log(`Server is connected to ${PORT}`);
});
