import { Router } from "express";
import { MovieController } from "../controllers/movie.js";


export const createMovieRute = ({movieModel}) => {
    const moviesRouter = Router();

    const movieController = new MovieController({movieModel});


    moviesRouter.get('/',movieController.gatAll);

    moviesRouter.get('/:id',movieController.getById);

    moviesRouter.post('/',movieController.create);

    moviesRouter.delete('/:id',movieController.delete);

    moviesRouter.patch('/:id', movieController.update);

    return moviesRouter;
};
