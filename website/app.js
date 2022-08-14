/* Global Variables */
const baseURL = 'https://api.openweathermap.org/data/2.5/weather?'
const API_KEY = '&appid=339706ad2f2c34c3e0ac172484e163b8&units=imperial';
// Create a new date instance dynamically with JS
let d = new Date();
let newDate = d.getMonth() + 1 + "/" + d.getDate() + "/" + d.getFullYear();
// Intializing Selectors
const zipSelector = document.getElementById('zip');
const feelingSelector = document.getElementById('feelings');
const buttonSelector = document.getElementById('generate');
const dateHolder = document.getElementById('date');
const tempHolder = document.getElementById('temp');
const feelingsHolder = document.getElementById('content');
// Event listener for button
buttonSelector.addEventListener('click', () => {
    const zipcode = 'zip=' + zipSelector.value;
    getWeather(baseURL, zipcode, API_KEY)
    .then((response)=>{
        postWeather('/all', {date: newDate, temp: response.main.temp, feeling: feelingSelector.value})
    })
    .then(()=>{
      updateUI();
    } 
    )
});
// Intializing getWeather function
const getWeather = async (baseURL, zipcode, key,) => {
    const response = await fetch(baseURL+ zipcode + key)
    try {
        const data = await response.json();
        return data;
      }  catch(error) {
        console.log("error", error);
        // appropriately handle the error
      }
};
// Intializing postWeather function
const postWeather = async (url, data= {})=> {
    const response = await fetch(url, {
        method: 'POST', // *GET, POST, PUT, DELETE, etc.
        credentials: 'same-origin', 
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data), // body data type must match "Content-Type" header        
      });
    try {
        const data = await response.json();
        console.log(data);
        return data;
      }  catch(error) {
        console.log("error", error);
        // appropriately handle the error
      }
};
// Intializing updateUI function
const updateUI = async ()=> {
    const request = await fetch('/all');
 try {
 // Transform into JSON
 const allData = await request.json()
 console.log(allData);
 // Write updated data to DOM elements
 document.getElementById('temp').innerHTML = Math.round(allData.temp)+ ' degrees';
 document.getElementById('content').innerHTML = allData.feeling;
 document.getElementById('date').innerHTML =allData.date;
 }
 catch(error) {
   console.log('error', error);
   // appropriately handle the error
 }
}