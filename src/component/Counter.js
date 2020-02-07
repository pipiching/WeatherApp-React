import React, { useReducer, useContext } from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import { ContentContext } from './MyContent';

function Counter() {
	const {dispatch} = useContext(ContentContext);
	const useStyles = makeStyles({
		root: {
			background: props =>
			props.color === 'red' ? 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)' : 'linear-gradient(45deg, #2196F3 30%, #21CBF3 90%)',
			border: 0,
			borderRadius: 16,
			boxShadow: props =>
			props.color === 'red' ? '0 3px 5px 2px rgba(255, 105, 135, .3)'	: '0 3px 5px 2px rgba(33, 203, 243, .3)',
			color: 'white',
			padding: '0 30px',
			margin: 8,
			fontSize: 30,
			width: 90,
			height: 50,
		},
	});
	function MyButton(props) {
		const { color, ...other } = props;
		const classes = useStyles(props);
		return <Button className={classes.root} {...other} />;
	}	  
	MyButton.propTypes = {
		color: PropTypes.oneOf(['blue', 'red']).isRequired,
	};

	return (
		<div align='center' style={{display:"flex", alignItems:"center", justifyContent:"center",width:"30vw", height:"10vh" }} >
			<MyButton color="red" onClick={() => dispatch('decrement')}>
				-
			</MyButton>
			<MyButton color="blue" onClick={() => dispatch('increment')}>
				+
			</MyButton>
		</div>
	)
}

export default Counter;