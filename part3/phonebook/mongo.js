const mongoose = require('mongoose');

if (process.argv.length < 3) {
  console.log('Please provide the password as an argument: node mongo.js <password>');
  process.exit(1);
}

const password = process.argv[2];
const url = `mongodb+srv://fullstack:${password}@cluster0.kbiklji.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;

console.log(url);
mongoose.set('strictQuery', false);

mongoose.connect(url).then(() => {
    console.log('Connected to MongoDB');
  })
  .catch((error) => {
    console.error('Error connecting to MongoDB:', error.message);
  });


const personSchema = new mongoose.Schema({
  name: String,
  number: String,
});

const Person = mongoose.model('Person', personSchema);

if (process.argv.length > 3) {
  const name = process.argv[3];
  const number = process.argv[4];

  const person = new Person({
    name: name,
    number: number,
  });

  person.save()
    .then(() => {
      console.log(`added ${person.name} number ${person.number} to phonebook`);
      return mongoose.connection.close();
    })
    .catch((error) => {
      console.error('Error saving person:', error.message);
      return mongoose.connection.close();
    });

  return;
}

Person.find({})
  .then((result) => {
    console.log('Phonebook:');
    result.forEach((person) => {
      console.log(`${person.name} ${person.number}`);
    });
    return mongoose.connection.close();
  })
  .catch((error) => {
    console.error('Error fetching persons:', error.message);
    return mongoose.connection.close();
  });   


  
  

  