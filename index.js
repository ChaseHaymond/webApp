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


  	res.locals.type = req.query.type;

//  	var type = req.query.type;
//  	var weight = req.query.weight;

//  	var params = {weight: weight, type: type, cost: cost};
    
    
    var url = req.query.url;
    
    var html = getHtml(url);
    
    console.log('Begin');
    console.log(html);
    console.log('end');

    var params = {url: url, html: html};
  	res.render('pages/display', params)
  	})
  .get('/', (req, res) => {

  	res.render('pages/home')
  	})  
  .listen(PORT, () => console.log(`Listening on ${ PORT }`))




function getHtml(url) {
    
    
    return axios.get(url)
    .then(response => { 
        console.log(response.data);
//        return response.data;
    })
    .catch(error => {
        console.log(error);
//        return 'error getting HTML from entered URL';
    })
}




