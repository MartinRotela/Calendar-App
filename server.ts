import express from "express";
import dotenv from "dotenv";
import { authRouter } from "./routes/auth";
import { dbConnection } from "./database/config";
import path from "path";
import cors from "cors";
import { eventRouter } from "./routes/events";

const app = express();
dotenv.config();
const PORT = process.env.PORT;
const publicPath = path.join(__dirname, "..", "public");

//Cors
app.use(cors());

//Database
dbConnection();

//Read and parse body
app.use(express.json());

//Public directory
app.use("/", express.static("public"));

//Routes
app.use("/api/auth", authRouter);
app.use("/api/events", eventRouter);
app.get("/*", function (req, res) {
    res.sendFile(path.join(publicPath, "index.html"), function (err) {
        if (err) {
            res.status(500).send(err);
        }
    });
});

app.listen(PORT, () => console.log(`Servidor iniciado en puerto ${PORT}`));
