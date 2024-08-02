import { validarMovie,validarParcialMovie } from '../schemas/moviesSchema.js';

const ACCEPTED_ORIGINS = [
    'http://localhost:3000',
    'http://localhost:1234',
    'http://localhost:8080',
    'http://127.0.0.7:5500'
];

export class MovieController{

    constructor({movieModel}) {
        this.movieModel = movieModel;
    }

    gatAll= async (req,res)=>{
    
        const origin = req.header('origin');
    
        if(ACCEPTED_ORIGINS.includes(origin) || !origin){
            res.header('Access-Control-Allow-Origin',origin);
        }
        
        const {genre} = req.query;
    
        const movies = await this.movieModel.getAll({genre});
    
        res.json(movies);

    };

    getById = async (req,res) => {
        const {id} = req.params;
        
        const movie = await this.movieModel.getById({id});
    
        if (movie) return res.json(movie);
    
        res.status(404).json({message:'Movie not found'});
    
    
    };

    create = async (req,res) => {
        const result = validarMovie(req.body);
    
        if (result.error){
            //puede ser el error 422 
            return res.status(400).json({ error: JSON.parse(result.error.message)}); 
        }
        
        const newMovie = await this.movieModel.create({input: result.data});
    
        res.status(201).json(newMovie);
    };

    delete = async (req,res) => {
        const origin = req.header('origin');
    
        if(ACCEPTED_ORIGINS.includes(origin) || !origin){
            res.header('Access-Control-Allow-Origin',origin);
        }
    
        const {id} = req.params;
    
        const result = await MovieModel.delete({id}); 
    
        if(result === false) return res.status(404).json({message:'Movie not found'});
    
        return res.json({message:'Movie deleted'});
    };

    update = async (req,res) => {
        const result = validarParcialMovie(req.body);
    
        if(!result.success){
            return res.status(400).json({error: JSON.parse(result.error.message)});
        }   
    
        const {id} = req.params;
        
        const updateMovie = await this.movieModel.update({id, input: result.data});
    
        return res.json(updateMovie);
    };
    
}