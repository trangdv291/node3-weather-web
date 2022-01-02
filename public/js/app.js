const input = document.getElementById('input')
const search = document.getElementById('search')
const mess1 = document.getElementById('mess1')
const mess2 = document.getElementById('mess2')

search.addEventListener('click', (e)=>{
    e.preventDefault();
    const location = input.value;
    mess1.textContent = 'Loading'
                mess2.textContent = ''
    
    fetch ('http://localhost:3000/weather?address=' + location).then((response) => {
    
        response.json().then((data) => {
            if (data.error) {
                mess1.textContent = data.error
            } else {
                mess1.textContent = 'Location:' + data.location
                mess2.textContent = 'Forecast:' + data.forecast 
                input.value = ''
                
                
                
        console.log(data)}
    }) 
})
})

