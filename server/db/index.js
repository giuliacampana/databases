var mysql = require('mysql');

// Create a database connection and export it from this file.
// You will need to connect with the user "root", no password,
// and to the database "chat".

var dbCon = mysql.createConnection({
  host: "localhost",
  user: "root"
});

dbCon.connect(function(err) {
  if (err) throw err;
  console.log("Connected!");
  dbCon.query(sql, function (err, data) {
    if (err) throw err;
    console.log("Data is ",data)
  })
})

