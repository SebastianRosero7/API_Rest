import {randomUUID} from 'node:crypto';
import { createRequire } from 'node:module';

const require = createRequire(import.meta.url);
const movies = require('../../movies.json');

export class MovieModel {
    static async getAll({genre}){
        if(genre){
            return movies.filter(
                movie => movie.genre.some(g => g.toLowerCase() === genre.toLowerCase()));
        }
        return movies;
    }

    static async getById(id){
        const movie = movies.find((movie)=>movie.id === id);
        return movie;
    }


    static async create({movie}){
        const newMovie = {
            id: randomUUID(),
            ...movie
        };
        movies.push(newMovie);
        return newMovie;
    }

    static async delete({ id }){
        const index = movies.findIndex((movie) => movie.id === id);
        if (index === -1) return false;
        movies.splice(index,1);
        return true;
    }

    static async update({id, input}){
        const index = movies.findIndex((movie) => movie.id === id);
        if (index === -1) return false;
        movies[index] = {
            ...movies[index],
            ...input
        };
        return movies[index];
    }
}