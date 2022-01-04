var express = require("express");
var app = express();
app.use(express.static("public"));
var request = require("request");
var data;
// var bodyParser = require("body-parser");
// app.use(bodyParser.urlencoded({extended :true}));

app.set("view engine","ejs");

app.get("/",function(req,res){
	var url = "https://pomber.github.io/covid19/timeseries.json";
	request(url,function(error,response,body){
		 if (!error && response.statusCode == 200){
		   data = JSON.parse(body);
		   res.render("home",{data: data});
			 
		 }
	
	})
})
app.get("/search",function(req,res){
	var mycountry = req.query.country;
	var mydate = req.query.date;
	if(mydate.charAt(5) == "0"){
		var mydate1=mydate.substring(0,5) ;
		var mydate2 = mydate.substring(5).replace(/0/g, "");
		mydate = (mydate1 + mydate2);
	}
	
	var url = "https://pomber.github.io/covid19/timeseries.json";
	request(url,function(error,response,body){
		 if (!error && response.statusCode == 200){
		   data = JSON.parse(body);
		   res.render("results",{data: data , mycountry: mycountry , mydate: mydate});
			 
		 }
	});
 });
// app.get("/countries",function(req,res){
// 	console.log(Object.keys(data));
// })

app.listen(process.env.PORT || 8000,function(){
	console.log("Server Started...");
});