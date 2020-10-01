const request = require('request')


const geocode = (address , callback) => {
    
    const url = "https://api.mapbox.com/geocoding/v5/mapbox.places/"+ address +".json?access_token=pk.eyJ1IjoidmdyYW1uaSIsImEiOiJja2ZtNjN5cmMwMmRsMnpwbDN4amZ5czE5In0.wSN7y72upmm90XSKCr9fRQ&limit=1"

    request({ url : url , json : true} , (error , response) => {
        if(error){
            callback('Unable to retrieve coordinates!' , undefined)
        }
        else if(response.body.features.length === 0)
        {
            callback('Please provide correct details! or try another search' , undefined)
        }
        else{
            callback(undefined , {
                location : response.body.features[0].place_name,
                latitude : response.body.features[0].center[1],
                longitude : response.body.features[0].center[0]
            })
        }
    })

}


module.exports = geocode