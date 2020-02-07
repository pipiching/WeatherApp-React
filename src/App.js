import React from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import { makeStyles } from '@material-ui/core/styles';
import MyBar from './component/MyBar';
import MyContent from './component/MyContent';
import MyFooter from './component/MyFooter';

export const useStyles = makeStyles(theme => ({
  '@global': {
    ul: {
      margin: 0,
      padding: 0,
      listStyle: 'none',
    },
  },
  appBar: {
    borderBottom: `1px solid ${theme.palette.divider}`,
  },
  toolbar: {
    flexWrap: 'wrap',
  },
  toolbarTitle: {
    flexGrow: 1,
  },
  link: {
    margin: theme.spacing(1, 1.5),
  },
  heroContent: {
    padding: theme.spacing(8, 0, 6),
  },
  cardHeader: {
    backgroundColor:
      theme.palette.type === 'dark' ? theme.palette.grey[700] : theme.palette.grey[200],
  },
  cardWeather: {
    display: 'flex',
    justifyContent: 'left',
    alignItems: 'baseline',
    marginBottom: theme.spacing(2),
  },
  footer: {
    borderTop: `1px solid ${theme.palette.divider}`,
    marginTop: theme.spacing(8),
    paddingTop: theme.spacing(3),
    paddingBottom: theme.spacing(3),
    [theme.breakpoints.up('sm')]: {
      paddingTop: theme.spacing(6),
      paddingBottom: theme.spacing(6),
    },
  },
  redo: {
    width: '8%',
    height: '8%',
  },
  icon: {
    width: '8%',
    height: '8%',
  },
  cog: {
    width: '1%',
    height: '1%',
  }
}));

function WeatherApp() {

	return (
		<React.Fragment>
			<CssBaseline />
			<MyBar />
			<MyContent />
			<MyFooter />
		</React.Fragment>
	);
}

export default WeatherApp;