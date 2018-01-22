var express = require('express')
var fs = require('fs')
var request = require('request')
var cheerio = require('cheerio')
var cors = require('cors')

var app = express()
app.use(cors())

app.get('/scrape/:category', function(req, res){
  var url = 'https://stockx.com/sneakers/' + req.params.category

  request(url, function(error, response, html){
    if (!error) {
      var $ = cheerio.load(html)

      // var shoes = $('.img')
      // var shoe = shoes[Math.random() * shoes.length | 0]

      let shoes = []

      let dump = $('.img').each((i, shoe) => {
        console.log(shoe)
        if (shoe && shoe.children) {
          shoes.push({
            name: shoe.children[1].attribs.alt,
            src: shoe.children[1].attribs['data-cfsrc']
          })
        }
      })

      console.log(shoes)
      res.status(200).send({shoes: shoes})
    }
  })
})

app.listen(process.env.PORT || 8081)

console.log('Listening...')

exports = module.exports = app
