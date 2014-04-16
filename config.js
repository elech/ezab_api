if('development' == process.env.NODE_ENV){
	module.exports = {
		database: {
			client: 'mysql',
			connection: {
				host: 'localhost',
				port: '3306',
				user: 'root',
				password: 'toor',
				database: 'ezab'
			}
		},
		directory: './db/migrations',
		tableName: 'migrations'
	}	
}

if('test' == process.env.NODE_ENV){
	module.exports = {
		database: {
			client: 'mysql',
			connection: {
				host: 'localhost',
				port: '3306',
				user: 'root',
				password: 'toor',
				database: 'ezab_testing'
			}
		},
		directory: './db/migrations',
		tableName: 'migrations'
	}	
}
