const express = require('express');
const { MongoClient } = require("mongodb");
const app = express();

app.use(express.static('public'));

const port = 3000;
// Replace the uri string with your connection string.
const uri = "mongodb+srv://griffinme:Password@menucluster1.p4t7fkj.mongodb.net/?retryWrites=true&w=majority&appName=MenuCluster1";

const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

async function connectToMongoDB() {
  try {
      await client.connect();
      console.log('Connected to MongoDB');
  } 
  catch (error) {
      console.error('Error connecting to MongoDB:', error);
  }
}
connectToMongoDB();

app.get('/', async (req, res) => {
try{
  const database = client.db('Menu');

  const food_col = database.collection('Food');

  const foods = await food_col.find({}, { projection: { _id: 0, name:1, type: 1, ingredients: 1}}).toArray();
  const salads = [];
  const sp = [];
  const cp = [];
  const cs = [];
  const km = [];
  
      for(let i = 0; i < foods.length; i++)
      {
        if (foods[i].type == "Salad")
        {
          salads.push(foods[i]);
        }
        else if (foods[i].type == "Signature Panini")
        {
          sp.push(foods[i]);
        }
        else if (foods[i].type == "Classic Panini")
        {
          cp.push(foods[i]);
        }
        else if (foods[i].type == "Cold Sandwich")
        {
          cs.push(foods[i]);
        }
        else if (foods[i].type == "Kids' Menu")
        {
          km.push(foods[i]);
        }
        //else if (foods[i].type == "Soup")
        //{
          //s.push(foods[i]);
        //}
        //else if (foods[i].type == "Build Your Own")
        //{
          //byo.push(foods[i]);
        //}
        else
        {
          //alert("Other");
          console.log("Oh no");
        }
      }
      const esp = [];
      const other = [];
      const coffee = [];
      const tea = [];
      const frozen = [];
      const tap = [];
      const bar = [];
      const drinks_col = database.collection('Drinks');
      const drinks_info = await drinks_col.find({}, { projection: { _id: 0, name: 1, type: 1, price: 1, "size_price.12oz": 1, "size_price.16oz": 1,"size_price.2oz": 1, "size_price.8oz": 1, "size_price.4oz": 1, "size_price.12oz cans":1}}).toArray();
      for (let i = 0; i < drinks_info.length; i++)
      {
        if (drinks_info[i].type == "Espresso")
        {
          esp.push(drinks_info[i]);
        }
        else if (drinks_info[i].type == "Other Drinks")
        {
          other.push(drinks_info[i]);
        }
        else if (drinks_info[i].type == "Coffee")
        {
          coffee.push(drinks_info[i]);
        }
        else if (drinks_info[i].type == "Tea")
        {
          tea.push(drinks_info[i]);
        }
        else if (drinks_info[i].type == "Frozen Drink")
        {
          frozen.push(drinks_info[i]);
        }
        else if (drinks_info[i].type == "On Tap")
        {
          tap.push(drinks_info[i]);
        }
        else if (drinks_info[i].type == "Bar")
        {
          bar.push(drinks_info[i]);
        }
      } 
  res.render('index.ejs', {salads, sp, cp, cs, km, esp, coffee, tea, frozen, other, tap, bar}); // other, frozen, tap, bar
}
  catch (error) {
  console.error('Error retrieving data from MongoDB:', error);
  res.status(500).send('Internal Server Error');
  }
});
    
app.get('/cakes.html', (req, res) => {
  // Handle the request (e.g., render an EJS template or serve an HTML file)
  res.sendFile("C:/Users/12meg/OneDrive/Desktop/CafeOnBroadway/public/cakes.html");
});

app.set('view engine', 'ejs');

// Start server
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});

  