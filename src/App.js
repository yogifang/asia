import './App.css';
import React from 'react';
import Background from "./assets/background.png";
import {
    AppBar,
    Box,
    makeStyles,
    CssBaseline,
    Paper,
    Tab,
    Tabs,
    Toolbar,
    Typography,
} from '@material-ui/core';

import HomeIcon from '@material-ui/icons/Home';
import PropTypes from 'prop-types';
import Members from './forms/members';
import BasicInfo from './forms/basicInfo';
import Performance from './forms/performance';
import Contacts from './forms/contacts';
import Subjects from './forms/subjects';
import Confirm from './forms/confirm';


const useStyles = makeStyles({
    paperContainer: {
        backgroundImage: `url(${Background})`,
        width: 1920, height: 1080,   backgroundSize: 'contain' ,
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'left'
    },
    customStyleOnTab: {
        fontSize: '12px',
        color: 'lightBlue',
    },
    customStyleOnActiveTab: {
        color: 'darkblue',
    },
    activeTab: {
        fontSize: '12px',
        fontWeight: '500',
        color: 'darkblue',
    },
});

function TabPanel(props) {
    const { children, value, index, ...other } = props;

    return ( <div role = 'tabpanel'
        hidden = { value !== index }
        id = { 'simple-tabpanel-${index}' }
        aria-labelledby = { 'simple-tab-${index}' } {...other } >
        {
            value === index && ( <Box p = { 3 } >
                <Typography > { children } < /Typography> </Box>
            )
        } </div>
    );
}

TabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.any.isRequired,
    value: PropTypes.any.isRequired,
};

function a11yProps(index) {
    return {
        id: `simple-tab-${index}`,
        'aria-controls': `simple-tabpanel-${index}`,
    };
}

function App() {
    const [value, setValue] = React.useState(0);
    const classes = useStyles();
    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    var statFormes = [1,0,0,0,0,0];
    return ( 
      <>
       <CssBaseline  />
       <div className= 'App-body'  >
      
    <br></br><br></br><br></br><br></br><br></br><br></br><br></br>
      
      <div className = 'App-action' style={{marginLeft: 350 , width:'1200px' , background: 'white' }}>
      <AppBar position = 'relative'  style={{ background: 'white' }}>
        <Toolbar>
        <Tabs value = { value } 
        onChange = { handleChange }
       
        aria-label = 'asia-scouting main buttons' >
       
        <Tab label = { <span className = { value === 0 ? classes.activeTab : classes.customStyleOnTab} >帳號建立<br></br>Sign Up for Free</span> } {...a11yProps(0) }/> 
        <Tab label = { <span className = { value === 1 ? classes.activeTab : classes.customStyleOnTab}>基本資料<br></br>Basic Info</span>} {...a11yProps(1) }/> 
        <Tab label = { <span className = { value === 2 ? classes.activeTab : classes.customStyleOnTab }>成績及運動表現<br></br>Physical Performance</span>} {...a11yProps(2) }/> 
        <Tab label = { <span className = { value === 3 ? classes.activeTab : classes.customStyleOnTab}> 聯繫資料<br></br>Contact</span>} {...a11yProps(3) }/> 
        <Tab label = { <span className = { value === 4 ? classes.activeTab : classes.customStyleOnTab} >學科相關成績<br></br>Academic Achievements</span>} {...a11yProps(4) }/>
        <Tab label = { <span className = { value === 5 ? classes.activeTab : classes.customStyleOnTab} >確認送出<br></br>Submit</span>} {...a11yProps(5) }/>
        </Tabs> 
        </Toolbar>{' '} 
        </AppBar>

        <TabPanel value = { value } index = { 0 } >
        <Members  / >
        </TabPanel>

        <TabPanel value = { value }index = { 1 } >
        <BasicInfo / >
        </TabPanel>

        <TabPanel value = { value }index = { 2 }  >
        <Performance / >
        </TabPanel>

        <TabPanel value = { value } index = { 3 } >
        <Contacts / >
        </TabPanel>

        <TabPanel value = { value }index = { 4 } >
        <Subjects / >
        </TabPanel>

        <TabPanel value = { value }index = { 5 } >
        <Confirm / >
        </TabPanel>
      </div>
       
    </div>
       
        </>
    );
}

export default App;