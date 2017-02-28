const pg = require("pg");
const settings = require("./settings"); // settings.json

const client = new pg.Client({
  user     : settings.user,
  password : settings.password,
  database : settings.database,
  host     : settings.hostname,
  port     : settings.port,
  ssl      : settings.ssl
});

const queryDb = (name) => {
  client.connect((err) => {
    if (err) { return console.error("Connection Error", err); }

    let query = `SELECT * FROM famous_people
                  WHERE first_name = $1::text
                  OR last_name = $1::text`;

    client.query(query, [name], (err, result) => {
      if (err) { return console.error("error running query", err); }


      process_result(result.rows, name);
      client.end();
    });

    console.log('Searching ...');
  });
}

const process_result = (query_output, name) => {
  console.log(`Found ${query_output.length} person(s) by the name '${name}'`);
  query_output.forEach( (row) => {
    const birthdate = `${row.birthdate.getFullYear()}-${row.birthdate.getMonth() + 1}-${row.birthdate.getDate()}`;
    console.log(`- ${row.id}: ${row.first_name} ${row.last_name}, born '${birthdate}'`);
  });
}

queryDb(process.argv[2]);