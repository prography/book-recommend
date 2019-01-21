import mysql from 'mysql'
import { TIMEOUT } from 'dns';
let instance
class Singleton {
    constructor(){
	if (instance) return instance;

	instance = mysql.createPool({
		connectionLimit : 1000,
		connectTimeout  : 60 * 60 * 1000,
		aquireTimeout   : 60 * 60 * 1000,
		timeout         : 60 * 60 * 1000,
	    host : process.env.DB_HOST,
	    user : process.env.DB_USER, 
	    password: process.env.DB_PW,
	    database: process.env.DATABASE, 
		port: config.db.port
	})
	return instance;
    }
}


export default Singleton
