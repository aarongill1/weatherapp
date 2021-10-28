import './pagestyles.css'
import { useState } from "react";

const App = () => {
  const [city, setCity] = useState("");
  const [temp, setTemp] = useState("");
  const [searchCompleted, setSearchCompleted] = useState(false);

  const getTemp = () => {
    fetch(`http://api.openweathermap.org/data/2.5/weather?q=${city || "london"}&appid=${process.env.REACT_APP_API_KEY}&units=metric`)
      .then(json => json.json())
      .then(json => {
        setTemp(json.main.temp);
        setCity(json.name);
      })
      .catch(err => console.log(err))
  }
  return (
    <div className="container">
      <h1>What's the Fucking Temperature?!?</h1>
      <form>
        <input type="text" value={city} placeholder="city" onChange={e => {
          setSearchCompleted(false);
          setCity(e.target.value);
        }
        }/>
        <button onClick={e => {
          e.preventDefault();
          getTemp();
          setCity("");
          setSearchCompleted(true);
        }}>Click
        </button>
      </form>
      {searchCompleted &&
      <div>
        <h2>The temperature in {city} is:</h2>
        <h1>{temp}</h1>
      </div>
      }
    </div>
  )
}

export default App;
