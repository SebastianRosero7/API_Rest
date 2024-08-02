import  z  from 'zod';

const movieSchema = z.object({
    title:z.string({
        invalid_type_error:'Title must be a string',
        required_error:'Title is required'
    }),
    year:z.number().int().positive().min(1900).max(2022),
    director:z.string(),
    duration:z.number().int().positive(),
    rate:z.number().min(0).max(10).default(5),
    poster:z.string().url().endsWith('.jpg'),
    genre:z.array(z.enum(['Action','Comedy','Drama','Horror','Romance','Thriller']),{
        required_error:'Genre is required',
        invalid_type_error:'Genre must be an array of strings',
        invalid_item_error:'Invalid genre'
    })
});

export function validarMovie(movie){
    return movieSchema.safeParse(movie);
}

export function validarParcialMovie(movie){
    return movieSchema.partial().safeParse(movie);
}

