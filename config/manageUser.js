var mysql = require('mysql');
var connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'root',
    database: 'nodeProject'
});


module.exports.createUser = function(newUser, callback) {
    connection.query('INSERT INTO user SET ?', newUser, function(err, res) {
        if (err) throw err;
        console.log('Last insert ID:', res.insertId);
        // callback(null, res);
    });
}

module.exports.getUserByEmail = function(email, callback) {
    connection.query('select * from user where email=?', [email], function(err, result) {
        if (err) throw err;
        //console.log(result[0]);
        var user = JSON.parse(JSON.stringify(result));
        console.log('user Id : ', user[0]);
        callback(null, user[0]);
    });
}

module.exports.getUserById = function(id, callback) {
    connection.query('select * from user where id=?', [id], function(err, result) {
        if (err) throw err;
        var user = JSON.parse(JSON.stringify(result));
        console.log('user Id : ', user[0]);
        callback(null, user[0]);
    });
}