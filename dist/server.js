"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const auth_1 = require("./routes/auth");
const config_1 = require("./database/config");
const path_1 = __importDefault(require("path"));
const cors_1 = __importDefault(require("cors"));
const events_1 = require("./routes/events");
const app = (0, express_1.default)();
dotenv_1.default.config();
const PORT = process.env.PORT;
const publicPath = path_1.default.join(__dirname, "..", "public");
//Cors
app.use((0, cors_1.default)());
//Database
(0, config_1.dbConnection)();
//Read and parse body
app.use(express_1.default.json());
//Public directory
app.use("/", express_1.default.static("public"));
//Routes
app.use("/api/auth", auth_1.authRouter);
app.use("/api/events", events_1.eventRouter);
app.get("/*", function (req, res) {
    res.sendFile(path_1.default.join(publicPath, "index.html"), function (err) {
        if (err) {
            res.status(500).send(err);
        }
    });
});
app.listen(PORT, () => console.log(`Servidor iniciado en puerto ${PORT}`));
