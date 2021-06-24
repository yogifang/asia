import './App.css';
import React, { useState } from 'react';
import Context from './components/stores';
import Background from './assets/background.png';
import { AppBar, Box, makeStyles, CssBaseline, Tab, Tabs, Toolbar, Typography } from '@material-ui/core';

import PropTypes from 'prop-types';
import Members from './forms/members';
import BasicInfo from './forms/basicInfo';
import Performance from './forms/performance';
import ShootingPerformance from './forms/shootingPerformance';
import Contacts from './forms/contacts';
import Subjects from './forms/subjects';
import Confirm from './forms/confirm';

const useStyles = makeStyles({
  paperContainer: {
    backgroundImage: `url(${Background})`,
    width: 1920,
    height: 1080,
    backgroundSize: 'contain',
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'left',
  },
  customStyleOnTab: {
    fontSize: '12px',
    color: '#CCCCCC',
  },
  customStyleOnActiveTab: {
    color: '#333333',
  },
  activeTab: {
    fontSize: '12px',
    fontWeight: '500',
    color: '#333333',
  },
});

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role='tabpanel'
      hidden={value !== index}
      id={'simple-tabpanel-${index}'}
      aria-labelledby={'simple-tab-${index}'}
      className='div-form'
      {...other}
    >
      {value === index && (
        <Box p={3}>
          <Typography> {children} </Typography>{' '}
        </Box>
      )}{' '}
    </div>
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
  // const [recMember, setRecMember] = useState(initMembers);
  const [memberEmail, setMemberEmail] = useState('');
  const [showTabs, setShowTabs] = useState(false);
  const [showBaseball, setShowBaseball] = useState(true);
  const [valueTabs, setValueTabs] = useState(0);
  const classes = useStyles();
  const handleChange = (event, newValue) => {
    setValueTabs(newValue);
  };

  return (
    <>
      <CssBaseline />
      <Context.Provider
        value={{
          valueTabs,
          setValueTabs,
          showTabs,
          setShowTabs,
          showBaseball,
          setShowBaseball,
          memberEmail,
          setMemberEmail,
        }}
      >
        <div className='App-body'>
          <div className='App-action div-content'>
            <AppBar position='relative' className='bar-header'>
              <Toolbar>
                <Tabs
                  className='div-header'
                  value={valueTabs}
                  onChange={handleChange}
                  aria-label='asia-scouting main buttons'
                >
                  <Tab
                    label={
                      <span className={valueTabs === 0 ? classes.activeTab : classes.customStyleOnTab}>
                        帳號建立<br></br>Sign Up for Free{' '}
                      </span>
                    }
                    {...a11yProps(0)}
                  />{' '}
                  <Tab
                    label={
                      <span className={valueTabs === 1 ? classes.activeTab : classes.customStyleOnTab}>
                        基本資料 <br></br>Basic Info{' '}
                      </span>
                    }
                    disabled={!showTabs}
                    {...a11yProps(1)}
                  />{' '}
                  <Tab
                    label={
                      showBaseball === true ? (
                        <span className={valueTabs === 2 ? classes.activeTab : classes.customStyleOnTab}>
                          成績及運動表現 <br></br>Physical Performance{' '}
                        </span>
                      ) : (
                        <span className={valueTabs === 2 ? classes.activeTab : classes.customStyleOnTab}>
                          射擊成績 <br></br>Shooting{' '}
                        </span>
                      )
                    }
                    disabled={!showTabs}
                    {...a11yProps(2)}
                  />{' '}
                  <Tab
                    label={
                      <span className={valueTabs === 3 ? classes.activeTab : classes.customStyleOnTab}>
                        {' '}
                        聯繫資料 <br></br>Contact{' '}
                      </span>
                    }
                    disabled={!showTabs}
                    {...a11yProps(3)}
                  />{' '}
                  <Tab
                    label={
                      <span className={valueTabs === 4 ? classes.activeTab : classes.customStyleOnTab}>
                        學科相關成績 <br></br>Academic Achievements{' '}
                      </span>
                    }
                    disabled={!showTabs}
                    {...a11yProps(4)}
                  />{' '}
                  <Tab
                    label={
                      <span className={valueTabs === 5 ? classes.activeTab : classes.customStyleOnTab}>
                        確認送出 <br></br>Submit{' '}
                      </span>
                    }
                    disabled={!showTabs}
                    {...a11yProps(5)}
                  />{' '}
                </Tabs>{' '}
              </Toolbar>{' '}
            </AppBar>
            <TabPanel value={valueTabs} index={0}>
              <Members />
            </TabPanel>
            <TabPanel value={valueTabs} index={1}>
              {showTabs ? (
                <>
                  <BasicInfo />
                </>
              ) : null}
            </TabPanel>
            <TabPanel value={valueTabs} index={2}>
              {showBaseball ? (
                <>
                  <Performance />
                </>
              ) : (
                <>
                  <ShootingPerformance />
                </>
              )}
            </TabPanel>
            <TabPanel value={valueTabs} index={3}>
              <Contacts />
            </TabPanel>
            <TabPanel value={valueTabs} index={4}>
              <Subjects />
            </TabPanel>
            <TabPanel value={valueTabs} index={5}>
              <Confirm />
            </TabPanel>{' '}
          </div>{' '}
        </div>{' '}
      </Context.Provider>
    </>
  );
}

export default App;
