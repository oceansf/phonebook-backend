const { Db } = require("mongodb");
const mongoose = require("mongoose");

if (process.argv.length < 3) {
  console.log("give password as argument");
  process.exit(1);
}

const password = process.argv[2];
const name = process.argv[3];
const number = process.argv[4];

const url = `mongodb+srv://oceansf:${password}@cluster0.3gd3r.mongodb.net/phonebookApp?retryWrites=true&w=majority&appName=Cluster0`;

// Allows values unspecified in the model constructor to be passed
mongoose.set("strictQuery", false);
// Connects to mongo DB
mongoose.connect(url);

// Define schema
const personSchema = new mongoose.Schema({
  id: Number,
  name: String,
  number: String,
});

const Person = mongoose.model("Person", personSchema);

// Create new person object
const person = new Person({
  name,
  number,
});

if (!name || !number) {
  // Prints out each person's name and number in collection
  Person.find({}).then((result) => {
    result.forEach((person) => {
      console.log(`${person.name} ${person.number}`);
    });
    mongoose.connection.close();
  });
} else {
  // Add predefined person above to collection
  person.save().then((result) => {
    console.log(`added ${name} number ${number} to phonebook`);
    mongoose.connection.close();
  });
}
