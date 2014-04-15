
exports.up = function(knex, Promise) {
   return knex.schema.createTable('company', function(t){
  	t.increments('id').primary();
  	t.string('name', 255);
  	t.timestamps();
  })
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('company')
};
