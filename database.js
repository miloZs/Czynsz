const req = require('express/lib/request');
const sql = require('mssql')

const config = {
    user: 'app',
    password: 'app',
    database: 'RYNEK',
    server: 'localhost',
    options: {
      trustServerCertificate: true
    },
};

sql.on('error', err => {
    console.log('Error in loading database')
})

let pool = null;

async function connect() {
    if (!pool) { //if pool is not null (! - to takie not)
        try {
            pool = sql.connect(config)
        } catch (err) {
            console.error('Error <3', err)
    
            throw err
        }
    }   
    return pool
}

async function request() {
    const pool = await connect();
    return new sql.Request(pool);
}

module.exports = {
    request
};
