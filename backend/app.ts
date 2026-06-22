// Import the express in typescript file
import express from "express";
import cors from "cors";
import helmet from "helmet";
import memesRoutes from "./modules/memes/memes.routes";
import { errorHandler } from "./middleware/error";

// Initialize the express engine
const app: express.Application = express();

app.use(helmet());
app.use(cors());
app.use(express.json());

app.use("/memes", memesRoutes);

app.use(errorHandler);

export default app;
