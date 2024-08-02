import { createApp } from "./app.js";
import { MovieModel } from "./models/MySql/movie.js";

createApp({movieModel: MovieModel});