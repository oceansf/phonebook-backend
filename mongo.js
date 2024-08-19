const mongoose = require("mongoose");

if (process.argv.length < 3) {
  console.log("give password as argument");
  process.exit(1);
}

const password = process.argv[2];

const url = `mongodb+srv://oceansf:${password}@cluster0.3gd3r.mongodb.net/phonebookApp?retryWrites=true&w=majority&appName=Cluster0`;

// Allows values unspecified in the model constructor to be passed
mongoose.set("strictQuery", false);
// Connects to mongo DB
mongoose.connect(url);

// Define schema
const personSchema = new mongoose.Schema({
  id: String,
  name: String,
  number: String,
});

const Person = mongoose.model("Person", personSchema);

// Create new person object
const person = new Person({
  id: "1",
  name: "Arto Hellas",
  number: "040-123456",
});

// Add predefined person above to collection
person.save().then((result) => {
  console.log("note saved!");
});

// Prints out each person in collection
Person.find({}).then((result) => {
  result.forEach((person) => {
    console.log(person);
  });
  mongoose.connection.close();
});
