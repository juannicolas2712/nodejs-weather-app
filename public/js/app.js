const yomamma = location => {
    fetch('http://localhost:3000/weather?address=' + location)
    .then(response=>{
        response.json()
            .then(data=>{
                if(data.error){
                    console.log(data.error)
                    locationMsg.innerHTML = ''
                    errorMsg.innerHTML = data.error
                } else{
                    console.log(data.location)            
                    console.log(data.forecast)
                    errorMsg.innerHTML = ''  
                    locationMsg.innerHTML = data.location
                    locationMsg.innerHTML+= '<br>'
                    locationMsg.innerHTML+= data.forecast
                }
            })
    })
    .catch(error=>{
        console.log(error)
    })
}

const weatherForm = document.querySelector('form')
const locationMsg = document.querySelector('.location')
const errorMsg = document.querySelector('.error')

weatherForm.addEventListener('submit', e => {
    e.preventDefault();
    const location = weatherForm.location.value
    console.log(location)
    weatherForm.location.value = 'Loading...'
    yomamma(location)
    weatherForm.location.value = ''
})