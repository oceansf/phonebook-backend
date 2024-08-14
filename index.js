const express = require("express");
const morgan = require("morgan");
const app = express();

let persons = [
  {
    id: "1",
    name: "Arto Hellas",
    number: "040-123456",
  },
  {
    id: "2",
    name: "Ada Lovelace",
    number: "39-44-5323523",
  },
  {
    id: "3",
    name: "Dan Abramov",
    number: "12-43-234345",
  },
  {
    id: "4",
    name: "Mary Poppendieck",
    number: "39-23-6423122",
  },
];

// const requestLogger = (request, response, next) => {
//   console.log("Method:", request.method);
//   console.log("Path:  ", request.path);
//   console.log("Body:  ", request.body);
//   console.log("---");
//   next();
// };

app.use(express.json());
// app.use(requestLogger);

// const unknownEndpoint = (request, response) => {
//   response.status(404).send({ error: "unknown endpoint" });
// };

app.use(
  morgan(":method :url :status :res[content-length] - :response-time ms")
);

app.get("/api/persons", (request, response) => {
  response.json(persons);
});

app.get("/info", (request, response) => {
  response.send(
    `<p>Phonebook has info for ${
      persons.length
    } people<br/>${new Date().toString()}</p>`
  );
});

app.get("/api/person/:id", (request, response) => {
  const person = persons.find((person) => person.id === request.params.id);
  if (person) {
    response.json(person);
  } else {
    response.status(404).end();
  }
});

app.delete("/api/person/:id", (request, response) => {
  persons.filter((person) => {
    person.id === request.params.id;
  });

  response.json(204);
});

const generateId = () => {
  const maxId =
    persons.length > 0 ? Math.max(...persons.map((p) => Number(p.id))) : 0;
  return String(maxId + 1);
};

const checkIfExists = (name, number) => {
  const names = persons.map((person) => person.name);
  const numbers = persons.map((person) => person.number);

  if (names.includes(name) || numbers.includes(number)) {
    return true;
  } else {
    return false;
  }
};

app.post("/api/persons", (request, response) => {
  const body = request.body;

  if (!body.name || !body.number) {
    return response.status(400).json({
      error: "name or number missing",
    });
  } else if (checkIfExists(body.name, body.number)) {
    return response.status(400).json({
      error: "name or number already exists",
    });
  } else {
    const person = {
      id: generateId(),
      name: body.name,
      number: body.number,
    };

    persons = persons.concat(person);

    response.json(person);
  }
});

// app.use(unknownEndpoint);

const PORT = 3001;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
