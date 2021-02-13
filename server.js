const express=require('express');
const hbs=require('hbs');
var app = express();
var fs = require('fs');

//set static
app.use(express.static(`${__dirname}/public`));
app.set('view engine','hbs');
hbs.registerPartials(`${__dirname}/views/partials`);

hbs.registerHelper('upperCase',(text)=>{
     return text.toUpperCase();
});
hbs.registerHelper('currentDate',()=>{
    return new Date().getFullYear();
})

app.use((req,res,next)=>{
    var log = `${new Date()} ${req.method} ${req.url}`;
    fs.writeFileSync('server.log',log);
    next();
})

app.use((req,res,next)=>{
     res.render('offline.hbs');
})

app.get('/',(req,res)=>{
   res.send({
       pageTitle:'Home',
       currentDate:new Date().getFullYear()
   })
})

app.get('/about',(req,res)=>{
    res.render('about.hbs',{
        pageTitle:'About'
    })
})

app.listen(3000,()=>{
    console.log('server run on port 3000');
});