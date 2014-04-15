
exports.up = function(knex, Promise) {
  return knex.schema.createTable('users', function(t){
  	t.increments('id').primary();
  	t.string('name', 255);
  	t.string('email', 255);
  	t.string('password', 255);
  	t.timestamps();
  })
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('users');
};
