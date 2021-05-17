import React from "react";
import {useEffect, useState} from "react";
import {Panel, PanelGroup} from "react-bootstrap";


function Home(props) {

    const [data,setdata] = useState();
    
    let country = props.location; // Default Location
    //Managing date-----------------------------------
    let today = new Date().toString();
    let date = today.slice(0,16);
    let rise = '', set = ''; 
    let sunrise = new Date(1000 * rise), sunset = new Date(1000 * set);
    let hourrise =  sunrise.getHours() % 12, hoursset = sunset.getHours() % 12;
    let minrise, minset; 
    sunrise.getTime() == 0 ? minrise = '00' : minrise = sunrise.getTime();
    sunset.getTime() == 0 ? minset = '00' : minset = sunset.getTime();
    //-------------------------------------------------

    
    useEffect(()=> {

        fetch(`http://api.openweathermap.org/data/2.5/weather?q=${country}&units=metric&APPID=e944448bace35365db9ea2b4502466f3`)
        .then(res => res.json())
        .then((items) => {
            setdata(items)
        },
        
        (error) => {
            console.log(error);
          }
        ); 
        
    },[country]); // Runs only once

   
    if(data)
    {
        {rise = data.sys.sunrise}
        {set = data.sys.sunset}

        return(
            <div>   
                <PanelGroup style = {{height: "600px"}}>
                    <Panel style = {{backgroundColor: "#272526", color: "white"}}>

                        <Panel.Heading style = {{backgroundColor: "#272526", color: "white"}}>
                            <div>
                                <img src={`http://openweathermap.org/images/flags/${data.sys.country.toLowerCase()}.png`}/>
                                <span>{data.name}, {data.sys.country}</span>
                                <br/>
                                <span id="loc">{date} </span>
                                <br/>
                                <h2>{data.main.temp}&deg;C</h2>
                                <span id = "discription">{data.weather[0].description}</span>
                                <br/>
                                <img src={`http://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`}/>
                            </div>
                        </Panel.Heading>

                        <Panel.Body style = {{backgroundColor: "#1b1818", color: "white"}}>
                            <span>Expected Weather From: {data.main.temp_min} &deg;C to {data.main.temp_max} &deg;C </span>
                            <br/>
                            <span>Sunrise: {hourrise + ":" + minrise + " AM"}  &nbsp;&nbsp; Sunset: {hoursset + ":" + minset + " PM"}</span>
                            <br/>
                            <span>Humidity: {data.main.humidity}% &nbsp; Pressure:{data.main.pressure}hPa </span>
                            <br/>
                            <span>Wind: <span>{data.wind.speed}</span> m/s</span>
                            <br/>
                            <span>Geo Location: {data.coord.lat} , {data.coord.lon}</span>                 
                        </Panel.Body>
                    </Panel>  
                </PanelGroup>

                <Panel.Footer style = {{backgroundColor: "#272526", color: "#F6694B"}}>
                            <p>Rad Eshghi &copy; <br/> BTI425 Section NAA S#123348195 </p>
                </Panel.Footer>
            </div>
        )
    }
    else 
    {
        return (<div></div>)
    };
}

export default Home;
