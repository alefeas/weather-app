import { useEffect, useState } from "react";
import { Loader } from "./Loader.jsx";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export const WeatherInfo = () => {
    const [city, setCity] = useState('');
    const [loading, setLoading] = useState(false)

    const handleChangeCity = (event) => {
        setCity(event.target.value);
    };

    const apiKey = process.env.REACT_APP_API_KEY;
    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`;

    const [weatherData, setWeatherData] = useState(null);

    const fetchFunction = (event) => {
        if (event.key === 'Enter') {
            setLoading(true)
            fetch(apiUrl)
            .then((response) => {
                if (!response.ok) {
                    toast('🌆 LOCATION NOT FOUND', {
                        autoClose: 1500,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        theme: "dark",
                        className: "toast"
                    });
                    setLoading(false)
                    throw new Error("Network response was not ok")
                }
                return response.json();
            })
            .then((data) => {
                setWeatherData(data);
            })
            .catch((error) => {
                console.error("Error al obtener los datos:", error);
            });
            setCity('')
        }
    }

    useEffect(() => {
        setLoading(false)
    }, [weatherData])

    return (
        <div className="weatherContainer">
            <header className="titleSearchContainer">
                <h1>Weather App</h1>
                <input type="text" value={city} placeholder="Search a location..." onKeyDown={fetchFunction} onChange={handleChangeCity} />
            </header>
            {
                weatherData ?
                <div className="dataContainer">
                { !loading ?
                <div>
                        <div className="mainInfoContainer">
                            <div>
                                <h2>{weatherData.name}</h2>
                                <span className="temp">{(weatherData.main.temp - 273.15).toFixed()} C°</span>
                            </div>
                            <div className="iconDescriptionContainer">
                                <img src={`https://openweathermap.org/img/wn/${weatherData.weather[0].icon}@2x.png`} alt="" srcset="" />
                                <span>{weatherData.weather[0].main}</span>
                            </div>
                        </div>
                        <div className="extraInfoContainer">
                            <div>
                                <span>Feels Like </span>
                                <span className="number">{(weatherData.main.feels_like - 273.15).toFixed()} C°</span>
                            </div>
                            <div>
                                <span>Humidity </span>
                                <span className="number">{weatherData.main.humidity}%</span>
                            </div>
                            <div>
                                <span>Wind Speed </span>
                                <span className="number">{(weatherData.wind.speed * 3.6).toFixed()} km/h</span>
                            </div>
                            <div>
                                <span>Min Temp </span>
                                <span className="number">{(weatherData.main.temp_min - 273.15).toFixed()} C°</span>
                            </div>
                            <div>
                                <span>Max Temp </span>
                                <span className="number">{(weatherData.main.temp_max - 273.15).toFixed()} C°</span>
                            </div>
                        </div>
                </div>
                : <Loader/>
                }
                    </div>
                : 
                <div className="welcomeContainer">
                    <span className="welcomeMessage">Welcome! Search for a place and we will give you the weather in real time.</span>
                </div>
            }
        </div>
    );
};
