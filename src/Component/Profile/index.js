import React, { useEffect, useState } from 'react'
import "./Profile.css"
import Address from './Profile_compon/Address'
import Balance from './Profile_compon/Balance'
import Information from './Profile_compon/Information'
import Order from './Profile_compon/Order'
import Settings from './Profile_compon/Settings'
import Support from './Profile_compon/Support'
import OutputMoney from "./Profile_compon/OutputMoney"
import Exit from './Profile_compon/Exit'
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import Delivery from './Profile_compon/Delievery'


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
    // root: {
    //     display:'flex',
    //     width:'100%',
        
    // },
    tabs: {
      borderRight: `1px solid ${theme.palette.divider}`,
      margin:'auto',
      marginTop:'20px',    
    },
    // tab:{
    //     margin:'auto',
    //     outline:'none',
    //     width:'350px',
    //     height:'35px',
    //     textAlign:'center',
    //     backgroundColor:'white',
    //     border:'2px solid red',
    //     cursor:'pointer',
    //     marginTop:'10px',
    //     fontSize:'16px',
    //     fontWeight:'390',
    // },
    
  }));


export default function Profile(props) {
    const classes = useStyles();
    const [value, setValue] = React.useState(0);
    const [info, setInfo] = useState()
    const [data, setData]=useState()
    const [delProfile, setDelProfile] = useState()
  
    const handleChange = (event, newValue) => {
      setValue(newValue);
    };
  
    const changeName=(name)=>{
        props.setActive(true)
        props.setSurname(name)
    }
    useEffect(() => {
    getBalance()
    checkPersonInfo()
    getPersonInfo()
    getDeliveryInfo()
     },[])
     
     const [balance, setBalance] = useState()
     let token = localStorage.getItem("token");
     const getBalance = async()=>{
         const URL_BALANCE = `http://otapi.net/service-json/GetAccountInfo?instanceKey=56aa1311-6901-46e7-a0e8-a5445f74986c&language=en&signature=GetCategorySubcategoryInfoList56aa1311-6901-46e7-a0e8-a5445f74986cru20210430011102123123&timestamp=20210430011102&sessionId=${token}`;
         const req = await fetch (URL_BALANCE)
         const resp = await req.json()
         setBalance(resp)
         }

const UserToken= localStorage.getItem('token')

const checkPersonInfo = async()=>{
  const URL_CHECK= `http://otapi.net/service-json/GetUserProfileInfoList?instanceKey=56aa1311-6901-46e7-a0e8-a5445f74986c&language=en&signature=GetCategorySubcategoryInfoList56aa1311-6901-46e7-a0e8-a5445f74986cru20210430011102123123&timestamp=20210430011102&sessionId=${UserToken}`
  const req = await fetch(URL_CHECK)
  const resp = await req.json()
  setData(resp)
}
const getPersonInfo = async()=>{
  const URL_GETPERSONINFO= `http://otapi.net/service-json/GetUserInfo?instanceKey=56aa1311-6901-46e7-a0e8-a5445f74986c&language=en&signature=GetCategorySubcategoryInfoList56aa1311-6901-46e7-a0e8-a5445f74986cru20210430011102123123&timestamp=20210430011102&sessionId=${UserToken}`
  const req = await fetch(URL_GETPERSONINFO)
  const resp =await req.json()
  setInfo(resp)
}

const getDeliveryInfo = async() =>{
  const url = `http://otapi.net/service-json/GetUserProfileInfoList?instanceKey=56aa1311-6901-46e7-a0e8-a5445f74986c&language=ru&signature=GetUserProfileInfoList56aa1311-6901-46e7-a0e8-a5445f74986cru20210430011102123123&timestamp=20210430011102&sessionId=${token}`
  const req = await fetch(url)
  const res = await req.json()
  setDelProfile(res)
}

    return (
        <div>
            <div className="profile__content" >
                <div className="profile__head">
                    <p className="profile__text">Профиль</p>
                </div>
                    
                    <div className="profile__root">
                    <div className="profile__ava_and_points">
                        <div className="profile__ava"></div>
                        <p className="profile__userName" >{info?.UserInfo? info?.UserInfo.FirstName : null}</p>
                    <Tabs
                    orientation="vertical"  
                    variant="scrollable"
                    value={value}
                    onChange={handleChange}
                    aria-label="Vertical tabs example"
                    className="tabs"
                    >
                    <Tab className="tab"  label="Общая информация" {...a11yProps(0)} />
                    <Tab className="tab" label="Настройки" {...a11yProps(1)} />
                    <Tab className="tab"  label="Служба поддержки" {...a11yProps(2)} />
                    <Tab className="tab"  label="Доставка" {...a11yProps(3)} />
                    <Tab className="tab"  label="Выход" {...a11yProps(4)} />

                    </Tabs>
                    </div>

                    <div className="profile__contents">
                                
                        <TabPanel value={value} index={0}>
                                <Information 
                                info={info}
                                balance={balance}   
                                    active={props.active}
                                    setActive={props.setActive}
                                    address={props.address}
                                    fio={props.fio}
                                    email={props.email}
                                    setAddress={props.setAddress}
                                    number={props.number}
                                    setEmail={props.setEmail}
                                    sex={props.sex}
                                    setNumber={props.setNumber}
                                    setSex={props.setSex}
                                    password={props.password}
                                    setPassword={props.setPassword}
                                    updateUser={props.updateUser}
                                />
                        </TabPanel>
                        <TabPanel value={value} index={1}>
                            <Settings 
                            info={info}
                            balance={balance}
                                password={props.password}
                                setPassword={props.setPassword}
                                active={props.active}
                                setActive={props.setActive}
                                fio={props.fio}
                                address={props.address}
                                setAddress={props.setAddress}
                                email={props.email}
                                setEmail={props.setEmail}
                                number={props.number}
                                setNumber={props.setNumber}
                                sex={props.sex}
                                setSex={props.setSex}
                                changeName={changeName}
                            />
                        </TabPanel>
                        <TabPanel value={value} index={2}>
                            <Support/>
                        </TabPanel>
                        <TabPanel value={value} index={3}>
                            <Delivery 
                              info={info}
                                balance={balance}   
                                    active={props.active}
                                    setActive={props.setActive}
                                    address={props.address}
                                    fio={props.fio}
                                    email={props.email}
                                    setAddress={props.setAddress}
                                    number={props.number}
                                    setEmail={props.setEmail}
                                    sex={props.sex}
                                    setNumber={props.setNumber}
                                    setSex={props.setSex}
                                    password={props.password}
                                    setPassword={props.setPassword}
                                    updateUser={props.updateUser}
                                    delProfile={delProfile}
                            />
                        </TabPanel>
                        <TabPanel value={value} index={4}>
                            <Exit/>
                        </TabPanel>
                    </div>
                    
                </div>
            </div>           
        </div>
    )
}