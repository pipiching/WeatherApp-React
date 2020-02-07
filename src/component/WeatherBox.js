import React, { useState, createContext, useReducer } from 'react'
import useWeatherApi from './useWeatherApi.js';
import Counter from './Counter';
import { useStyles } from '../App.js'
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import WeatherSetting from './WeatherSetting'
import WeatherCard from './WeatherCard'
import { findLocation } from '../utils.js';
import { findByLabelText } from '@testing-library/react';

export const WeatherContext = createContext({});

function WeatherBox() {
    const [currentPage, setCurrentPage] = useState('WeatherCard');
    
    const [currentCity, setCurrentCity] = useState('臺北市');
    const currentLocation = findLocation(currentCity) || {};

    const [weatherElement, fetchData] = useWeatherApi(currentLocation);

    return (
        <WeatherContext.Provider value={{setCurrentPage, weatherElement, fetchData, currentCity, setCurrentCity}}>
            <Grid item xs={12} sm={6} md={4} >
                {currentPage === 'WeatherCard' && (<WeatherCard />)}
                {currentPage === 'WeatherSetting' && (<WeatherSetting />)}                    
            </Grid>
        </WeatherContext.Provider>
    )
}

export default WeatherBox;