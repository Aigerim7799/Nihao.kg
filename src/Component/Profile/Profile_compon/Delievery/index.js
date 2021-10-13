import React from 'react'
import PropTypes from 'prop-types';
import SwipeableViews from 'react-swipeable-views';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import { useEffect } from 'react';
import { useState } from 'react';
import Profile1 from './profile1';
import Profile2 from './profile2';
import Profile3 from './profile3';

function TabPanel(props) {
    const { children, value, index, ...other } = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`full-width-tabpanel-${index}`}
            aria-labelledby={`full-width-tab-${index}`}
            {...other}
        >
            {value === index && (
                <Box p={3}>
                    <Typography>{children}</Typography>
                </Box>
            )}
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
        id: `full-width-tab-${index}`,
        'aria-controls': `full-width-tabpanel-${index}`,
    };
}

const useStyles = makeStyles((theme) => ({
    root: {
        backgroundColor: theme.palette.background.paper,
        width: '90%',
        marginLeft:'5%',
    },
    
    

}));



function Delivery(props) {

    const classes = useStyles();
    const theme = useTheme();
    const [value, setValue] = useState(0);
   


    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    const handleChangeIndex = (index) => {
        setValue(index);
    };

    
    
  
    


    return (
        <div className="profile__info__contentBox">
            <div className="profile__info__block1">
                <div className="profile__info__name">
                    <p>общая информация</p>
                    <span className="profile__info__line"></span>
                </div>
                {props.balance ? (
                    <div className="profile__bal__miniContent">
                        <ul className="profile__bal__ul">
                            <p>Номер счета: <span>{props.balance.Result ? props.balance.Result.Num : null}</span></p>
                            <p>
                                На вашем балансе: <span>{" "}
                                    {props.balance.Result.Balance +
                                        " " +
                                        props.balance.Result.CurrencySign}</span>
                            </p>
                            <p>
                                Ожидает оплаты: <span>{" "}
                                    {props.balance.Result.PaymWaitAmount +
                                        " " +
                                        props.balance.Result.CurrencySign}</span>
                            </p>
                        </ul>
                    </div>
                ) : null}
            </div>
            <div className={classes.root}>
                <AppBar position="static" color='secondary'  >
                    <Tabs
                        value={value}
                        onChange={handleChange}
                        indicatorColor="primary"
                        textColor="default"
                        variant="fullWidth"
                        aria-label="full width tabs example"
                    >
                        <Tab 
                        // className='tab' 
                        label="Профиль 1" {...a11yProps(0)} />
                        <Tab 
                        // className='tab' 
                        label="Профиль 2" {...a11yProps(1)} />
                        <Tab 
                        // className='tab' 
                        label="Профиль 3" {...a11yProps(2)} />
                    </Tabs>
                </AppBar>
                <SwipeableViews
                    axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
                    index={value}
                    onChangeIndex={handleChangeIndex}
                >
                    <TabPanel value={value} index={0} dir={theme.direction}>{
                        props?.delProfile?.Result?.Content[0]?
                        <Profile1 delProfile={props?.delProfile?.Result?.Content[0]}/>
                        :<Profile1 delProfile={props?.delProfile?.Result?.Content[0]} />
                    }
                    </TabPanel>
                    <TabPanel value={value} index={1} dir={theme.direction}>{
                        props.delProfile?.Result?.Content[1]?
                        <Profile2 delProfile={props?.delProfile?.Result?.Content[1]}/>
                        :<Profile2 delProfile={props?.delProfile?.Result?.Content[1]}/>
                    }
                    </TabPanel>
                    <TabPanel value={value} index={2} dir={theme.direction}>{
                        props?.delProfile?.Result?.Content[2]?
                        <Profile3 delProfile={props?.delProfile?.Result?.Content[2]}/>
                        :<Profile3 delProfile={props?.delProfile?.Result?.Content[2]}/>
                    }
                    </TabPanel>
                   
                    
                </SwipeableViews>
            </div>

        </div>
    )
}

export default Delivery
