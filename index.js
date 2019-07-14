const express = require('express');
const path = require('path');
const axios = require('axios');
const cheerio = require('cheerio');
const fs = require('fs');

const PORT = process.env.PORT || 5000

express()
  .use(express.static(path.join(__dirname, 'public')))
  .set('views', path.join(__dirname, 'views'))
  .set('view engine', 'ejs')
  .get('/display', (req, res) => {

    console.log("----------------------------START---------------------------------------");

  	res.locals.type = req.query.type;

    
    
    var urll = req.query.enteredUrl;
    
    
    axios.get(urll)
    .then(response => { 
        // console.log(response.data);
        //var params = {urll: urll, html: response.data};
        //var params = {urll: urll, html: cheerio.load(response.data)};
        let getData = html => {
          data = [];
          const $ = cheerio.load(html);

          $('p.TweetTextSize').each((i, elem) => {
            data.push({
              text: $(elem).text()
              //Author : $(elem).find('strong').attr("fullname show-popup-with-id u-textTruncate").text()
              //Date : $(elem).find('strong').attr("class": "fullname show-popup-with-id u-textTruncate"),
              //Tweet : $(elem).text()
            });
          });
          // console.log("HERE--------------------------------HERE");
          // console.log(data);


          fs.writeFile('tweetData.json', 
              JSON.stringify(data), 
              (err)=> readFile())//console.log('File successfully written!'))


          var str = JSON.stringify(data);

          var jsonStr = "{\"tweet\":" + str + "}";

          var obj = JSON.parse(jsonStr);

          for(var i in obj.tweet) {
          	console.log(obj.tweet[i].text);
          }

          // console.log(obj.tweet[0].text);


     

          var params = {urll: urll, html: str};
          res.render('pages/display', params);
        }

        getData(response.data);


        // var params = {urll: urll, html: response.data};
  	     // res.render('pages/display', params);
    })
    .catch(error => {
        console.log(error);
        var params = {urll: urll, html: 'Error'};
  	     res.render('pages/display', params);
    })
    
    //https://blog.bitsrc.io/https-blog-bitsrc-io-how-to-perform-web-scraping-using-node-js-5a96203cb7cba
    //https://dev.to/aurelkurtula/introduction-to-web-scraping-with-nodejs-9h2
    
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

function readFile() {
	// fs.readFile('./tweetData.json', 'utf8', (err, jsonString) => {
	//     if (err) {
	//         console.log("Error reading file from disk:", err)
	//         return
	//     }
	//     try {
	//         const customer = JSON.parse(jsonString)
	//         console.log("Tweet is:", customer.text) // => "Customer address is: Infinity Loop Drive"} catch(err) {
	//     } catch(err) {
 //        	console.log('Error parsing JSON string:', err)
 //    	}
	// })
}



