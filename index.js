const express = require("express");
const morgan = require("morgan");
const app = express();
const cors = require("cors");

const Person = require("./mongo");

app.use(cors());
app.use(express.json());

app.use(
  morgan(":method :url :status :res[content-length] - :response-time ms")
);

app.get("/api/persons", (request, response) => {
  Person.find({}).then((people) => {
    response.json(people);
  });
});

// app.get("/info", (request, response) => {
//   response.send(
//     `<p>Phonebook has info for ${
//       persons.length
//     } people<br/>${new Date().toString()}</p>`
//   );
// });

// app.get("/api/person/:id", (request, response) => {
//   const person = persons.find((person) => person.id === request.params.id);
//   if (person) {
//     response.json(person);
//   } else {
//     response.status(404).end();
//   }
// });

// app.delete("/api/person/:id", (request, response) => {
//   persons.filter((person) => {
//     person.id === request.params.id;
//   });

//   response.json(204);
// });

// const generateId = () => {
//   const maxId =
//     persons.length > 0 ? Math.max(...persons.map((p) => Number(p.id))) : 0;
//   return String(maxId + 1);
// };

// const checkIfExists = (name, number) => {
//   const names = persons.map((person) => person.name);
//   const numbers = persons.map((person) => person.number);

//   if (names.includes(name) || numbers.includes(number)) {
//     return true;
//   } else {
//     return false;
//   }
// };

app.post("/api/persons", (request, response) => {
  const body = request.body;
  // Check for missing fields or already added person
  // if (!body.name || !body.number) {
  //   return response.status(400).json({
  //     error: "name or number missing",
  //   });
  // } else if (checkIfExists(body.name, body.number)) {
  //   return response.status(400).json({
  //     error: "name or number already exists",
  //   });
  // } else {
  //   const person = {
  //     id: generateId(),
  //     name: body.name,
  //     number: body.number,
  //   };

  // Create a new person
  const person = new Person({
    name: body.name,
    number: body.number,
  });

  person.save().then((savedPerson) => {
    response.json(savedPerson);
  });
  // }
});

const PORT = 3001;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
