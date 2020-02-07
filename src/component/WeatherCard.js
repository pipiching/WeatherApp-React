import React, { useContext, useState } from 'react'
import { useStyles } from '../App.js'
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardHeader from '@material-ui/core/CardHeader';
import StarIcon from '@material-ui/icons/StarBorder';
import Typography from '@material-ui/core/Typography';
import WeatherIcon from './WeatherIcon'
import { WeatherContext } from './WeatherBox';

import { ReactComponent as RedoIcon } from '../images/redo.svg';
import { ReactComponent as HumidIcon } from '../images/humid.svg';
import { ReactComponent as WindSpeedIcon } from '../images/windspeed.svg';
import { ReactComponent as LoadingIcon } from '../images/loading.svg';
import { ReactComponent as CogIcon } from '../images/cog.svg';

const WeatherCard = () => {
    console.log('--- invoke function component ---');
    const classes = useStyles(); 
    const { setCurrentPage, weatherElement, fetchData, currentCity } = useContext(WeatherContext);
    const [subheader, setSubheader] = useState('');

    const {
        observationTime,
        humidity,
        temperature,
        windSpeed,
        description,
        weatherCode,
        rainPossibility,
        comfortability,
        buttonText,
        buttonVariant,
        moment,
        isLoading,      
    } = weatherElement

    return (
        <Card>
            {console.log(weatherCode)}
            <CardHeader 
                title={currentCity}
                subheader={subheader}
                titleTypographyProps={{ align: 'center' }}
                subheaderTypographyProps={{ align: 'center' }}
                action={subheader ? <StarIcon /> : null}
                className={classes.cardHeader}
                onClick={() => subheader==='' ? setSubheader('Main') : setSubheader('')}
            />
            <CardContent>                   
            <Typography style={{display: 'flex',justifyContent:'space-between'}} component="h6" align="left" color="textPrimary">         
                {description}
                <CogIcon className={classes.icon} onClick={() => setCurrentPage('WeatherSetting')} />  
            </Typography>
            <div className={classes.cardWeather}>
                <Typography component="h4" variant="h4" color="textPrimary">
                    {temperature}
                </Typography>
                <Typography variant="h6" color="textSecondary">
                    &deg;C
                </Typography>           
                <WeatherIcon 
                    currentWeatherCode={weatherCode} 
                    moment={moment} 
                />
            </div>
            <ul>
                <Typography component="li" variant="subtitle1" align="left" >
                    <WindSpeedIcon className={classes.icon}/>
                    {windSpeed} m/h
                </Typography>
                <Typography component="li" variant="subtitle1" align="left">
                    <HumidIcon className={classes.icon}/>
                    {humidity} %
                </Typography>
                <Typography component="li" variant="subtitle1" align="right" >
                    最後觀測時間:{new Intl.DateTimeFormat('zh-TW', {
                    hour: 'numeric',
                    minute: 'numeric',
                }).format(new Date(observationTime))}{' '}
                    {   
                        isLoading ? 
                        <LoadingIcon className={classes.redo}/>
                        : <RedoIcon className={classes.redo} onClick={ fetchData } />
                    }
                    
                </Typography>                           
            </ul>
            </CardContent>
            <CardActions>
            <Button fullWidth variant={buttonVariant} color="primary">
                {buttonText}
            </Button>
            </CardActions>
        </Card>
    )
}

export default WeatherCard;