const mongoose = require("mongoose");
// Get accesse to global variables stored in default.json
const config = require("config");
const db = config.get("mongoURI"); // get mongoURI

// mongoose return promises
const connectDB = async () => {
  try {
    mongoose.connect(db, {
      // These will avoid console logging some warnings depends on the version of MongoDB
      useNewUrlParser: true,
      useCreateIndex: true,
      useFindAndModify: false,
      useUnifiedTopology: true,
    });

    console.log("MongoDB Connected");
  } catch (err) {
    console.error(err.message);
    process.exit(1);
  }
};

// .then.catch syntax
// const connectDB = () => {
//   mongoose
//     .connect(db, {
//       useNewUrlParser: true,
//       useCreateIndex: true,
//       useFindAndModify: false,
//     })
//     .then(() => console.log("MongoDB Connected"))
//     .catch((err) => {
//       console.error(err.message);
//       process.exit(1);
//     });
// };

module.exports = connectDB;
