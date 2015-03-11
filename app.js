var express = require('express');
var path = require('path');

var app = express();

var lipsum = require("lorem-ipsum")

app.use(express.static(path.join(__dirname, 'public')));
app.get("/", function(req, res){
  res.sendFile(path.join(__dirname, 'public/index.html'))
})
app.get("/toc", function(req, res){
  res.sendFile(path.join(__dirname, 'public/index.html'))
})
app.get("/page/*", function(req, res){
  res.sendFile(path.join(__dirname, 'public/index.html'))
})

app.get("/api/toc", function(req, res){

  var page = 1
  var chapters = []

  for (var i = 0; i < 15; i++) {
    
    chapters.push({
      page: page,
      title: lipsum()
    })

    page += Math.ceil(Math.random() * 12)

  }

  res.json(chapters)

})

app.get("/api/page/:page", function(req, res){

  var randomCount = 0
  var randomSeed = (req.params.page * 1002) || 0
  var pseudoRandom = function() {
    randomCount += 1
    return Math.abs(Math.sin(randomCount + randomSeed))
  }

  var paragraphs = [
    lipsum({ count: Math.ceil(pseudoRandom() * 4) + 4, random: pseudoRandom }),
    lipsum({ count: Math.ceil(pseudoRandom() * 4) + 4, random: pseudoRandom }),
    lipsum({ count: Math.ceil(pseudoRandom() * 4) + 4, random: pseudoRandom }),
    lipsum({ count: Math.ceil(pseudoRandom() * 4) + 4, random: pseudoRandom })
  ]

  var links = [
    { 
      page: Math.ceil(Math.random() * 100),
      sentence: lipsum({ random: pseudoRandom })
    },
    {
      page: Math.ceil(Math.random() * 100),
      sentence: lipsum({ random: pseudoRandom })
    }
  ]

  res.json({
    paragraphs: paragraphs,
    links: links
  })

})

module.exports = app;
