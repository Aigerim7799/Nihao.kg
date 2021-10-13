import React, { useState, useEffect } from 'react';
import './favorites.css';
import { fetchNote, clearBasketOrNote, removeItemFromBorN } from '../../actions';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
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

function FavoritesOrder(props) {
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
    props?.elId(token, 'Note', props.data.Id);
    window.location.reload();
  };

  const [quantity, setQuantity] = useState(props?.data?.Quantity);

  if (quantity < 1) setQuantity(1);
  const changeQuantityItem = async (id) => {
    const url = `http://otapi.net/service-json/EditNoteItemQuantity?instanceKey=56aa1311-6901-46e7-a0e8-a5445f74986c&language=en&signature=EditBasketItemQuantity56aa1311-6901-46e7-a0e8-a5445f74986c&timestamp=20210430011102&sessionId=${token}&elementId=${props.data.Id}&quantity=${id}`;
    const req = await fetch(url);
    const res = await req.json();
    // window.location.reload()
  };
  useEffect(() => {
    setImg(imgurl.join(' '));
    props.fetchNote(token);
  }, [quantity, props?.data?.FullTotalCost?.ConvertedPrice]);

  const addItemToBasket = async (id, cId) => {
    const url = `http://otapi.net/service-json/AddItemToBasket?instanceKey=56aa1311-6901-46e7-a0e8-a5445f74986c&language=en&signature=RegisterUser56aa1311-6901-46e7-a0e8-a5445f74986c&timestamp=20210430011102&sessionId=${token}&itemId=${id}&configurationId=${cId}&quantity=${quantity}&fieldParameters=%3CFields/%3E`;
    const req = await fetch(url);
    const res = await req.json();
  };

  return (
    <div className="f_c_p_favoritesProduct">
      <div className="f_c_p_fProductiView">
        <img src={img} alt="favoritesProduct" />
      </div>

      <div className="f_c_p_fProductiViewInfo">
        <div className="productViewInfoItemsMain">
          <span>
            {props.data &&
              props.data.Fields.map((el) => {
                if (el.Name === 'ItemTitle') {
                  return el.Value;
                } else {
                  return null;
                }
              })}
          </span>
          <span>{props.data.CategoryName}</span>
        </div>

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
          <span>способ доставки:</span>
          <span>Авиадоставка</span>
        </div>

        <div className="productViewInfoItems">
          <span>итог:</span>
          <span>
            {quantity * props.data.Price}
            {props.data.CurrencySign}
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
            <rect stroke="none" width="30" height="30" />
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
          onClick={() => addItemToBasket(props.data.ItemId, props.data.ConfigurationId)}>
          <svg
            className="svgIcons"
            width="40"
            height="40"
            viewBox="0 0 30 30"
            fill="none"
            xmlns="http://www.w3.org/2000/svg">
            <path d="M30 0H0V30H30V0Z" stroke="none" />
            <path
              d="M4.6875 7.5H25.1268C25.2641 7.5 25.3997 7.53016 25.5241 7.58835C25.6485 7.64655 25.7585 7.73135 25.8465 7.83676C25.9345 7.94218 25.9983 8.06564 26.0333 8.1984C26.0683 8.33117 26.0737 8.47001 26.0492 8.60511L24.0049 19.8551C23.9656 20.0711 23.8518 20.2665 23.6832 20.4072C23.5147 20.5479 23.3021 20.625 23.0825 20.625H7.86546C7.64599 20.625 7.43348 20.548 7.26494 20.4074C7.09641 20.2668 6.98254 20.0716 6.94316 19.8557L3.97552 3.58181C3.93615 3.36591 3.82227 3.17066 3.65374 3.03008C3.48521 2.8895 3.27269 2.8125 3.05323 2.8125H0.9375"
              fill="white"
            />
            <path
              d="M4.6875 7.5H25.1268C25.2641 7.5 25.3997 7.53016 25.5241 7.58835C25.6485 7.64655 25.7585 7.73135 25.8465 7.83676C25.9345 7.94218 25.9983 8.06563 26.0333 8.1984C26.0683 8.33117 26.0737 8.47001 26.0492 8.60511L24.0049 19.8551C23.9656 20.0711 23.8518 20.2665 23.6832 20.4072C23.5147 20.5479 23.3021 20.625 23.0825 20.625H7.86546C7.64599 20.625 7.43348 20.548 7.26494 20.4074C7.09641 20.2668 6.98254 20.0716 6.94316 19.8557L3.97552 3.58181C3.93615 3.36591 3.82227 3.17066 3.65374 3.03008C3.48521 2.8895 3.27269 2.8125 3.05323 2.8125H0.9375"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M8.4375 26.7188C9.21415 26.7188 9.84375 26.0892 9.84375 25.3125C9.84375 24.5358 9.21415 23.9062 8.4375 23.9062C7.66085 23.9062 7.03125 24.5358 7.03125 25.3125C7.03125 26.0892 7.66085 26.7188 8.4375 26.7188Z"
              fill="#DDDDDD"
            />
            <path
              d="M22.5 26.7188C23.2767 26.7188 23.9062 26.0892 23.9062 25.3125C23.9062 24.5358 23.2767 23.9062 22.5 23.9062C21.7233 23.9062 21.0938 24.5358 21.0938 25.3125C21.0938 26.0892 21.7233 26.7188 22.5 26.7188Z"
              fill="#DDDDDD"
            />
          </svg>

          <div className="div garbageDiv">
            <p>в корзину</p>
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
  },
  tab: {
    border: '2px solid red',
  },
}));

function Favorites(props) {
  const classes = useStyles();
  const theme = useTheme();
  const [value, setValue] = React.useState(0);
  const [elId, setElId] = useState();

  const handleChange = (event, newValue) => {
    event.preventDefault();
    setValue(newValue);
  };

  const handleChangeIndex = (index) => {
    setValue(index);
  };

  const token = localStorage.getItem('token');
  useEffect(() => {
    props.fetchNote(token);
  }, []);

  const history = useHistory();
  const clearNote = () => {
    props.clearBasketOrNote(token, 'Note');
    history.push('/');
  };
  return (
    <div className="homepage__app">
      <div className="homepage__wrap">
        <div id="homepage__wrapper">
          <div className="favorites_cProducts">
            <div className="f_сProductsHeader">
              <p>Избранные товары</p>
            </div>
            {props?.note?.CollectionInfo.Elements[0] ? (
              <div className="f_сProductsContent">
                <div className="f_с_pContentIcons">
                  <div className="f_c_pContentIcon">
                    <svg
                      className="f_с_p_cIcon1 icons "
                      width="13"
                      height="13"
                      viewBox="0 0 13 13"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"></svg>

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
                        stroke-linecap="round"
                        stroke-linejoin="round"
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
                      onClick={() => clearNote()}
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
                      <path d="M11.666 7.22192H12.7771V15.5553H11.666V7.22192Z" fill="#DDDDDD" />
                      <path d="M7.22266 7.22192H8.33377V15.5553H7.22266V7.22192Z" fill="#DDDDDD" />
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
                    {props?.note
                      ? props?.note &&
                        props?.note?.CollectionInfo.Elements?.map((el) => {
                          if (el.ProviderType === 'Taobao') {
                            return (
                              <>
                                <FavoritesOrder
                                  data={el}
                                  elId={props.clearBasketOrNote}
                                  fetchNote={props.fetchNote}
                                />
                              </>
                            );
                          } else return null;
                        })
                      : null}
                  </TabPanel>
                  <TabPanel value={value} index={1} dir={theme.direction}>
                    {props.note
                      ? props?.note &&
                        props?.note?.CollectionInfo.Elements?.map((el) => {
                          if (el.ProviderType === 'Alibaba1688') {
                            return (
                              <>
                                <FavoritesOrder
                                  elId={props.clearBasketOrNote}
                                  fetchNote={props.fetchNote}
                                  data={el}
                                />
                              </>
                            );
                          } else return null;
                        })
                      : null}
                  </TabPanel>
                </SwipeableViews>
              </div>
            ) : (
              'Избранных товаров нет'
            )}
          </div>

          <FQ />
        </div>
      </div>
    </div>
  );
}
const mapStateToProps = (state) => {
  return {
    note: state?.getNote[0],
  };
};
function mapDispatchToProps(dispatch) {
  return bindActionCreators({ fetchNote, clearBasketOrNote, removeItemFromBorN }, dispatch);
}
export default connect(mapStateToProps, mapDispatchToProps)(Favorites);
