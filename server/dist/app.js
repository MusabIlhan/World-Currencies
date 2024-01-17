"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const auth_1 = __importDefault(require("./routes/auth"));
const main_1 = __importDefault(require("./routes/main"));
const body_parser_1 = __importDefault(require("body-parser"));
const cors_1 = __importDefault(require("cors"));
const app = (0, express_1.default)();
const router = express_1.default.Router();
const port = 3001;
router.use("/auth", auth_1.default);
router.use("/main", main_1.default);
app.use((0, cors_1.default)({
    origin: "http://localhost:3000",
    methods: "GET,HEAD,PUT,PATCH,POST",
}));
app.use(body_parser_1.default.json());
app.use(router);
app.listen(port, () => {
    return console.log(`Express is listening at http://localhost:${port}`);
});
//# sourceMappingURL=app.js.map