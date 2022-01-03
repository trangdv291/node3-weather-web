const input = document.getElementById('input')
const search = document.getElementById('search')
const mess1 = document.getElementById('mess1')
const mess2 = document.getElementById('mess2')
const mess3 = document.getElementById('mess3')

search.addEventListener('click', (e)=>{
    e.preventDefault();
    const location = input.value;
    mess1.textContent = 'Loading'
                mess2.textContent = ''
    
    fetch ('/weather?address=' + location).then((response) => {
    
        response.json().then((data) => {
            if (data.error) {
                mess1.textContent = data.error
            } else {
                mess1.textContent = 'Location:' + data.location + ', ' + data.country
                mess2.textContent = 'Forecast:' + data.forecast 
                mess3.textContent = 'Temperature is ' + data.temp + ' degree but it feels like: ' + data.feelslike + ' degree'
                input.value = ''
                
                
                
        console.log(data)}
    }) 
})
})

