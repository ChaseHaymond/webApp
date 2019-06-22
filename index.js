const express = require('express')
const path = require('path')
const PORT = process.env.PORT || 5000

express()
  .use(express.static(path.join(__dirname, 'public')))
  .set('views', path.join(__dirname, 'views'))
  .set('view engine', 'ejs')
  .get('/display', (req, res) => {

  	// console.log(req.query.type);
  	// console.log(req.query.weight);

  	res.locals.type = req.query.type;

  	var type = req.query.type;
  	var weight = req.query.weight;

  	// console.log(type);
  	// console.log(weight);

  	// var num1 = parseInt(req.query.num1);
  	// var num2 = parseInt(req.query.num2);
  	// var params = {answer: (num1 + num2)}

  	var cost = 0;

  	if (type == "Letters (Stamped)") 
  	{
  		cost = stampedLetter(weight);
  	}
  	else if (type == "Letters (Metered)") 
  	{
  		cost = meteredLetter(weight);
  	}
  	else if (type == "Large Envelopes (Flats)") 
  	{
  		cost = largeEnvalopes(weight);
  	}
  	else if (type == "First-Class Package Service")
  	{
  		cost = packages(weight);
  	}

  	console.log(cost);

  	var params = {weight: weight, type: type, cost: cost};

  	res.render('pages/display', params)
  	})
  .get('/', (req, res) => {

  	res.render('pages/home')
  	})  
  .listen(PORT, () => console.log(`Listening on ${ PORT }`))




function stampedLetter(weight) {
	var cost = 0;

	if (weight > 3.5) 
	{
		cost = largeEnvalopes(weight);
	}
	else if (weight <= 3.5 && weight > 3) 
	{
		cost = 1.00;
	}
	else if (weight <= 3 && weight > 2) 
	{
		cost = 0.85;
	}
	else if (weight <= 2 && weight > 1) 
	{
		cost = 0.70;
	}
	else
	{
		cost = 0.55;
	}
	return cost;
}


function meteredLetter(weight) {
	var cost = 0;

	if (weight > 3.5) 
	{
		cost = largeEnvalopes(weight);
	}
	else if (weight <= 3.5 && weight > 3) 
	{
		cost = 0.95;
	}
	else if (weight <= 3 && weight > 2) 
	{
		cost = 0.80;
	}
	else if (weight <= 2 && weight > 1) 
	{
		cost = 0.65;
	}
	else
	{
		cost = 0.50;
	}

	return cost;
}



function largeEnvalopes(weight) {
	var cost = 0;

	if (weight <= 1) 
	{
		cost = 1.00;
	}
	else if (weight <= 2) 
	{
		cost = 1.15;
	}
	else if (weight <= 3) 
	{
		cost = 1.30;
	}
	else if (weight <= 4) 
	{
		cost = 1.45;
	}
	else if (weight <= 5) 
	{
		cost = 1.60;
	}
	else if (weight <= 6) 
	{
		cost = 1.75;
	}
	else if (weight <= 7) 
	{
		cost = 1.90;
	}
	else if (weight <= 8) 
	{
		cost = 2.05;
	}
	else if (weight <= 9) 
	{
		cost = 2.20;
	}
	else if (weight <= 10) 
	{
		cost = 2.35;
	}
	else if (weight <= 11) 
	{
		cost = 2.50;
	}
	else if (weight <= 12) 
	{
		cost = 2.65;
	}
	else if (weight <= 13) 
	{
		cost = 2.80;
	}

	return cost;
}


function packages(weight) {
	var cost = 0;

	if (weight <= 1) 
	{
		cost = 3.66;
	}
	else if (weight <= 2) 
	{
		cost = 3.66;
	}
	else if (weight <= 3) 
	{
		cost = 3.66;
	}
	else if (weight <= 4) 
	{
		cost = 3.66;
	}
	else if (weight <= 5) 
	{
		cost = 4.39;
	}
	else if (weight <= 6) 
	{
		cost = 4.39;
	}
	else if (weight <= 7) 
	{
		cost = 4.39;
	}
	else if (weight <= 8) 
	{
		cost = 4.39;
	}
	else if (weight <= 9) 
	{
		cost = 5.19;
	}
	else if (weight <= 10) 
	{
		cost = 5.19;
	}
	else if (weight <= 11) 
	{
		cost = 5.19;
	}
	else if (weight <= 12) 
	{
		cost = 5.19;
	}
	else if (weight <= 13) 
	{
		cost = 5.71;
	}

	return cost;
}

