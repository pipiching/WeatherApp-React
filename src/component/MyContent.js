import React, { useState, createContext, useReducer } from 'react'
import Counter from './Counter';
import { useStyles } from '../App.js'
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import { findByLabelText } from '@testing-library/react';
import WeatherBox from './WeatherBox.js';

export const ContentContext = createContext({});

function MyContent() {
    const classes = useStyles();
    const gridStyle = {
        display: findByLabelText,
        justifyContent: 'space-around',
    }

    const reducer = (state, action) => {
        switch (action) {
            case 'increment': return state<5 ? state+1 : state;
            case 'decrement': return state>1 ? state-1 : state;
            default: return state
        }
    };
	const [state, dispatch] = useReducer(reducer, 1);
    const counters = Array.from({ length: state }, (_, index) => index);

    return (
		<ContentContext.Provider value={{state, dispatch}}>   
        <Container maxWidth="sm" component="main" className={classes.heroContent}>
            <Typography component="h3" variant="h3" align="center" color="textPrimary" gutterBottom>
            Weather
            </Typography>
            <div style={{display:"flex", justifyContent:"center"}}>
                <Counter /> 
            </div>
        </Container>
        <Container maxWidth="md" component="main">
            <Grid container spacing={5} style={gridStyle} alignItems='flex-end'>
                {counters.map((item) => (
                    <WeatherBox key={item}/>
                ))}
            </Grid>
        </Container>
        </ContentContext.Provider> 
    )
}

export default MyContent