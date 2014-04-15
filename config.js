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
	directory: './migrations',
	tableName: 'migrations'
}
