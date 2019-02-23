const express = require('express');
const hbs = require('hbs');
const fs = require('fs');
const port = process.env.PORT || 3000;


var app = express();

app.set('view engine', 'hbs');

hbs.registerPartials(__dirname + '/views/partials');

hbs.registerHelper('currentYear', () => {
  return new Date().getFullYear()
})

hbs.registerHelper('screemIt', (text) => {
  return text.toUpperCase();
})

app.use((req,res,next) => {
  var now = new Date().toString();
  var log = `${now}, ${req.method}, ${req.url}`
  console.log(log);
  fs.appendFile('server.log', log + '\n', (err) => {
  if(err){
    console.log('unable to update server.log');
  }
  })
  next();
});


app.use((req,res,next) => {
  res.render('maintainance.hbs')
})

app.use(express.static(__dirname + '/public'));


app.get('/', (req,res) => {

  res.render('home.hbs', {
    pageTitle : 'Home Page',
    welcomeMessage : "welcome to my world"
  })

});

app.get('/about', (req,res) => {
  res.render('about.hbs', {
    pageTitle : 'About Page'
  });
});

app.get('/bad', (req,res) => {
  res.send({
    errorMessage: 'Not able to fulfill the request'
  })
})

app.listen(port, () => {
  console.log(`server started at port ${port}`);
});
