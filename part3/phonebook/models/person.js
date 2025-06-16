
const mongoose = require('mongoose');
require('dotenv').config();


// const password = process.argv[2];
// const url = `mongodb+srv://fullstack:${password}@cluster0.kbiklji.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;
const url = process.env.MONGODB_URI
console.log(url);

mongoose.set('strictQuery', false);

mongoose.connect(url).then(() => {
    console.log('Connected to MongoDB');
  })
  .catch((error) => {
    console.error('Error connecting to MongoDB:', error.message);
  });


const personSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 3,
    unique: true,
  },
  number: {
    type: String,
    required: true,
    minlength: 8,
    validate: {
      validator: function (v) {
        return /\d{2,3}-\d+/.test(v);
      },
      message: (props) => `${props.value} is not a valid phone number!`,
    },
  },
});

personSchema.set('toJSON', {
    transform: (document, returnedObject) => {
        returnedObject.id = returnedObject._id.toString();
        delete returnedObject._id;
        delete returnedObject.__v;
    }
}); 

module.exports = mongoose.model('Person', personSchema);