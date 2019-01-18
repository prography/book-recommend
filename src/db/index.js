import mysql from 'mysql'
import config from 'config'
let instance
class Singleton {
    constructor(){
	if (instance) return instance;

	instance = mysql.createPool({
	    connectionLimit : 10,
	    host : config.db.host,
	    user : config.db.user,
	    password: config.db.pw,
	    database: config.db.database

	})
	return instance;
    }
}


export default Singleton
