const settings = require("./settings"); // settings.json
const knex = require('knex')({
  client: 'pg',
  connection: settings
});


const [,,first_name, last_name, birthdate] = process.argv;
console.log(first_name, last_name, birthdate);

knex.table('famous_people')
  .insert({
    'first_name': first_name,
    'last_name': last_name,
    'birthdate': birthdate
  })
  .then( (id) => {
    console.log(`Inserted Account ${id}`);
  });
knex.destroy();