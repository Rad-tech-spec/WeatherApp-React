import React from "react";
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { Button, PanelGroup, Panel, Alert } from "react-bootstrap";
import { MDBIcon } from 'mdbreact';


function Search(props) {

    const [data, setdata] = useState([]);
    const [pageResultData, setpageResultData] = useState([]);
    const [PageNum, setPageNum] = useState(1);
    var { searchId } = useParams();


    const getData = async (city) => 
    {
        const result = await axios.get(`http://api.openweathermap.org/data/2.5/find?q=${city}&units=metric&cnt=50&APPID=e944448bace35365db9ea2b4502466f3`)

        console.log(result);
        setdata(result.data.list)
        setpageResultData(paginate(result.data.list, 3));
    }


    useEffect(() => {
        getData(searchId);
    }, [searchId]); // Runs Only once


    const layout = (x, y) => 
    {
        return (
            <div>
                <PanelGroup style={{ height: "auto", overflow: "auto"}}>
                    <Panel onClick={i => props.addViews(x.id)} style={{ backgroundColor: "#272526"}}>

                        <Panel.Heading style={{ backgroundColor: "#272526", color: "white"}}>
                                <div>
                                    <img src={`http://openweathermap.org/images/flags/${x.sys.country.toLowerCase()}.png`} />
                                    <span>  {x.name}, {x.sys.country}</span>
                                    <p>Feels like {x.main.feels_like}&deg;C, {x.weather[0].description}. {x.weather[0].main} </p>
                                    <h3>{x.main.temp}&deg;C</h3>
                                    <img src={`http://openweathermap.org/img/wn/${x.weather[0].icon}@2x.png`} />
                                
                                </div>

                            <Panel.Title toggle style={{ backgroundColor: "#272526", color: "#F6694B" }}>
                                <MDBIcon icon="angle-double-down" />
                            </Panel.Title>

                        </Panel.Heading>

                        <Panel.Body collapsible style={{ backgroundColor: "#1b1818", color: "white" }}>
                            <span>Expected Weather From: {x.main.temp_min} &deg;C to {x.main.temp_max} &deg;C </span>
                            <br/>        
                            <span>Humidity: {x.main.humidity}% &nbsp; Pressure:{x.main.pressure}hPa</span>
                            <br/>
                            <span>Wind: {x.wind.speed} m/s</span>
                            <br/>
                            <span>Geo Location: {x.coord.lat} , {x.coord.lon}</span>
                        </Panel.Body>
                    </Panel>
                </PanelGroup>
            </div>
        )
    }


    const pages = (x, y) => 
    {
        return (
            <Button active={y + 1 == PageNum} onClick={i => { setPageNum(y + 1) }}>  {y + 1} </Button>
        )
    }

    if (data.length > 0 && pageResultData.length > 0) 
    {
        return (
            <div>
                {Array.from(pageResultData[PageNum - 1]).map(layout)}
                {pageResultData.map(pages)}
            </div>
        );
    }
    else 
    {
        return (<Alert style={{color:"red"}}> <h2> Cant find result! </h2> </Alert>)
    }
}


function paginate(res, size) 
{
    let pages;
    if ((res.length / size) > 0.1 && (res.length / size) < 0.5)
        pages = 1;
    else
        pages = Math.round(res.length / size)


    let values = []; // Holds 3 value for each index 

    for (let i = 1; i <= pages; ++i) 
    {
        var start = Math.round(size * (i - 1));   
              
        values.push(res.slice(start, start + size));
    }

    return values;
}

export default Search;