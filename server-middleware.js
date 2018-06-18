const express= require('express');
const hbs= require('hbs');
const fs= require('fs');

var app = new express();

//set view engine
app.set('view engine','hbs');
//register registerPartials
hbs.registerPartials(__dirname + '/views/partials');
hbs.registerHelper('getCurrentYear',()=>
{
  return new Date().getFullYear();
});

// hbs.registerHelper('screamIt',(text)=>
// {
//   return text.toUpperCase();
// });

hbs.registerHelper('screamIt',(text)=>{
  return text.toUpperCase();
});
//.use is required to define middleware
//.use take an argument function (req,res,next) and next(); shoule be called inside that function
//if next(); is not used the application hanged since we are stuck in the middleware
//we can define multiple middleware by having next for each one
app.use((req,res,next)=>{
  var now = new Date().toString();
  var log= `${now}: ${req.method}- ${req.url}`;
  fs.appendFile('server.log',log+'\n', (err)=>
  {
    if (err)
    {
      console.log('can not append file');
    }
  });
  console.log(log);
  next();
});

/*New middleware to view maintenance page instead of next
since we did not call next(); then request will not pass through and maintenance page will be displayed
NOTE: middleware are executed in order so if we define static pages before loading maintenance page then help page will be
loaded.*/
app.use((req,res,next)=>
{
  res.render('maintenance.hbs');
});
//Define route
app.get('/',(req,res)=>
{
  res.render('home-partial.hbs',{
    welcomeMessage:'Hi Doaa Alkhateib'
  })
});

//Define port that application listening to
app.listen(3000,()=>{
  console.log('server is up at port 3000');
});
