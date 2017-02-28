const settings = require("./settings"); // settings.json
const knex = require('knex')({
  client: 'pg',
  connection: {
    user     : settings.user,
    password : settings.password,
    database : settings.database,
    host     : settings.hostname
    port     : settings.port
  }
});

const process_result = (query_output, name) => {
  console.log(`Found ${query_output.length} person(s) by the name '${name}'`);
  query_output.forEach( (row) => {
    const birthdate = `${row.birthdate.getFullYear()}-${row.birthdate.getMonth() + 1}-${row.birthdate.getDate()}`;
    console.log(`- ${row.id}: ${row.first_name} ${row.last_name}, born '${birthdate}'`);
  });
};

knex.select()
  .from('famous_people')
  .where('first_name', process.argv[2])
  .orWhere('last_name', process.argv[2])
  .then( (result) => {
    process_result(result, process.argv[2]);
  });
knex.destroy();
console.log('Searching ...');


