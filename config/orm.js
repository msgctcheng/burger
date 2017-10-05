var connection = require("../config/connection.js");


function questionMarks(num) {
    var arr = [];
    for (var i = 0; i<num; i++) {
        arr.push("?")
    }
    return arr.toString();
};

function makeSql(ob) {
    var arr=[];
    for (var key in ob) {
        var val = ob[key];
        if (Object.hasOwnProperty.call(ob, key)) {
            if (typeof val === "string" && val.indexOf(" ") >= 0) {
                val = "'" + val + "'"; 
            }
            arr.push(key + "=" + val);
        }
    }
    return arr.toString();
};
var orm = {
    selectAll: function(tableInput, callback) {
        var sqlQuery = "SELECT * FROM " + tableInput + ";";
        connection.query(sqlQuery, function(error, result) {
            if (error) throw error;
            callback(result);
        });
    },
    insertOne: function(table, column, values, callback) {
        var sqlQuery = "INSERT INTO " + table + " ("+ column.toString() + ") VALUES (" + questionMarks(values.length) + ")";
        console.log(sqlQuery);
        connection.query(sqlQuery, values, function(error, result){
            if (error) throw error;
            callback(result);
        })
    },
    updateOne: function(table, obj, condition, callback) {
        var sqlQuery = "UPDATE " + table + " SET " + makeSql(obj) + " WHERE " + condition;
        console.log(sqlQuery);
        connection.query(sqlQuery, function(error, result) {
            if (error) throw error;
            callback(result);
        });
    }
};

module.exports = orm; 