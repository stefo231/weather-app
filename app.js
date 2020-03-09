window.addEventListener('load', () => {
    let long;
    let lat;

    let temperaturDescription = document.querySelector('.temperature-description');
    let temperaturDegree = document.querySelector('.temperature-degree');
    let locationTimezone = document.querySelector('.location-timezone');
    let temperatureSection = document.querySelector('.temperature');
    const temperatureSpan = document.querySelector('.temperature span')
   

    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(position => {
            //console.log(position)
            long = position.coords.longitude;
            lat = position.coords.latitude;
            if(temperatureSpan.textContent === 'Unit'){
                temperatureSpan.textContent = 'F'
            }

            const proxy = 'https://cors-anywhere.herokuapp.com/';
            const api = `${proxy}https://api.darksky.net/forecast/73c3e8553b8c9464d1b952bd3d011a8f/${lat},${long}`;
            fetch(api)
                .then(response => {
                    return response.json()
                })
                .then(data => {
                    console.log(data)
                    const { temperature, summary, icon } = data.currently
                    //Set DOM Elements from the API

                    temperaturDegree.textContent = temperature
                    temperaturDescription.textContent = summary
                    locationTimezone.textContent = data.timezone
                    //FORMULA FOR CELSIUS
                    let CELSIUS = (temperature - 32) * (5 / 9)
                    //Set Icon
                    setIcons(icon, document.querySelector('.icon'))
                    //convert F to C

                    temperatureSection.addEventListener('click', () => {
                       
                        if (temperatureSpan.textContent === 'F') {

                            temperatureSpan.textContent = 'C';
                            temperaturDegree.textContent = Math.floor(CELSIUS)
                        } else {
                            temperatureSpan.textContent = 'F';
                            temperaturDegree.textContent = temperature
                        }
                    })

                })
        })
    }
  

    function setIcons(icon, iconID) {
        const skycons = new Skycons({ color: "white" });
        const currentIcon = icon.replace(/-/g, "_").toUpperCase();
        skycons.play();
        return skycons.set(iconID, Skycons[currentIcon])
    }

})