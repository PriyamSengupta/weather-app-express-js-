const cityName = document.getElementById('cityName');
const submitBtn = document.getElementById('submitBtn');
const city_name = document.getElementById('city_name');
const temp = document.getElementById('temp');
const temp_status = document.getElementById('temp_status');
const day = document.getElementById('day');
const today_date = document.getElementById('today_date');

const dataHide = document.querySelector('.temp_section');

const getCurrentDay = () => {
    var weekday = new Array(7);
    weekday[0] = "Sunday";
    weekday[1] = "Monday";
    weekday[2] = "Tuesday";
    weekday[3] = "Wednesday";
    weekday[4] = "Thursday";
    weekday[5] = "Fridat";
    weekday[6] = "Saturday";
    let currentTime =  new Date();
    let currDay = weekday[currentTime.getDay()];
    return currDay;
}

const getCurrentTime = () => {
    var months = [
        "Jan",
        "Feb",
        "Mar",
        "Apr",
        "May",
        "Jun",
        "Jul",
        "Aug",
        "Sept",
        "Oct",
        "Nov",
        "Dec"
    ]
    var now = new Date();
    var month = months[now.getMonth()];
    var date = now.getDate();
    return `${date} ${month}`;
    // let hour = now.getHours();
    // let min = now.getMinutes();

    // let periods = "AM";

    // if(hour > 11)
    // {
    //     periods = "PM";
    //     if( hour > 12) hour -= 12;
    // }
    // if(min < 10)
    // {
    //     min = "0" + min;
    // }
    
    // return `${month} ${date} | ${hour}:${min} ${periods}`;
    
}

day.innerText = getCurrentDay();
today_date.innerText = getCurrentTime();


const getInfo = async(e)=>{
    e.preventDefault();
    const cityVal = cityName.value;
    if(cityVal === ""){
        city_name.innerText = `Please enter a city name`;
        dataHide.classList.add('data_hide');
    }
    else{
        try{
            let url = `http://api.openweathermap.org/data/2.5/weather?q=${cityVal}&units=metric&appid=c6c2a4ffa25d47b78e5d22bbab4b817d`;
            const response = await fetch(url);
            const data = await response.json();
            const arrData = [data];
            // console.log(arrData);
            city_name.innerText = arrData[0].name + "," +arrData[0].sys.country;
            temp.innerText = arrData[0].main.temp;
            const tempStatus = arrData[0].weather[0].main;
            // temp_status.innerText = arrData[0].weather[0].main;

            if(tempStatus == "Sunny")
                temp_status.innerHTML = "<i class='fas fa-sun' style='color: #eccc68;'>";
            else if(tempStatus == "Mist")
                temp_status.innerHTML = "<i class='fas fa-smog' style='color: #e1dcdc ; '>";
            else if(tempStatus == "Clouds")
                temp_status.innerHTML = "<i class='fas fa-cloud' style='color: #fff; '>";
            else if(tempStatus == "Rainy")
                temp_status.innerHTML = "<i class='fas fa-cloud-showers-heavy' style='color:#fff; '>";
            else if(tempStatus == "Haze")
                temp_status.innerHTML = "<i class='fas fa-cloud' style='color: #e1dcdc; '>";   
            else if(tempStatus == "Clear")
                temp_status.innerHTML = "<i class='fas fa-sun' style='color: #eccc68; '>";               
            else
                temp_status.innerHTML = "<i class='fas fa-cloud' style='color:  #e1dcdc; '>";

                dataHide.classList.remove('data_hide');    
        }
        catch{
            dataHide.classList.add('data_hide');
            city_name.innerText = `No city found`;
        }
    }
}

submitBtn.addEventListener('click', getInfo)