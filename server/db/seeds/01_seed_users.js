
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('users').del()
    .then(function () {
      // Inserts seed entries
      return knex('users').insert([
        {username: 'blake', email:'blake@example.com', password_digest:'password', default_location:'1038'},
        {username: 'mel', email:'mel@example.com', password_digest:'password', default_location:'1038'},
        {username: 'curtis', email:'curtis@example.com', password_digest:'password', default_location:'353633'}
      ]);
    });
};
