//file: src/server.ts
import express from "express";
import "dotenv/config"
import router from "./router";
import { connectDB } from "./config/conexion_DB";
import cors from "cors"
import { corsConfig } from "./config/cors";

const app = express();

app.use(express.json())

connectDB()
app.use(cors(corsConfig))


app.use("/", router);

export default app;