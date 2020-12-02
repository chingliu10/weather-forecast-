
let input = document.querySelector("input");
let cities = [];
// let cors = "https://cors-anywhere.herokuapp.com/"

document.querySelector("button").addEventListener("click", (event) => {
    //get input
    let inputValue = input.value;
    if(inputValue.length === 0 || inputValue.length < 3){
        alertMessage("incomplete query");
    }
    else{
        //move on
        findCity(inputValue);
        inputValue = "";
    }
});


function findCity (city){

    let url =`http://dataservice.accuweather.com/locations/v1/TZ/search?apikey=Oc4WlsVEVGd0eavRbhvojDoVkvcPLFlb&q=${city}`;
    
    fetch(url)
        .then(response => response.json())
            .then(data => loopMatch(data))
                .catch(err => console.log("the error is" + err));

}



function loopMatch(x){

    if(x.length == 0){
        alertMessage("location not found");
    }
    else{
    let location = {
        name : x[0].LocalizedName,
        key : x[0].Key,

        }
    conditionApi(location);
    }
}

function conditionApi(l){
    let url = `http://dataservice.accuweather.com/currentconditions/v1/${l.key}?apikey=Oc4WlsVEVGd0eavRbhvojDoVkvcPLFlb`;
    fetch(url)
        .then(res=>res.json())
            .then(data=>{
                let condition = {
                    temperature : data[0].Temperature.Metric.Value,
                    time : data[0].IsDayTime,
                    weather : data[0].WeatherText
                }

                RenderInformation(condition, l.name);
            });
}


function RenderInformation (c, n) {

    let result = document.querySelector(".result");
    let area = document.createElement("div");
    area.classList.add("area");
    result.appendChild(area);

    if(c.time == true){
        c.time = "Day";
    }else{
        c.time = "Night"
    }

    area.innerHTML = `
        <h3>${n}</h3>
        <h3>${c.time}</h3>
        <h2>${c.temperature}&#8451;</h2>
        <h2>${c.weather}</h2>
    `;
}

function alertMessage(msg){
    
    let error = document.querySelector(".error");
    let pop = document.createElement("div");
    pop.classList.add("alert");
    pop.textContent = msg;
    error.appendChild(pop);

    setTimeout(()=>{
        pop.remove();
    }, 1800);


}






