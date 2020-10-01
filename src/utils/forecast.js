const request = require('request')

const forecast = (latitude , longitude , callback) =>{
    const url = `http://api.weatherstack.com/current?access_key=e9967d1b7deb78e1c268174878abf6dd&query=${latitude},${longitude}`

    request({ url : url , json : true} , (error , response) => {
        if(error){
            callback('Unable to retrive info for weather' , undefined)
        }
        else if(response.body.error) {
            console.log(response.body.error)
            callback('Really .Please provide correct details' , undefined)
        }
        else
        {
            const temp = response.body.current.temperature
            const feelsLike = response.body.current.feelslike
            callback(undefined , `${response.body.current.weather_descriptions[0]}. The temperature is ${temp} but it feels like ${feelsLike}`)
        }
    })
}



module.exports = forecast