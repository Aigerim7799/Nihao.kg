import React, { useState, useEffect } from 'react';
import './Basket.css';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { fetchBasket, clearBasketOrNote, removeItemFromBorN, createOrder } from '../../actions';
import PropTypes from 'prop-types';
import SwipeableViews from 'react-swipeable-views';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import FQ from '../FQ';
import { useHistory } from 'react-router';
import { Link } from 'react-router-dom';

function BasketOrder(props) {
  const [img, setImg] = useState('');

  let imgurl = props.data
    ? props.data &&
      props.data.Fields.map((el) => {
        if (el.Name === 'PictureURL') {
          return el.Value;
        } else {
          return null;
        }
      })
    : null;
  const token = localStorage.getItem('token');
  const rmItemB = () => {
    props?.elId(token, 'Basket', props.data.Id);
    props.eleId(props.currentId - 1);
  };

  const [quantity, setQuantity] = useState(props?.data?.Quantity);

  if (quantity < 1) setQuantity(1);
  const changeQuantityItem = async (id) => {
    const url = `http://otapi.net/service-json/EditBasketItemQuantity?instanceKey=56aa1311-6901-46e7-a0e8-a5445f74986c&language=en&signature=EditBasketItemQuantity56aa1311-6901-46e7-a0e8-a5445f74986c&timestamp=20210430011102&sessionId=${token}&elementId=${props.data.Id}&quantity=${id}`;
    const req = await fetch(url);
    const res = await req.json();
  };

  useEffect(() => {
    setImg(imgurl.join(' '));
    props.fetchBasket(token);
  }, [quantity, props?.data?.FullTotalCost?.ConvertedPrice]);

  const addItemToNote = async (id) => {
    const url = `http://otapi.net/service-json/MoveItemFromBasketToNote?instanceKey=56aa1311-6901-46e7-a0e8-a5445f74986c&language=en&signature=RegisterUser56aa1311-6901-46e7-a0e8-a5445f74986c&timestamp=20210430011102&sessionId=${token}&elementId=${id}`;
    const req = await fetch(url);
    const res = await req.json();
    props.eleId(props.currenId - 1);
  };

  return (
    <div className="f_c_p_favoritesProduct">
      <Link to={'fullinfo/' + props?.data?.ItemId} className="f_c_p_fProductiView">
        <img src={img} alt="favoritesProduct" className="favoritesImg" />
      </Link>

      <div className="f_c_p_fProductiViewInfo">
        <Link to={'/fullinfo/' + props?.data?.ItemId} className="productViewInfoItemsMain">
          <span>
            {props.data &&
              props?.data?.Fields.map((el) => {
                if (el.Name === 'ItemTitle') {
                  return el.Value;
                } else {
                  return null;
                }
              })}
          </span>
          <span>{props.data?.CategoryName}</span>
        </Link>

        <div className="productViewInfoItems">
          <span>количество:</span>
          <span>
          <button 
              style={{width:'20px', height:'20px', color:'red',border:'none',backgroundColor:'transparent',}}
              onClick={ ()=>{
                setQuantity(quantity + 1)
                changeQuantityItem(quantity+1)
              }}>+</button>
                  <input type="text" value={quantity}  disabled style={{width:'30px', textAlign:'center',border:'none',backgroundColor:'transparent',}}/>
              <button 
              style={{width:'20px', height:'20px',color:'red',border:'none',backgroundColor:'transparent',}}
              onClick={()=>{
                setQuantity(quantity - 1)
                changeQuantityItem(quantity-1)
              }}>-</button>
          </span>
        </div>

        <div className="productViewInfoItems">
          <span>артикул</span>
          <span>{props?.data?.ItemId}</span>
        </div>

        <div className="productViewInfoItems">
          <span>итог:</span>
          <span>
            {quantity * props.data.Price}
            {props.data.CurrencySign}{' '}
          </span>
        </div>
      </div>

      <div className="f_c_p_fProductiСapabilities">
        <div className="fProductDelate">
          <svg
            className="svgIcons "
            onClick={() => rmItemB()}
            viewBox="0 0 30 30"
            fill="none"
            xmlns="http://www.w3.org/2000/svg">
            {' '}
            <rect width="45" height="45" stroke="none" />
            <path
              d="M22.6174 28.3334H7.38405C7.06337 28.3258 6.74734 28.2551 6.45399 28.1254C6.16064 27.9956 5.89573 27.8094 5.6744 27.5772C5.45307 27.345 5.27966 27.0715 5.16406 26.7723C5.04847 26.4731 4.99296 26.1541 5.00071 25.8334V9.3584H6.66738V25.8334C6.65942 25.9352 6.67168 26.0376 6.70344 26.1347C6.73519 26.2318 6.78583 26.3216 6.85243 26.3991C6.91903 26.4765 7.00029 26.54 7.09152 26.586C7.18276 26.6319 7.28217 26.6594 7.38405 26.6667H22.6174C22.7193 26.6594 22.8187 26.6319 22.9099 26.586C23.0011 26.54 23.0824 26.4765 23.149 26.3991C23.2156 26.3216 23.2662 26.2318 23.298 26.1347C23.3297 26.0376 23.342 25.9352 23.334 25.8334V9.3584H25.0007V25.8334C25.0085 26.1541 24.953 26.4731 24.8374 26.7723C24.7218 27.0715 24.5484 27.345 24.327 27.5772C24.1057 27.8094 23.8408 27.9956 23.5474 28.1254C23.2541 28.2551 22.9381 28.3258 22.6174 28.3334Z"
              fill="#DDDDDD"
            />
            <path
              d="M25.6507 7.49967H4.16732C3.9463 7.49967 3.73434 7.41188 3.57806 7.2556C3.42178 7.09932 3.33398 6.88735 3.33398 6.66634C3.33398 6.44533 3.42178 6.23337 3.57806 6.07709C3.73434 5.92081 3.9463 5.83301 4.16732 5.83301H25.6507C25.8717 5.83301 26.0836 5.92081 26.2399 6.07709C26.3962 6.23337 26.484 6.44533 26.484 6.66634C26.484 6.88735 26.3962 7.09932 26.2399 7.2556C26.0836 7.41188 25.8717 7.49967 25.6507 7.49967Z"
              fill="#DDDDDD"
            />
            <path d="M17.5 10.833H19.1667V23.333H17.5V10.833Z" fill="#DDDDDD" />
            <path d="M10.834 10.833H12.5007V23.333H10.834V10.833Z" fill="#DDDDDD" />
            <path
              d="M19.1673 4.88366H17.584V3.33366H12.4173V4.88366H10.834V3.33366C10.8335 2.9057 10.9976 2.49393 11.2923 2.18366C11.5871 1.87339 11.9899 1.68839 12.4173 1.66699H17.584C18.0114 1.68839 18.4142 1.87339 18.709 2.18366C19.0037 2.49393 19.1679 2.9057 19.1673 3.33366V4.88366Z"
              fill="#DDDDDD"
            />
          </svg>
          <div className="div delateDiv">
            <p>удалить товар</p>
          </div>
        </div>

        <div
          className="fProductInGarbage"
          onClick={() => {
            addItemToNote(props.data.Id);
          }}>
          <svg
            className="svgIcons"
            width="40"
            height="40"
            viewBox="0 0 30 30"
            fill="none"
            xmlns="http://www.w3.org/2000/svg">
            <path stroke="none" d="M30 0H0V30H30V0Z" />
            <path
              d="M15 25.3125C15 25.3125 3.28125 18.75 3.28125 10.7813C3.28149 9.37282 3.76952 8.00794 4.66236 6.91866C5.5552 5.82938 6.79774 5.08295 8.17874 4.80627C9.55973 4.52959 10.9939 4.73974 12.2375 5.40099C13.481 6.06224 14.4572 7.13377 15 8.43341L15 8.43342C15.5428 7.13378 16.5189 6.06224 17.7625 5.40099C19.0061 4.73974 20.4403 4.52959 21.8213 4.80627C23.2023 5.08295 24.4448 5.82938 25.3376 6.91866C26.2305 8.00794 26.7185 9.37282 26.7188 10.7813C26.7188 18.75 15 25.3125 15 25.3125Z"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>

          <div className="div garbageDiv">
            <p>в  избранное</p>
          </div>
        </div>
      </div>
    </div>
  );
}

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`full-width-tabpanel-${index}`}
      aria-labelledby={`full-width-tab-${index}`}
      {...other}>
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
    width: 500,
  },
  AppBar: {
    width: '320px',
    margin: 'auto',
    backgroundColor: 'white',
    marginBottom:'2%',
  },
  tab: {
    border: '2px solid red',
  },
}));

function Basket(props) {
  const classes = useStyles();
  const theme = useTheme();
  const [value, setValue] = React.useState(0);
  const [eleId, setEleId] = useState();
  const [ids, setIds] = useState();
  const [elementsId, setElementsId] = useState();
  const [checkout, setCheckout] = useState(false)
  const [elemButton, setElemButton]=useState()
  const [elButton, setElButton] = useState()


  const handleChange = (event, newValue) => {
    event.preventDefault();
    setValue(newValue);
  };

  const handleChangeIndex = (index) => {
    setValue(index);
  };

  const token = localStorage.getItem('token');
  useEffect(() => {
    props.fetchBasket(token);
    getElements();
    searchDelivery();
    // setElemButton(props?.basket?.CollectionInfo.CollectionSummaries[0].AdditionalPriceInfoList.Elements[0].ElementIds[0])
    // setElButton(props?.basket?.CollectionInfo?.Elements[0].Id)
  }, [eleId]);


  
  const history = useHistory();
  const clearBasket = () => {
    props.clearBasketOrNote(token, 'Basket');
    history.push('/');
  };
  const getElements = () => {
    // elemButton === elButton ? setCheckout(true) : setCheckout(false)
  };

  let arr = [];
  const searchDelivery = async () => {
    const url =
      'http://otapi.net/service-json/SearchDeliveryModes?instanceKey=56aa1311-6901-46e7-a0e8-a5445f74986c&language=ru&signature=GetCategorySubcategoryInfoList56aa1311-6901-46e7-a0e8-a5445f74986cru20210430011102123123&timestamp=20210430011102&xmlSearchParameters=%3CDeliveryModeSearchParameters%3E%3CCountryCode%3EKG%3C%2FCountryCode%3E%3C%2FDeliveryModeSearchParameters%3E&framePosition=0&frameSize=10';
    const req = await fetch(url);
    const res = await req.json();
    setEleId(props?.basket?.CollectionInfo?.Elements.length);
  };
  const getArr = () => {
    props?.basket?.CollectionInfo?.Elements?.map((el) => {
      if (el.Id) {
        arr.push(`<Id>${el?.Id}</Id>`);
        setIds(arr);
      }
    });
    if (ids !== undefined) {
      CreateOrder();
    }
  };
  const CreateOrder = () => {
    const id = ids?.join();
    const elId = id?.replace(/,/g, '');
  };

  return (
    <div className="homepage__app">
      <div className="homepage__wrap">
        <div id="homepage__wrapper">
          <div className="favorites_content">
            <div className="favorites_cProducts">
              <div className="f_сProductsHeader">
                <p>Корзина</p>
              </div>
              {props?.basket?.CollectionInfo.Elements[0] ? (
                <>
                  <div className="f_сProductsContent">
                    <div className="f_с_pContentIcons">
                      <div className="f_c_pContentIcon">
                        <svg
                          className="f_с_p_cIcon2 icons "
                          width="20"
                          height="20"
                          viewBox="0 0 20 20"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg">
                          <path d="M20 0H0V20H20V0Z" fill="white" stroke="none" />
                          <path
                            d="M3.125 5H16.7512C16.8427 5 16.9332 5.02011 17.0161 5.0589C17.099 5.0977 17.1724 5.15423 17.231 5.22451C17.2897 5.29479 17.3322 5.37709 17.3555 5.4656C17.3789 5.55412 17.3825 5.64668 17.3661 5.73674L16.0033 13.2367C15.9771 13.3808 15.9012 13.511 15.7888 13.6048C15.6765 13.6986 15.5347 13.75 15.3883 13.75H5.24364C5.09733 13.75 4.95565 13.6987 4.8433 13.6049C4.73094 13.5112 4.65503 13.3811 4.62878 13.2371L2.65034 2.38788C2.6241 2.24394 2.54818 2.11377 2.43583 2.02005C2.32347 1.92633 2.1818 1.875 2.03548 1.875H0.625"
                            fill="white"
                          />
                          <path
                            d="M3.125 5H16.7512C16.8427 5 16.9332 5.02011 17.0161 5.0589C17.099 5.0977 17.1724 5.15423 17.231 5.22451C17.2897 5.29479 17.3322 5.37709 17.3555 5.4656C17.3789 5.55412 17.3825 5.64668 17.3661 5.73674L16.0033 13.2367C15.9771 13.3808 15.9012 13.511 15.7888 13.6048C15.6765 13.6986 15.5347 13.75 15.3883 13.75H5.24364C5.09733 13.75 4.95565 13.6987 4.8433 13.6049C4.73094 13.5112 4.65502 13.3811 4.62878 13.2371L2.65034 2.38788C2.6241 2.24394 2.54818 2.11377 2.43583 2.02005C2.32347 1.92633 2.1818 1.875 2.03548 1.875H0.625"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                          <path
                            d="M5.625 17.8125C6.14277 17.8125 6.5625 17.3928 6.5625 16.875C6.5625 16.3572 6.14277 15.9375 5.625 15.9375C5.10723 15.9375 4.6875 16.3572 4.6875 16.875C4.6875 17.3928 5.10723 17.8125 5.625 17.8125Z"
                            fill="#DDDDDD"
                          />
                          <path
                            d="M15 17.8125C15.5178 17.8125 15.9375 17.3928 15.9375 16.875C15.9375 16.3572 15.5178 15.9375 15 15.9375C14.4822 15.9375 14.0625 16.3572 14.0625 16.875C14.0625 17.3928 14.4822 17.8125 15 17.8125Z"
                            fill="#DDDDDD"
                          />
                        </svg>

                        <svg
                          className="f_с_p_cIcon3 icons "
                          onClick={() => clearBasket()}
                          width="20"
                          height="20"
                          viewBox="0 0 20 20"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg">
                          <rect width="20" height="20" fill="white" stroke="none" />
                          <path
                            d="M15.0789 18.889H4.92335C4.70957 18.884 4.49888 18.8368 4.30331 18.7503C4.10775 18.6638 3.93114 18.5397 3.78359 18.3849C3.63603 18.2301 3.52042 18.0478 3.44336 17.8483C3.3663 17.6488 3.32929 17.4361 3.33446 17.2223V6.23901H4.44557V17.2223C4.44027 17.2902 4.44844 17.3585 4.46961 17.4232C4.49078 17.4879 4.52454 17.5478 4.56894 17.5995C4.61334 17.6511 4.66751 17.6934 4.72833 17.7241C4.78915 17.7547 4.85543 17.773 4.92335 17.7779H15.0789C15.1468 17.773 15.2131 17.7547 15.2739 17.7241C15.3347 17.6934 15.3889 17.6511 15.4333 17.5995C15.4777 17.5478 15.5115 17.4879 15.5326 17.4232C15.5538 17.3585 15.562 17.2902 15.5567 17.2223V6.23901H16.6678V17.2223C16.673 17.4361 16.636 17.6488 16.5589 17.8483C16.4818 18.0478 16.3662 18.2301 16.2187 18.3849C16.0711 18.5397 15.8945 18.6638 15.6989 18.7503C15.5034 18.8368 15.2927 18.884 15.0789 18.889Z"
                            fill="#DDDDDD"
                          />
                          <path
                            d="M17.1004 4.99978H2.77821C2.63087 4.99978 2.48956 4.94125 2.38537 4.83706C2.28119 4.73288 2.22266 4.59157 2.22266 4.44423C2.22266 4.29688 2.28119 4.15558 2.38537 4.05139C2.48956 3.9472 2.63087 3.88867 2.77821 3.88867H17.1004C17.2478 3.88867 17.3891 3.9472 17.4933 4.05139C17.5975 4.15558 17.656 4.29688 17.656 4.44423C17.656 4.59157 17.5975 4.73288 17.4933 4.83706C17.3891 4.94125 17.2478 4.99978 17.1004 4.99978Z"
                            fill="#DDDDDD"
                          />
                          <path
                            d="M11.666 7.22192H12.7771V15.5553H11.666V7.22192Z"
                            fill="#DDDDDD"
                          />
                          <path
                            d="M7.22266 7.22192H8.33377V15.5553H7.22266V7.22192Z"
                            fill="#DDDDDD"
                          />
                          <path
                            d="M12.7782 3.25577H11.7227V2.22244H8.27821V3.25577H7.22266V2.22244C7.2223 1.93713 7.33171 1.66262 7.52821 1.45577C7.72472 1.24892 7.99326 1.12559 8.27821 1.11133H11.7227C12.0076 1.12559 12.2762 1.24892 12.4727 1.45577C12.6692 1.66262 12.7786 1.93713 12.7782 2.22244V3.25577Z"
                            fill="#DDDDDD"
                          />
                        </svg>
                      </div>

                      <AppBar className={classes.AppBar} position="static" color="default">
                        <Tabs
                          value={value}
                          onChange={handleChange}
                          indicatorColor="primary"
                          textColor="primary"
                          variant="fullWidth"
                          aria-label="full width tabs example">
                          <Tab className={classes.tab} label="Tao Bao" {...a11yProps(0)} />
                          <Tab className={classes.tab} label="1688" {...a11yProps(1)} />
                        </Tabs>
                      </AppBar>
                    </div>

                    <SwipeableViews
                      axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
                      index={value}
                      onChangeIndex={handleChangeIndex}>
                      <TabPanel value={value} index={0} dir={theme.direction}>
                        {props?.basket
                          ? props?.basket &&
                            props.basket?.CollectionInfo?.CollectionSummaries?.map((element) => {
                              if (element.ProviderType === 'Taobao')
                                return (
                                  <>
                                    {element?.AdditionalPriceInfoList?.Elements.map((ele) => {
                                      return (
                                        <>
                                          <div className="deliveryToVendor">
                                            <h2>{ele?.DisplayName}</h2>
                                            <h2>{ele.Price.MarginPrice + ' сом'}</h2>
                                          </div>
                                          {props?.basket?.CollectionInfo.Elements?.map((el) => {
                                            if (el?.ProviderType === 'Taobao') {
                                              return (
                                                <>
                                                    {ele?.ElementIds?.map((elem) => {  
                                                    if (el.Id === elem){
                                                      return (
                                                        <BasketOrder
                                                          elId={props.removeItemFromBorN}
                                                          data={el}
                                                          eleId={setEleId}
                                                          currenId={eleId}
                                                          fetchBasket={props.fetchBasket}
                                                          clear={props.clear}
                                                        />
                                                      );}

                                                  })}
                                                </>
                                              );
                                            }
                                          })}
                                        </>
                                      );
                                    })}{' '}
                                  </>
                                );
                            })
                          : null}
                      </TabPanel>
                      <TabPanel value={value} index={1} dir={theme.direction}>
                        {props?.basket
                          ? props?.basket &&
                            props.basket?.CollectionInfo?.CollectionSummaries?.map((element) => {
                              if (element.ProviderType === 'Alibaba1688')
                                return (
                                  <>
                                    {element?.AdditionalPriceInfoList.Elements.map((ele) => {
                                      return (
                                        <>
                                          <div className="deliveryToVendor">
                                            <h2>{ele?.DisplayName}</h2>
                                          </div>
                                          {props?.basket?.CollectionInfo.Elements?.map((el) => {
                                            if (el.ProviderType === 'Alibaba1688') {
                                              return (
                                                <>
                                                  { ele?.ElementIds?.map((elem) => {  

                                                    if (el.Id === elem){
                                                      return (
                                                        <BasketOrder
                                                          elId={props.removeItemFromBorN}
                                                          data={el}
                                                          eleId={setEleId}
                                                          currenId={eleId}
                                                          fetchBasket={props.fetchBasket}
                                                          clear={props.clear}
                                                        />
                                                      );}
                                                  })}
                                                </>
                                              );
                                            }
                                          })}
                                        </>
                                      );
                                    })}{' '}
                                  </>
                                );
                            })
                          : null}
                      </TabPanel>
                    </SwipeableViews>
                  </div>
                  
                  <div className='bas__checkout'>
                    <Link to={'/DoOrder'}  
                    // className= {checkout==true ?"bas__checkoutBtn" :"bas__checkoutBtnNone" } 
                    className= "bas__checkoutBtn"
                    onClick={(e) => getArr()}>
                      Оформить заказ
                    </Link>
                  </div>

                </>
              ) : (
                'Корзина Пуста...'
              )}
            </div>

            <FQ />
          </div>
        </div>
      </div>
    </div>
  );
}
const mapStateToProps = (state) => {
  return {
    basket: state?.getBasket[0],
    clear: state?.clearBasketOrNote,
  };
};
function mapDispatchToProps(dispatch) {
  return bindActionCreators({ fetchBasket, clearBasketOrNote, removeItemFromBorN }, dispatch);
}
export default connect(mapStateToProps, mapDispatchToProps)(Basket);
