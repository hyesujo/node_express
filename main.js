const express = require('express');
var fs = require('fs');
var template = require('./lib/template.js');
const app = express()
var sanitizeHtml = require('sanitize-html');
var path = require('path');
var qs = require('querystring');
var bodyParser = require('body-parser');
var compression =require('compression');
var topicRouter = require("./routes/topic");
var homeRouter = require("./routes/home");
var helmet = require("helmet");
port = 3000

app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended:false}));
app.use(compression());
app.get('*', function(req, res, next){
  fs.readdir('./data', function(error, filelist){
    req.list = filelist;
    next();
  });
});
app.use("/topic", topicRouter); 
app.use("/", homeRouter);
app.use(helmet());

//get -> route,routhing(경로를 설정해준다.)

  app.use((req, res, next) => {
    res.status(404).send("sorry cant find that!");
  });
   
  app.use(function(err, req, res, next) {
    console.error(err)
    res.status(500).send("Something broke!");
  })

app.listen(port, () => {
  console.log('Example app listening at http://localhost:${port}')
});


