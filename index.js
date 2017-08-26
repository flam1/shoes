var express = require('express')
var fs = require('fs')
var request = require('request')
var cheerio = require('cheerio')

var app = express()

app.get('/scrape/:category', function(req, res){
  var url = 'https://stockx.com/sneakers/' + req.params.category

  request(url, function(error, response, html){
    if (!error) {
      var $ = cheerio.load(html)

      var imageHref = ''

      var shoes = $('.img')
      var shoe = shoes[Math.random() * shoes.length | 0]
      console.log((shoe))
      
      if(!shoe.children){
        res.status(400).send('error')
      }

      res.status(200).send({src: shoe.children[1].attribs.src})
    }
  })
})

app.listen(process.env.PORT || 8081)

console.log('Listening...')

exports = module.exports = app
