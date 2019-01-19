import mysql from 'mysql'
import config from 'config'
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
	    host : config.db.host,
	    user : config.db.user,
	    password: config.db.pw,
	    database: config.db.database,
		port: config.db.port
	})
	return instance;
    }
}


export default Singleton
