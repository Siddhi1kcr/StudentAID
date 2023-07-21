const mongoose = require("mongoose");

mongoose.connect("mongodb://0.0.0.0:27017/Registration")
.then(() => {
    console.log(`connection successful`);
}).catch((e) => {
    console.log(`connection failed`);
})
 