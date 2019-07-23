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

        let getData = html => {
          
          const $ = cheerio.load(html);

          //image stuff
          pageName = [];
          imageName = [];

          $('img.ProfileAvatar-image').each((i, elem) => {//$('p.TweetTextSize').each((i, elem) => {
            imageName.push({
            	name: $(elem).attr('src'),
             	picture: $(elem).attr('alt')
              //Date : $(elem).find('strong').attr("class": "fullname show-popup-with-id u-textTruncate"),
            });
          });

          var nameStr = JSON.stringify(pageName);
          var jsonNameStr = "{\"name\":" + nameStr + "}"; //format the string
          var nameObj = JSON.parse(jsonNameStr); //turn it to json obj

          var picStr = JSON.stringify(imageName);
          var jsonPicStr = "{\"picture\":" + picStr + "}"; //format the string
          var picObj = JSON.parse(jsonPicStr); //turn it to json obj


          //DATE STUFF
          dateData = [];

          $('a.tweet-timestamp').each((i, elem) => {//$('p.TweetTextSize').each((i, elem) => {
            dateData.push({
              date: $(elem).text()
            });
          });

          var dateStr = JSON.stringify(dateData);
          var jsonDateStr = "{\"date\":" + dateStr + "}"; //format the string
          var dateObj = JSON.parse(jsonDateStr); //turn it to json obj


          // tweet data
          data = [];

          $('div.js-tweet-text-container').each((i, elem) => {//$('p.TweetTextSize').each((i, elem) => {
            data.push({
              text: $(elem).text()
            });
          });


          fs.writeFile('tweetData.json', 
              JSON.stringify(data), 
              (err)=> console.log('File successfully written!'))


          var str = JSON.stringify(data);
          var jsonStr = "{\"tweet\":" + str + "}"; //format the string
          var obj = JSON.parse(jsonStr); //turn it to json obj

          var tweets = []
          for(var i in obj.tweet) {
          	//console.log(obj.tweet[i].text); //print out the tweets
          	tweets.push(dateObj.date[i].date);
          	tweets.push(obj.tweet[i].text);
          }


          var params = {urll: urll, html: tweets, picture: picObj.picture[0].picture, name: nameObj.name[0].name};
          res.render('pages/display', params);
        }

        getData(response.data);
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




