
exports.up = function(knex) {
  return knex.schema
    .createTable('users', table => {
        table.increments();
        table.text("username").notNull().unique();
        table.text("password").notNull();
        table.text("department").notNull();
    })
};

exports.down = function(knex) {
    return knex.schema.dropTableIfExists('users');
};