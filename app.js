import express, { json } from 'express';
import { createMovieRute } from './routes/movies.js';


export const createApp = ({movieModel}) => {

    const app = express();
    app.disable('x-powered-by');
    app.use(json());

    app.use('/movies',createMovieRute({ movieModel }));

    app.options('/movies/:id',(req,res)=>{

        const origin = req.header('origin');

        if(ACCEPTED_ORIGINS.includes(origin) || !origin){
            res.header('Access-Control-Allow-Origin',origin);
            res.header('Access-Control-Allow-Methods','GET,POST,PATCH,DELETE,OPTIONS');
        }
        res.send(200); 
    });

    const PORT = process.env.PORT ?? 1234;

    app.listen(PORT, () => {

        console.log(`Server is running on port ${PORT}`);

    });

};

