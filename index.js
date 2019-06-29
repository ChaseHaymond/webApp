const express = require('express');
const path = require('path');
const axios = require('axios');
const cheerio = require('cheerio');

const PORT = process.env.PORT || 5000

express()
  .use(express.static(path.join(__dirname, 'public')))
  .set('views', path.join(__dirname, 'views'))
  .set('view engine', 'ejs')
  .get('/display', (req, res) => {

    console.log("----------------------------START---------------------------------------");

  	res.locals.type = req.query.type;

//  	var type = req.query.type;
//  	var weight = req.query.weight;

//  	var params = {weight: weight, type: type, cost: cost};
    
    
    var urll = req.query.enteredUrl;
    
    //var html = getHtml(urll);
    
//    console.log('Begin');
//    console.log(html);
//    console.log('end');
    
    
    
    
    axios.get(urll)
    .then(response => { 
        console.log(response.data);
        var params = {urll: urll, html: 'test'};
  	     res.render('pages/display', params);
    })
    .catch(error => {
        console.log(error);
        var params = {urll: urll, html: 'test'};
  	     res.render('pages/display', params);
    })
    
    
    
    
    

//    var params = {urll: urll, html: 'test'};
//  	res.render('pages/display', params);
  	})
  .get('/', (req, res) => {

  	res.render('pages/home')
  	})  
  .listen(PORT, () => console.log(`Listening on ${ PORT }`))




function getHtml(urlll) {
    axios.get(urlll)
    .then(response => { 
        console.log(response.data);
    })
    .catch(error => {
        console.log(error);
    })
}



