const express = require ("express");
const app = express();
const request = require ("request");
const moment  = require('moment');
app.set("view engine","ejs");
app.get("/",function(req,res){
    res.render("search");
});
app.use(express.static(__dirname+"/public"));
app.get("/results",function(req,res){
    request("https://api.openweathermap.org/data/2.5/weather?q="+ req.query.name + "&appid=6cd4a3259a6fcac177c1968616658d71&units=metric",function(error,response,body){
        if(!error && response.statusCode == 200){
             var data = JSON.parse(body);
             //-----
              data.dt = moment.unix(data.dt).format("LLLL");
              //----
     
             res.render("result",{data:data});
        } else {
             console.log(error);
        }});
});
app.listen(process.env.PORT,process.env.IP,function(){
    console.log("Running !");
});
