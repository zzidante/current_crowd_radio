
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('users').del()
    .then(function () {
      // Inserts seed entries
      return knex('users').insert([
        {username: 'Blake', email:'b@b', password_digest:'$2a$10$adozTykGKRCF/RIGXKaYeeNntZ8JkCI6aXkIu6i9p8BueBJrIYniW', default_location:'Vancouver, BC, Canada'},
        {username: 'Mel', email:'m@m', password_digest:'$2a$10$RPLO0pAhwcBT6SE6cp93fupnyL9Wnf4X42q.boCKVwyTv9XuCCSJG', default_location:'Vancouver, BC, Canada'},
        {username: 'Curtis', email:'c@c', password_digest:'$2a$10$GzO1k33/9yAwc9QHA89.jOQiQFq8BCl5MuvBJUQ8NuAwOP2sH.3zy', default_location:'Montreal, QC, Canada'}
      ]);
    });
};
