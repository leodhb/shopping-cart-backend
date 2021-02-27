const mongoose = require('mongoose');
require('dotenv/config');

beforeAll(done => mongoose.connect(process.env.DB_TEST_CONNECTION, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false }, done));
afterAll(done => {
    // Closing the DB connection allows Jest to exit successfully.
    mongoose.connection.close()
    done()
})
