
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('tracks').del()
    .then(function () {
      // Inserts seed entries
      return knex('tracks').insert([
        {href_id: '143805'},
        {href_id: '743205'},
        {href_id: '743213'}
      ]);
    });
};
