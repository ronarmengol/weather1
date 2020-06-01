const express = require("express");
const https = require ("https");
const app = express();
const bodyParser = require("body-parser");

app.use(bodyParser.urlencoded({extended: true}));

app.get("/", function(req, res) {
    res.sendFile(__dirname + "/index.html");

});

app.post("/", function(req, res) {
    
    const query = req.body.cityName;
    const apiKey = "422962c4d51a923da6eca8291a14d7cc"
    const unit = "metric";

    const url = "https://api.openweathermap.org/data/2.5/weather?q=" + query + "&appid=" + apiKey + "&units=" + unit;
    https.get(url, function (response) {
        console.log(response.statusCode);
    
        response.on("data", function(data) {
            const weatherData = JSON.parse(data);
        
            const temp = weatherData.main.temp;
            console.log("temp " + temp);
            const description = weatherData.weather[0].description;
            console.log("description " + description);
            const icon = weatherData.weather[0].icon;
            const imageURL = "http://openweathermap.org/img/wn/" + icon + "@2x.png";
        
        
            res.write("<p>The weather is currently " + description + "</p>");
            res.write("<h1>The temperature in " + query + " is " + temp + "</h1>");
            res.write("<img src=" + imageURL + ">");
            res.send();
    });
});
});



app.listen(process.env.PORT || 3000, function () {
    console.log("Server is running on port 3000.");
});