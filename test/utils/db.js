const mysql = require('mysql2');

const pool = mysql.createPool({
    connectionLimit: 100, //important
    host: 'localhost',
    user: 'springstudent',
    password: 'springstudent',
    database: 'demo',
    debug: false
});

// query rows in the table

function queryRow(scenario_name) {
    let selectQuery = 'SELECT * FROM ?? WHERE ?? = ?';
    let query = mysql.format(selectQuery, ["login_data", "scenario_name", scenario_name]);
    // query = SELECT * FROM `login_data` where `scenario_name` = 'invalid_user_name_and_password'
    pool.query(query, (err, data) => {
        if (err) {
            console.error(err);
            return;
        }
        // rows fetch
        console.log(data);
    });
}

// timeout just to avoid firing query before connection happens

setTimeout(() => {
    // call the function
    // select rows
    queryRow('shahid');
}, 5000);