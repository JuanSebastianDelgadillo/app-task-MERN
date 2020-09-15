const mongoose = require('mongoose');
const URI = 'mongodb://localhost:27017/mern-taks';

// mongoose.connect(URI)
//     .then(db => console.log('DB is connected'))
//     .catch(err => console.error(err));

(async() => {
    try {
        await mongoose.connect(URI, {
            useNewUrlParser: true,
            useCreateIndex: true,
            useUnifiedTopology: true
        }, (err, res) => {
            if (err) throw err;
            console.log('Mongo is ONLINE');
        });

    } catch (err) {
        console.log('error: ' + err);
    }
})()

module.exports = mongoose;