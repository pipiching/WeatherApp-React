import { useState, useEffect, useCallback } from 'react';

const fetchCurrentWeather = (locationName) => {
    return fetch(
        `https://opendata.cwb.gov.tw/api/v1/rest/datastore/O-A0003-001?Authorization=CWB-D9974A4D-F4C9-4161-93A6-27B3FB3F4AFE&locationName=${locationName}`
        )
        .then((response) => response.json())
        .then((data) => {
            const locationData = data.records.location[0];
            const weatherElements = locationData.weatherElement.reduce(
                (needElements , item) => {
                    if (['WDSD', 'TEMP', 'HUMD'].includes(item.elementName)) {
                        needElements [item.elementName] = item.elementValue;
                    }
                    return needElements;
                },
                {}
            );
            return {              
                observationTime: locationData.time.obsTime,
                temperature: weatherElements.TEMP,
                windSpeed: weatherElements.WDSD,
                humidity: weatherElements.HUMD,
                moment: new Date(locationData.time.obsTime).getHours() >= 6 || 
                    new Date(locationData.time.obsTime).getHours() < 18 ?
                    'day' : 'night'
            }  
        });
};
const fetchWeatherForecast = (cityName) => {
    return fetch(
        `https://opendata.cwb.gov.tw/api/v1/rest/datastore/F-C0032-001?Authorization=CWB-D9974A4D-F4C9-4161-93A6-27B3FB3F4AFE&locationName=${cityName}`
    )
    .then((response) => response.json())
    .then((data) => {
        const locationData = data.records.location[0];
        const weatherElements = locationData.weatherElement.reduce(
            (neededElements, item) => {
            if (['Wx', 'PoP', 'CI'].includes(item.elementName)) {
                neededElements[item.elementName] = item.time[0].parameter;
            }
            return neededElements;
            },
            {}
        );
        return {             
            description: weatherElements.Wx.parameterName,
            weatherCode: weatherElements.Wx.parameterValue,
            rainPossibility: weatherElements.PoP.parameterName,
            comfortability: weatherElements.CI.parameterName,
        }
    });
};

const useWeatherApi = (currentLocation) => {
    const [weatherElement, setweatherElement] = useState({
        observationTime: new Date().toString(),
        humidity: 0,
        temperature: 0,
        windSpeed: 0,
        description: '',
        weatherCode: 0,
        rainPossibility: 0,
        comfortability: '',
        buttonText: 'Get started',
        buttonVariant: 'contained',
        moment: 'day',
        isLoading: true,
    }); 
    const { cityName, locationName, sunriseCityName } = currentLocation

    const fetchData = useCallback(() => {
        const fetchingData = async () => {
            const [currentWeather, weatherForecast] = await Promise.all([
                fetchCurrentWeather(locationName),
                fetchWeatherForecast(cityName),
            ]);
            setweatherElement( (prevState) => (
                {
                    ...prevState,
                    ...currentWeather,
                    ...weatherForecast,
                    isLoading: false
                }
            )); 
        };

        setweatherElement( (prevState) => ({...prevState, isLoading: true}));
        fetchingData();
    }, [locationName, cityName])

    useEffect( () => {     
        fetchData();
    }, [fetchData])

// STEP 5：把要給其他 React 組件使用的資料或方法回傳出去
    return [weatherElement, fetchData];
};

export default useWeatherApi;