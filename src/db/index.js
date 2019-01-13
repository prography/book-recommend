import mysql from 'mysql'
class singleton {
    static instance
    constructor(){
	if (instance) return instance;

	instance = mysql.createPool({
	    connectionLimit : 10,
	    host : config.db.host,
	    user : config.db.user,
	    password: config.db.pw,
	    database: config.db.database

	})
	pool.on('enqueue', function(){
	    console.log('waiting for availiable connection pool')
	}
    }
}


export default singleton
