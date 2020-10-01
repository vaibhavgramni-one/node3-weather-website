const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require('./utils/geocode.js')
const forecast = require('./utils/forecast.js')


// creating an application..//
const app = express()


const port = process.env.PORT || 3000 

// Setup express static directory to server....//
app.use(express.static(path.join(__dirname , '../public')))


//.. Setup handlebars engine and views location...//
app.set('view engine' , 'hbs')
app.set('views' , path.join(__dirname , '../templates/views'))
hbs.registerPartials(path.join(__dirname ,'../templates/partials'))


// .. creating routes to different URL...//
app.get('' , (req, res) => {
    res.render('index' , {
        title : 'Weather',
        name : 'Vaibhav Gramni'
    })
})

app.get('/about' , (req , res) => {
    res.render('about' , {
        title : 'About Page',
        name : 'Vaibhav Gramni'
    })
})

app.get('/help' , (req, res) => {
    res.render('help' , {
        title : 'Help Page',
        message : 'Please reach out to about page for any help',
        name : 'Vaibhav Gramni'
    })
})

app.get('/weather' , (req ,res) => {
    if(!req.query.address){
        return res.send('Please provide address in the query string!!')
    }

    const address = req.query.address

    geocode(address , (error , geocast) => {
        if(error) {
            return res.send({
                error
            })
        }
        forecast(geocast.latitude , geocast.longitude ,  (error , forecast) => {
            if(error){
                return res.send({
                    error
                })
            }
          
            res.send({
                location: geocast.location,
                forecast: forecast,
                address : req.query.address
            })
        })    
    })

})

// example route..//
app.get('/products' , (req , res) => {
    console.log(req.query)
    res.send({
        product : []
    })
})

app.get('/help/*' , (req , res) => {
    res.render('404' , {
        name : 'Vaibhav Gramni',
        title : '404',
        message : 'Help article not found.'
    })
})

app.get('*' , (req , res) => {
    res.render('404' , {
        name : 'Vaibhav Gramni',
        title : '404',
        message : 'Page not found'
    })
})



app.listen(port , () =>{
    console.log('Server is up and running at port : ', port)
})

