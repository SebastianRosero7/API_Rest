import mysql from 'mysql2/promise';


const config = {
    host: 'localhost',
    user: 'root',
    port: 3306,
    password: '',
    database: 'ejemplonode'
};


const connection = await mysql.createConnection(config);


export class MovieModel {
  static async getAll ({ genre }) {
    const [movies] = await connection.query("SELECT title,year,director,duration,poster,rate,CONCAT(LPAD(HEX(SUBSTR(id, 1, 4)), 8, '0'), '-', LPAD(HEX(SUBSTR(id, 5, 2)), 4, '0'), '-', LPAD(HEX(SUBSTR(id, 7, 2)), 4, '0'), '-',LPAD(HEX(SUBSTR(id, 9, 2)), 4, '0'), '-',LPAD(HEX(SUBSTR(id, 11, 6)), 12, '0')) AS id FROM movie");
    return movies;
}

  static async getById ({ id }) {
    const [movies] = await connection.query(`SELECT 
      title,year,director,duration,poster,rate,
      CONCAT(LPAD(HEX(SUBSTR(id, 1, 4)), 8, '0')
      , '-', LPAD(HEX(SUBSTR(id, 5, 2)), 4, '0')
      , '-', LPAD(HEX(SUBSTR(id, 7, 2)), 4, '0')
      , '-',LPAD(HEX(SUBSTR(id, 9, 2)), 4, '0')
      , '-',LPAD(HEX(SUBSTR(id, 11, 6)), 12, '0'))
       AS id FROM movie where id = UNHEX(REPLACE(?,'-',''));`,
       [id]);

       if (movies.length === 0) return null;

       return movies[0];
  }

  static async create ({ input }) {

    const {
      genre: genreInput,
      title,
      year,
      duration,
      director,
      rate,
      poster
    } = input;

    //generamos un UUID desde MySQL

    const [uuidResult] = await connection.query('SELECT UUID() as uuid;');
    const [{ uuid }] = uuidResult;
    
    
      try{
        await connection.query(`INSERT INTO movie 
          (id, title, year, director, duration, poster, rate) 
          VALUES (UNHEX(REPLACE(?,'-','')),?,?,?,?,?,?)`,
          [uuid,title, year, director, duration, poster, rate]);
      }catch(e){
        console.log(e.message);
        //throw new Error('Error al insertar la pelicula');
      };

      const movie = await connection.query(`select title,year,director,duration,
        poster,rate, CONCAT(
        LPAD(HEX(SUBSTR(id, 1, 4)), 8, '0'), '-',
        LPAD(HEX(SUBSTR(id, 5, 2)), 4, '0'), '-',
        LPAD(HEX(SUBSTR(id, 7, 2)), 4, '0'), '-',
        LPAD(HEX(SUBSTR(id, 9, 2)), 4, '0'), '-',
        LPAD(HEX(SUBSTR(id, 11, 6)), 12, '0')
    ) AS id FROM movie WHERE id = UNHEX(REPLACE(?,'-',''));`,[uuid]);

    return movie[0];
  }

  static async delete ({ id }) {
    
  }

  static async update ({ id, input }) {
    
  }
}