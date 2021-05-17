import React from "react";
import { useState } from "react";
import { Route, Switch } from "react-router-dom";
import Navbar from './components/Navbar'
import Search from "./components/Search";
import Home from "./components/Home";
import './App.css';


function App(props) {

    const [Views, setViews] = useState([]);
    

    const addViews = (id) => 
    {
        if (!Views.includes(id)) 
        {
            Views.push(id)
        }

        setViews([...Views]);
    }

    return (
        <div className="App">

            <Navbar Views={Views}/>

            <Switch>
                <Route path="/city/:searchId" children = {<Search addViews={addViews} />}/>
                <Route path="/" children = { <Home location={"Toronto,ca"} />} />
            </Switch>

        </div>
    );
}

export default App;
