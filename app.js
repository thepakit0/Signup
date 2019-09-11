//jshint esversion:6
const express = require("express");
var bodyParser = require("body-parser");
var request = require("request");

const app = express();

app.use(bodyParser.urlencoded({extended: false}));

app.use(express.static("public"));  // bu static methodu ile signup.html içerisinde tanımladıgımız css ve resimler statik oldugundan
                                    // bunları onceden belirttigimiz bir klasorun icerisine koyuyoruz(public) ve node buna gore cekıyor

app.get("/",function(req,res){
  res.sendFile(__dirname+"/signup.html");
});

app.post("/",function(req,res){
  var firstName = req.body.firstName;
  var lastName = req.body.lastName;
  var eMail = req.body.eMail;

  console.log(firstName,lastName,eMail);

  var data = { // bu members'i tutan obje
    members : [    // members objelerin dizisi
      {
        email_address : eMail,
        status : "subscribed",
        merge_fields : {
          FNAME : firstName,
          LNAME : lastName,
        },

        member_rating : 5,
        vip : true,

      }
  ] ,

};

  var jsonData = JSON.stringify(data);

  var options = {
    url : "https://us4.api.mailchimp.com/3.0/lists/059d54c66f",
    method : "POST" ,
    headers : {
          "Authorization": "osmanzaim1 8fff2dcd0557a855df5379f4423161b4-us4",
    },
  body : jsonData,

  };

  request(options,function(error, response, body){
    if(response.statusCode == 200 ){

      res.sendFile(__dirname+"/success.html");
    }else {
      console.log(response.statusCode); // http status code gönderiyor mesela 404 , 400 ,  402 gibi
      res.sendFile(__dirname+"/failure.html");
    }

  });

});

app.post("/failure.html",function(req,res){
  res.redirect("/");
});




app.listen(process.env.PORT || 3000, function(req,res){
  console.log("server started at port 3000");
});

//API KEY
//8fff2dcd0557a855df5379f4423161b4-us4

//list id
//059d54c66f
