const express = require('express');
const app = express();

app.use(express.json());

const japanesefood = [
  {id: 1, menu: 'Sushi'},
  {id: 2, menu: 'Takoyaki'},
  {id: 3, menu: 'Sashimi'},
  {id: 4, menu: 'Yakimeshi'},
];

//view all
app.get('/api/japanesefood',(req, res) =>{
  res.send(japanesefood);
});

//view specific id
app.get('/api/japanesefood/:id',(req, res) =>{
  const japanese = japanesefood.find(c => c.id === parseInt(req.params.id));
  if (!japanese) res.status(404).send('The Japanese Food with the given ID is not found.');
  res.send(japanese);
});

//create
app.post('/api/japanesefood', (req, res) =>{
  if(!req.body.menu || req.body.menu.length < 2){
    res.status(400).send('Menu is required and should be minimum of 2 characters.');
  }
  const japanese = {
      id: japanesefood.length + 1,
      menu: req.body.menu
  };
  japanesefood.push(japanese);
  res.send(japanese);
});

//update
app.put('/api/japanesefood/:id', (req, res) => {
  const japanese = japanesefood.find(c => c.id === parseInt(req.params.id));
  if (!japanese) res.status(404).send('The Japanese Food with the given ID is not found.');
  japanese.menu = req.body.menu;
  res.send(japanese);
});

//delete
app.delete('/api/japanesefood/:id', (req, res) => {
  const japanese = japanesefood.find(c => c.id === parseInt(req.params.id));
  if (!japanese) res.status(404).send('The Japanese Food with the given ID is not found.');

  const index = japanesefood.indexOf(japanese);
  japanesefood.splice(index, 1);
  res.send(japanese);
});

//localhost
app.listen(3000, () => console.log('Listening on port 3000...'));