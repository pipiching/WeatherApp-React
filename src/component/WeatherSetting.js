import React, { useState, useRef, useContext } from 'react';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardHeader from '@material-ui/core/CardHeader';
import Typography from '@material-ui/core/Typography';
import { Button } from '@material-ui/core';
import { availableLocations } from '../utils';
import { WeatherContext } from './WeatherBox';

const locations = availableLocations.map( (location) => location.cityName );

const WeatherSetting = () => {
    const { setCurrentPage, currentCity, setCurrentCity } = useContext(WeatherContext);
    const [locationName, setLocationName] = useState(currentCity);

    const handleChange = (e) => {
        setLocationName(e.target.value)
    }
    const handleSave = () => {
        setCurrentCity(locationName);
        setCurrentPage('WeatherCard');
    }

    return (        
        <Card >
            <CardHeader title={'設定'} />
            <CardContent>
                <Typography align="left" color="textPrimary">
                    地區           
                </Typography>
                <Typography align="left" color="textPrimary">
                    <select style={{width:250, height:30}} onChange={handleChange} value={locationName}>
                        {locations.map(location => (
                            <option value={location} key={location}>{location}</option>
                        ))}
                    </select>            
                </Typography>
            </CardContent>
            <CardActions>            
                <Button fullWidth variant='contained' onClick={() => setCurrentPage('WeatherCard')}>
                    返回
                </Button>            
                <Button fullWidth variant='contained' color="primary" onClick={handleSave} >
                    儲存
                </Button>
            </CardActions>
        </Card>
    );
};

export default WeatherSetting;