/*server.js file is our first file in which we will configure our web server
1- define routes
2- define pages and url
3- define server port number ..etc  */

const express = require('express');
const hbs= require('hbs');

/* in order to create new app with express all we need to create new instance of express method*/
var app = express();

/*When rendering markup pages we might need to have some tags that should be repeated in each page and in case we need to make a
change we have to change all pages, instead hbs engine has "partials" that can be used to handle repeated tags
1- we need to define partial file with .hbs extension
2- we have to register partails in hbs passing paramete represents the direcory of partial files
3- in the dynamic page the partial should be passed like this {{>footer}}, where {{>}} is the key word followed by partial name which is footer in the
above example
NOTE : the path should always start with '/'
hbs partials is for creating reusable bunch of code just like header and footer
*/
hbs.registerPartials(__dirname +'/views/partials');

/*app.set method is used to set up some configuarion for express, it accepts a key value pairs and there are built-in ones
NOTE: express has a default folder for templates under the root and of name views so we will create
views folder to the project on order to add our templates to it
NOTE: template files under views folder should have .hbs extension*/
app.set('view engine','hbs');


/* setup static directory
In order to have some physical files jsut like scripts, css and html pages accessible to public
we can use express middleware , express middleware can be executed using ".use" keyword
__dirname return the root directory of your application*/
app.use(express.static(__dirname+'/public'));

/*hbs helpers: are used to run java script code from inside your handle bar templates
in order to do this:
1- We need to register handlebar helper using hbs.registerHelper(name of the helper,fucntion to be executed)
2- inside the template and in order to render the helper we do need to use {{helpername}}
3- node js first will see if the token name inside the tempate matches any hbs registered helper, if found it will be used
else it will look for any tag defined upom calling .render method
4- if the helper function take paramteres, then inside the template we can call this helper by specifiying the name and space separator
to provide parmaters like this {{helpername arg1 arg2}}
5- if we use hbs helper then we do not need to add the token in the .render method, as you will see in the next example that
getCurrentYear will be rendered while the token is not defined in the replacemnt tags of the .render method
example of rendering using hbs helpers*/
hbs.registerHelper('getCurrentYear',()=>{
  return new Date().getFullYear();
});

hbs.registerHelper('screamIt',(text)=>{
  return text.toUpperCase();
});

app.get('/home-hbs-helper',(req,res)=>{
  res.render('home-hbs-helper.hbs',{
    welcomeMessage: 'Welcome to our home page with hbs helpers'
  });
});
/*set up routes using .get method:
1- get method take 2 args the url and function of (req and response)
2- if the url is in the root app directly we only need to add this "/" as URL this
is a relative path that will be pointing to application root
3- to map response we do use res.send method*/
app.get('/',(req,res)=>
{
  /*since the response in the next line of type text/html we can add whatever html tags to the response
  and the text will be displayed using the browser default setting for those html tags*/
  /*1- return response of type text/html*/
  // res.send('Hello doaa');

  // res.send('<h1> Hello doaa</h1>');

  //2- to rturn response of type json, we nee to return object and it will be formatted as json to end user
  //Using JSON view in browser and if we want to see the actual row json value, at the top right corner click viewSource
  // and then you will get {"name":"Doaa","likes":["swimming","reading"]}
  res.send({
    name: 'Doaa',
    likes :['swimming','reading']
  });
});

/*1- define a page that will retirn static text and we do this by using the res.send with the text we want to return
define a second route for about page, make sure to keep always the "/" at the beginning of the url route.*/
// app.get('/about', (req,res)=>{
//   res.send ('About page');
// });

/*2- in order to render a page from template we should use res.render function passing the template name as paramter
the following example render a static template */
app.get('/about',(req,res)=>
{
    res.render('about.hbs')
});

/*3- render dynamic template, in order to do this we need to pass another paramter to .render
it is an object that represents the replacement tag names and their values
NOTE: in the dynamic template itself the replacement tags should be passed between double {{pageTtile}}*/
app.get('/about-dynamic',(req,res)=>
{
  res.render('about-dynamic.hbs',{
    pageTitle: 'About Page',
    currentYear: new Date().getFullYear()
  })
});

/*4- render dynamic home page*/
app.get('/home-dynamic',(req,res)=>
{
  res.render('home-dynamic.hbs',{
      pageTitle: 'Home Page',
      currentYear: new Date().getFullYear(),
      welcomeMessage: 'Welcome to our dynamic home page'

  });
});

/*render home page with partials*/
app.get('/home-partial',(req,res)=>
{
  res.render('home-partial.hbs',{
      pageTitle: 'Home Page',
      currentYear: new Date().getFullYear(),
      welcomeMessage: 'Welcome to our partial home page'
  });
});

/*render about page with partials*/
app.get('/about-partial',(req,res)=>
{
  res.render('about-partial.hbs',{
    pageTitle: 'About Page',
    currentYear: new Date().getFullYear(),
    welcomeMessage:  'Welcome to our partial about page'
  })
});
//define a third route for bad page, make sure to keep always the "/" at the beginning of the url route.
app.get('/bad', (req,res)=>{
  res.send ({errorCode: 10,
    errorMessage:'Unbale to process your requet'
  });
});

/*Server will not be started unless we enforce it to listen to specific port
once we run node in console it will keep listening to the port until we explicitlty shut down the app by multiple ctlr+C commands
.listen take another second optional paramter that will be exceuted once server is up and it is a function*/
app.listen(3000, ()=>
{
  console.log(`root directory ${__dirname}`);
  console.log('server is up');
});
