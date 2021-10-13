import React from 'react'
import './faq.css'
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import Order from './FQcomponent/Order';
import Pay from './FQcomponent/Pay';
import Deliver from './FQcomponent/Deliver';
import Quarentee from './FQcomponent/Quarentee';
import Contract from './FQcomponent/Contract';
import Company from './FQcomponent/Company';
import Agreement from './FQcomponent/Agreement'
import Calculator from './FQcomponent/Calculator'
import Claims from './FQcomponent/Claims'
import Contacts from './FQcomponent/Contacts'
import Region from './FQcomponent/Region'
import Size from './FQcomponent/Size'

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`vertical-tabpanel-${index}`}
      aria-labelledby={`vertical-tab-${index}`}
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
    id: `vertical-tab-${index}`,
    'aria-controls': `vertical-tabpanel-${index}`,
  };
}

const useStyles = makeStyles((theme) => ({
    tab:{
      border:"2px solid red",
      marginTop:'5px',
      margin:'auto',
      width:'100%',
    },
    tabs:{
      display:'flex',
      width:'100%',
      justifyContent:'center',
      textAlign:'center',
    }, 
}));

export default function FAQ() {
  const classes = useStyles();
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };


  return (
    <div>
      <div className="homepage__app">
        <div className="homepage__wrap">
          <div id="homepage__wrapper">
          <div className="faq__wrap">
            <div className="question-content" >
              <div className="question-head">
                <p className="faq-text">Часто задаваемые вопросы</p>
              </div>
              <div className='root'>
                <div className="question__sidebar">
                  <div className='faq-photo'></div>
                  <Tabs
                    orientation="vertical"
                    variant="scrollable"
                    value={value}
                    onChange={handleChange}
                    aria-label="Vertical tabs example"
                    className={classes.tabs}
                    className="faq__tabs"
                  >
                    <Tab className={classes.tab} label="как оплатить заказ" {...a11yProps(0)} />
                    <Tab className={classes.tab} label="доставка" {...a11yProps(1)} />
                    <Tab className={classes.tab} label="гарантии" {...a11yProps(2)} />
                    <Tab className={classes.tab} label="о компании" {...a11yProps(3)} />
                    <Tab className={classes.tab} label="договор" {...a11yProps(4)} />
                    <Tab label="контакты" className={classes.tab} {...a11yProps(5)} />
                    <Tab label="как подобрать нужный размер" className={classes.tab} {...a11yProps(6)} />
                    <Tab label="доставка в регионы" className={classes.tab} {...a11yProps(7)} />
                  </Tabs>
                </div>

                <div className="question__content">
                  <TabPanel value={value} index={0}>
                    <Pay />
                  </TabPanel>
                  <TabPanel value={value} index={1}>
                    <Deliver />
                  </TabPanel>
                  <TabPanel value={value} index={2}>
                    <Quarentee />
                  </TabPanel>
                  <TabPanel value={value} index={3}>
                    <Company />
                  </TabPanel>
                  <TabPanel value={value} index={4}>
                    <Contract />
                  </TabPanel>
                  <TabPanel value={value} index={5}>
                    <Contacts/>
                  </TabPanel>
                  <TabPanel value={value} index={6}>
                    <Size/>
                  </TabPanel>
                  <TabPanel value={value} index={7}>
                    <Region/>
                  </TabPanel>
                </div>


              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    </div>

  )
}


