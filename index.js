const mongoose = require('mongoose');

// Import of the model Recipe from './models/Recipe.model.js'
const Recipe = require('./models/Recipe.model');
// Import of the data from './data.json'
const data = require('./data');

const MONGODB_URI = 'mongodb://localhost:27017/recipe-app';


const hotChocolate = {
  title: 'Hot Chocolate',
  level: 'Easy Peasy',
  ingredients: [ 'milk', 'cocoa powder' ],
  cuisine: 'international',
  dishType: 'drink',
  image: 'https://images.unsplash.com/photo-1608735484559-50aa06c9478c' ,
  duration: '5',
  creator: 'probably the same that invented fire. or cocoa',
}

// Connection to the database "recipe-app"
mongoose
  .connect(MONGODB_URI)
  .then((x) => {
    console.log(`Connected to the database: "${x.connection.name}"`);
    // Before adding any recipes to the database, let's remove all existing ones
    return Recipe.deleteMany();
  })
  .then(() => {
    // Run your code here, after you have insured that the connection was made
    console.log(`Connected to the database: "${x.connection.name}"`);
    return Recipe.create(hotChocolate), console.log(hotChocolate.title);
  })

  // then import all
  .then(() => {
    function logAllRecipeTitles(arr) {
      for(let i=0; i<arr.length; i++) {
        console.log(arr[i].title);
      }
    }
    return Recipe.insertMany(data), logAllRecipeTitles(data);
  })

  // then update
  .then(() => {
    const query = { title: 'Rigatoni alla Genovese' };
    return Recipe.findOneAndUpdate(query, { duration: 100 }), console.log('successfully updated');
  })
  .then(() => {
    return Recipe.deleteOne({ title: 'Carrot Cake' }), console.log('successfully deleted');

  })
  .then(() => {

  })
  .then(() => {
    mongoose.connection.close();
  })
  .catch(error => {
    console.error('Error connecting to the database', error);
  });