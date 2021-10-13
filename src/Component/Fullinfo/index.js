import React, { useState, useEffect } from 'react';
import './ViewsProduct.css';

import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import { Link } from 'react-router-dom';
import { Carousel } from 'react-bootstrap';

import FQ from '../FQ/index';

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`scrollable-auto-tabpanel-${index}`}
      aria-labelledby={`scrollable-auto-tab-${index}`}
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
    id: `scrollable-auto-tab-${index}`,
    'aria-controls': `scrollable-auto-tabpanel-${index}`,
  };
}

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    width: '100%',
    backgroundColor: theme.palette.background.paper,
  },
}));

export default function Fullinfo(props) {

    const classes = useStyles();
    const [fullInfo, setFullInfo] = useState();
    const [value, setValue] = useState(0);
    const [pid, setPid] = useState([])
    const [vendorId, setVendorId] = useState()
    const [vendorInfo, setVendorInfo] = useState()
    const [description, setDescription] = useState()
    const [valute, setValute] = useState()
    const [addItemToF, setAddItemToF] = useState(false)
    const [confId, setConfId] = useState()



    const [configuration, setConfiguration] = useState()

    const [vidId, setVidId] = useState('')
    const [pidId, setPidId] = useState('')

    const [vidId2, setVidId2] = useState('')
    const [pidId2, setPidId2] = useState('')

    const [vidId3, setVidId3] = useState('')
    const [pidId3, setPidId3] = useState('')

    const [vidId4, setVidId4] = useState('')
    const [pidId4, setPidId4] = useState('')


    const [confPidVid, setConfPidVid] = useState()


    useEffect(() => {
        getFullInfoProduct(props.match.params.id)
    }, [pidId, vidId, pidId2, vidId2, pidId3, vidId3, pidId4, vidId4])
    const handleChange = (event, newValue) => {
        setValue(newValue);
    };
    const getFullInfoProduct = async (id) => {
        const url = 'http://otapi.net/service-json/BatchGetItemFullInfo?instanceKey=56aa1311-6901-46e7-a0e8-a5445f74986c&language=en&signature=GetCategorySubcategoryInfoList56aa1311-6901-46e7-a0e8-a5445f74986cru20210430011102123123&timestamp=20210430011102&itemId=' + id + '&blockList=DeliveryCosts'
        const req = await fetch(url)
        const res = await req.json()
        setFullInfo(res?.Result ? res?.Result?.Item : null)
        setVendorId(res?.Result?.Item.VendorId !== undefined ? res?.Result?.Item.VendorId : null)
        let arr = []
        res?.Result?.Item?.Attributes?.map(el => {
            arr?.push(el.IsConfigurator === true ? el.PropertyName : null)

        })
        setPid(arr?.filter((item, pos, arr) => !pos || item !== arr[pos - 1]))
        getVendorInfo(res?.Result ? res?.Result?.Item.VendorId : null)
        getProductDescription(props.match.params.id)
        let configuredArr = []
        res?.Result?.Item?.ConfiguredItems.map(el => {
            configuredArr.push(el)
        })
        setConfPidVid(configuredArr)
        if (res?.Result) {
            configurationId('', '', res.Result?.Item, arr?.filter((item, pos, arr) => !pos || item !== arr[pos - 1]), configuredArr,false)
        }
        getValute()
    }
    const getValute = async () => {
        const request = await fetch('http://otapi.net/service-json/GetInstanceCurrencyRateList?instanceKey=56aa1311-6901-46e7-a0e8-a5445f74986c&language=en&signature=GetCategorySubcategoryInfoList56aa1311-6901-46e7-a0e8-a5445f74986cru20210430011102123123&timestamp=20210430011102')
        const res = await request.json()
        setValute(res)
    }
    const token = localStorage.getItem("token");


    const getVendorInfo = async (id) => {
        const url = `http://otapi.net/service-json/GetVendorInfo?instanceKey=56aa1311-6901-46e7-a0e8-a5445f74986c&language=en&signature=GetVendorInfo56aa1311-6901-46e7-a0e8-a5445f74986c&timestamp=20210430011102&vendorId=${id}`

        const req = await fetch(url)
        const res = await req.json()
        setVendorInfo(res?.VendorInfo)
    }

    const getProductDescription = async (id) => {
        const urlDescription = `http://otapi.net/service-json/GetItemDescription?instanceKey=56aa1311-6901-46e7-a0e8-a5445f74986c&language=en&signature=GetItemDescription56aa1311-6901-46e7-a0e8-a5445f74986c&timestamp=20210430011102&itemId=${id}`

        const req = await fetch(urlDescription)
        const res = await req.json()
        setDescription(res?.OtapiItemDescription?.ItemDescription)
    }

    const getPidVid = (id1, id2) => {
        setVidId(id2);
        setPidId(id1);
    }
    const getPidVid2 = (id1, id2) => {
        setVidId2(id2);
        setPidId2(id1);

    }
    const getPidVid3 = (id1, id2) => {
        setVidId3(id2);
        setPidId3(id1);

    }
    const getPidVid4 = (id1, id2) => {
        setVidId4(id2);
        setPidId4(id1);

    }

    const [count, setCount] = useState(1)

    if (count < 1) setCount(1)


    function createMarkup() {
        let descript = JSON.stringify(description)
        if (descript) {
            let prettyArr = descript.replace(/\\/g, '')
            return { __html: prettyArr }
        }
    }

    const configurationId = (id, bOrN, data, arr, confItems,id6) => {

        let arr1 = []
        let arr2 = []
        let arr3 = []
        let arr4 = []
        if (data?.Attributes !== undefined) {
            arr?.filter((name, idx) => idx <= 4).map((name, idx) => {
                data?.Attributes?.map((el) => {
                    if (el?.IsConfigurator === true) {
                        if (idx === 0 && arr[0] === el?.PropertyName) {
                            arr1.push(el)
                        }
                        if (idx == 1 && arr[1] === el?.PropertyName) {
                            arr2.push(el)

                        }
                        if (idx == 2 && arr[2] === el?.PropertyName) {
                            arr3.push(el)

                        }
                        if (idx == 3 && arr[3] === el?.PropertyName) {
                            arr4.push(el)
                        }

                    }
                })
            })
        }

        const arrPidVid = [
            pidId && vidId !== undefined ?
                {
                    pid: pidId,
                    vid: vidId,
                } : arr1 ? {
                    pid: arr1[0]?.Pid,
                    vid: arr1[0]?.Vid
                } : null,
            pidId2 && vidId2 !== undefined ?
                {
                    pid: pidId2,
                    vid: vidId2,
                } : arr2 ? {
                    pid: arr2[0]?.Pid,
                    vid: arr2[0]?.Vid
                } : null,
            pidId3 && vidId3 !== undefined ?
                {
                    pid: pidId3,
                    vid: vidId3,
                }
                : arr3 ? {
                    pid: arr3[0]?.Pid,
                    vid: arr3[0]?.Vid
                } : null,
            pidId4 && vidId4 !== undefined ?
                {
                    pid: pidId4,
                    vid: vidId4,
                } : arr4 ? {
                    pid: arr4[0]?.Pid,
                    vid: arr4[0]?.Vid
                } : null
        ]

        const arrPid1 = arrPidVid[0].pid
        const arrVid1 = arrPidVid[0].vid

        let arrPid2;
        let arrVid2;
        let arrPid3;
        let arrVid3;
        let arrPid4;
        let arrVid4;

        if (arrPidVid[1] !== undefined) {
            arrPid2 = arrPidVid[1].pid
            arrVid2 = arrPidVid[1].vid
        }
        if (arrPidVid[2] !== undefined) {
            arrPid3 = arrPidVid[2].pid
            arrVid3 = arrPidVid[2].vid
        }
        if (arrPidVid[3] !== undefined) {
            arrPid4 = arrPidVid[3].pid
            arrVid4 = arrPidVid[3].vid


        }

        confItems && confItems?.map((el, index) => {


            if (el?.Configurators?.length === 4) {
                if (el?.Configurators[0]?.Pid == arrPid1 &&
                    el?.Configurators[0]?.Vid == arrVid1) {
                    if (el?.Configurators[1]?.Pid == arrPid2 && el?.Configurators[1]?.Vid == arrVid2) {
                        if (el?.Configurators[2]?.Pid == arrPid3 && el?.Configurators[2]?.Vid == arrVid3) {
                            if (el?.Configurators[3]?.Pid == arrPid4 && el?.Configurators[3]?.Vid == arrVid4) {
                                setConfId(el?.Id)
                                getPidVid(arrPid1, arrVid1)
                                getPidVid2(arrPid2, arrVid2)
                                getPidVid3(arrPid3, arrVid3)
                                getPidVid4(arrPid4, arrVid4)
                                if (id6 === true && bOrN !== undefined) {
                                    addItemTo(id, bOrN, el?.Id)
                                    setAddItemToF(!addItemToF)
                                }
                            }
                        }
                    }
                }
            }
            else if (el?.Configurators.length == 3) {
                if (el?.Configurators[0].Pid == arrPid1 &&
                    el?.Configurators[0].Vid == arrVid1) {
                    if (el?.Configurators[1].Pid == arrPid2 && el?.Configurators[1].Vid == arrVid2) {
                        if (el?.Configurators[2].Pid == arrPid3 && el?.Configurators[2].Vid == arrVid3) {
                            setConfId(el?.Id)
                            getPidVid(arrPid1, arrVid1)
                            getPidVid2(arrPid2, arrVid2)
                            getPidVid3(arrPid3, arrVid3)
                            if (id6 === true && bOrN !== undefined) {
                                addItemTo(id, bOrN, el?.Id)
                                setAddItemToF(!addItemToF)
                            }
                        }
                    }
                }
            } else if (el?.Configurators.length == 2) {
                if (el?.Configurators[0].Pid == arrPid1 &&
                    el?.Configurators[0].Vid == arrVid1) {
                    if (el?.Configurators[1].Pid == arrPid2 && el?.Configurators[1].Vid == arrVid2) {
                        setConfId(el?.Id)
                        getPidVid(arrPid1, arrVid1)
                        getPidVid2(arrPid2, arrVid2)
                        if (id6 === true && bOrN !== undefined) {
                            addItemTo(id, bOrN, el?.Id)
                            setAddItemToF(!addItemToF)
                        }
                    }

                }
            } else if (el?.Configurators.length == 1) {
                if (el?.Configurators[0].Pid == arrPid1 &&
                    el?.Configurators[0].Vid == arrVid1) {
                    setConfId(el?.Id)
                    getPidVid(arrPid1, arrVid1)
                    if (id6 === true && bOrN !== undefined) {
                        addItemTo(id, bOrN, el?.Id)
                        setAddItemToF(!addItemToF)
                    }

                }
            }


        })

    }

    const addItemTo = async (id, bOrN, cId) => {
        const url = `http://otapi.net/service-json/AddItemTo${bOrN}?instanceKey=56aa1311-6901-46e7-a0e8-a5445f74986c&language=en&signature=RegisterUser56aa1311-6901-46e7-a0e8-a5445f74986c&timestamp=20210430011102&sessionId=${token}&itemId=${id}&configurationId=${cId}&quantity=${count}&fieldParameters=%3CFields/%3E`
        const req = await fetch(url)
        const res = await req.json()
    }
    const addOrder = (id1, id2, id3, id4, id5,id6) => {

        if(id2!==null&&id2!==undefined){
        configurationId(id1, id2, id3, id4, id5,id6)
        }else{
        configurationId(id1, id2, id3, id4, id5,id6)

        }
    }

    

    return (
        <div className='homepage__app'>
            <div className='homepage__wrap'>
                <div id='homepage__wrapper'>

                    <div className='fullView'>

                        <div className="fullViewHeader">
                            <p>Полный Просмотр</p>
                        </div>

                        <div className="fullViewContent">
                            {fullInfo ?
                                <div className="fvc-productName">
                                    <span >{fullInfo?.Title}
                                    </span>
                                </div>
                                : <></>
                            }
                            <div className="fvc-productMainInfo">
                                <div className="fvc-productView">

                                    <div className="fvc-productViewImg">

                                        <Carousel className="fvc-pViewImgCarousel">

                                            {fullInfo?.Pictures.map(el => {
                                                return (
                                                    <Carousel.Item >
                                                        <img className='fvc-pViewImgMainFull' src={el.Url} alt="" />
                                                    </Carousel.Item>

                                                )
                                            })
                                            }
                                        </Carousel>

                                        <div className='fvc-productViewImgAll'>
                                            {fullInfo && fullInfo?.Pictures.map((el, index) => {
                                                return (

                                                    <img className='fvc-pVImgAll' src={el.Url} alt="" />

                                                )
                                            })

                                            }
                                        </div>


                                        <div className="fvc-productViewOriginalLink">

                                            {fullInfo ?
                                                <a
                                                    href={fullInfo?.TaobaoItemUrl}
                                                    target='_blank'
                                                    style={{ color: 'darkviolet' }}
                                                >
                                                    Ссылка на оригинал
                                                </a>

                                                :
                                                <a style={{ color: 'violet' }}
                                                    href={fullInfo?.TaobaoItemUrl}>
                                                    Ссылка на оригинал
                                                </a>
                                            }
                                        </div>

                                    </div>

                                </div>


                                <div className="fvc-productInfo">

                                    {fullInfo ?
                                        pid?.filter((name, idx) => idx < 4).map((name, idx) => {
                                            return (
                                                <div className="fvc-pInfoName">
                                                    <span>{name}</span>

                                                    <div className="fvc-pInfoHardDiskCapacity">
                                                        {fullInfo?.Attributes.map((el) => {
                                                            if (name == el.PropertyName && el.IsConfigurator === true) {
                                                                return (
                                                                    <>
                                                                        {el.ImageUrl ?

                                                                            <button style={pidId == el?.Pid && vidId == el.Vid || pidId2 == el?.Pid && vidId2 == el?.Vid || pidId3 == el.Pid && vidId3 == el?.Vid || pidId4 == el?.Pid && vidId4 == el?.Vid ? { border: '2px solid #0083ca' } : { border: '2px solid #ccc' }}
                                                                                onClick={
                                                                                    idx == 0 ?
                                                                                        () => getPidVid(el.Pid, el.Vid)
                                                                                        : idx == 1 ?
                                                                                            () => getPidVid2(el.Pid, el.Vid)
                                                                                            : idx == 2 ?
                                                                                                () => getPidVid3(el.Pid, el.Vid)
                                                                                                : idx == 3 ?
                                                                                                    () => getPidVid4(el.Pid, el.Vid)
                                                                                                    : null
                                                                                }
                                                                            >
                                                                                <img
                                                                                    src={el.ImageUrl} alt="" /></button>
                                                                            :
                                                                            <button style={pidId == el?.Pid && vidId == el.Vid || pidId2 == el?.Pid && vidId2 == el?.Vid || pidId3 == el.Pid && vidId3 == el?.Vid || pidId4 == el?.Pid && vidId4 == el?.Vid ? { border: '2px solid #0083ca' } : { border: '2px solid #ccc' }}
                                                                                onClick={
                                                                                    idx == 0 ?
                                                                                        () => getPidVid(el?.Pid, el?.Vid)
                                                                                        : idx == 1 ?
                                                                                            () => getPidVid2(el.Pid, el.Vid)
                                                                                            : idx == 2 ?
                                                                                                () => getPidVid3(el.Pid, el.Vid)
                                                                                                : idx == 3 ?
                                                                                                    () => getPidVid4(el.Pid, el.Vid)
                                                                                                    : null
                                                                                }
                                                                            >{el.Value}</button>
                                                                        }
                                                                    </>
                                                                )
                                                            }

                                                        })
                                                        }

                                                    </div>
                                                </div>
                                            )
                                        })



                                        : <></>
                                    }





                                    {fullInfo ?
                                        fullInfo?.ConfiguredItems?.map(el => {
                                            if (el?.Id === confId) {
                                                return (
                                                    <div className="fvc-pInfoAddition">

                                                        <p>
                                                            В наличии:<span> {el?.Quantity}
                                                                шт.</span>
                                                        </p>
                                                        <p>
                                                            Цена 1шт:<span> {el?.Price.ConvertedPriceWithoutSign + ' ' + el?.Price.CurrencySign}</span>
                                                        </p>

                                                    </div>)
                                            }
                                        })
                                        : <div className="fvc-pInfoAddition">

                                            <p>
                                                В наличии:<span> </span>
                                            </p>
                                            <p>
                                                Цена 1шт:<span></span>
                                            </p>

                                        </div>
                                    }
                                    {fullInfo &&
                                        fullInfo?.ConfiguredItems?.map(el => {
                                            if (el?.Id === confId) {
                                                return (
                                                    <>
                                                        <div className="fvc-pInfoNumber">
                                                            <p> Кол-во:</p>

                                                            <div className='fvc-pInfoNumberBagpiece'>
                                                                {
                                                                    <>
                                                                        {el?.Quantity !== 0 ? <button className='fvc-pINBagpieceMinus' onClick={() => setCount(count - 1)}>-</button> : null}
                                                                        <input className='fvc-pINBagpieceValue' type="text" value={el?.Quantity !== 0 ? count : '0'} disabled />
                                                                        {el?.Quantity !== 0 ? <button className='fvc-pINBagpieceMinus' onClick={() => setCount(count + 1)}>+</button> : null}
                                                                    </>
                                                                }
                                                            </div>
                                                        </div>
                                                        <div className="fvc-pInfoTotalPrice">

                                                            <p>Итого: <span>{el?.Quantity !== 0 ? (count * el?.Price?.ConvertedPriceWithoutSign + ' ' + el.Price.CurrencySign) : '0'}</span> </p>

                                                        </div>
                                                    </>
                                                )
                                            }
                                        }) 
                                    }
                                    {
                                        fullInfo?.DeliveryCosts[0]?.Price?.OriginalPrice !== 0 ?
                                            <>
                                                <div className='fvc-pInfoTotalPrice'>
                                                    <p>Внутренняя доставка на продавца: <span> {(valute?.Result?.Content[0]?.Rate * fullInfo?.DeliveryCosts[0]?.Price?.OriginalPrice) + ' ' + 'Сом'}</span></p>
                                                </div>
                                            </>
                                            : null
                                    }
                                    {
                                        fullInfo?.ConfiguredItems?.map(el => {
                                            if (el?.Id === confId) {
                                                return (
                                                    <div className="fvc-pInfoAdd">

                                                        <button className='fvc-pInfoAddBasket fvc-pInfoAddButton'
                                                            onClick={
                                                                () =>{
                                                                    
            addOrder(props.match.params.id, el?.Quantity !== 0 ? 'Basket' : null, fullInfo, pid, confPidVid,true)
        }
                                                            }

                                                        >

                                                            <svg className='fvc-pInfoSvgIcons fvc-pInfoSvgBasket ' width="25" height="25" viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                                <path d="M30 0H0V30H30V0Z" />
                                                                <path className='fvc-pInfoSvgBasketFill' d="M4.6875 7.5H25.1268C25.2641 7.5 25.3997 7.53016 25.5241 7.58835C25.6485 7.64655 25.7585 7.73135 25.8465 7.83676C25.9345 7.94218 25.9983 8.06564 26.0333 8.1984C26.0683 8.33117 26.0737 8.47001 26.0492 8.60511L24.0049 19.8551C23.9656 20.0711 23.8518 20.2665 23.6832 20.4072C23.5147 20.5479 23.3021 20.625 23.0825 20.625H7.86546C7.64599 20.625 7.43348 20.548 7.26494 20.4074C7.09641 20.2668 6.98254 20.0716 6.94316 19.8557L3.97552 3.58181C3.93615 3.36591 3.82227 3.17066 3.65374 3.03008C3.48521 2.8895 3.27269 2.8125 3.05323 2.8125H0.9375" />
                                                                <path className='fvc-pInfoSvgBasketFill' d="M4.6875 7.5H25.1268C25.2641 7.5 25.3997 7.53016 25.5241 7.58835C25.6485 7.64655 25.7585 7.73135 25.8465 7.83676C25.9345 7.94218 25.9983 8.06563 26.0333 8.1984C26.0683 8.33117 26.0737 8.47001 26.0492 8.60511L24.0049 19.8551C23.9656 20.0711 23.8518 20.2665 23.6832 20.4072C23.5147 20.5479 23.3021 20.625 23.0825 20.625H7.86546C7.64599 20.625 7.43348 20.548 7.26494 20.4074C7.09641 20.2668 6.98254 20.0716 6.94316 19.8557L3.97552 3.58181C3.93615 3.36591 3.82227 3.17066 3.65374 3.03008C3.48521 2.8895 3.27269 2.8125 3.05323 2.8125H0.9375" stroke-linecap="round" stroke-linejoin="round" />
                                                                <path className='fvc-pInfoSvgBasketFill' d="M8.4375 26.7188C9.21415 26.7188 9.84375 26.0892 9.84375 25.3125C9.84375 24.5358 9.21415 23.9062 8.4375 23.9062C7.66085 23.9062 7.03125 24.5358 7.03125 25.3125C7.03125 26.0892 7.66085 26.7188 8.4375 26.7188Z" />
                                                                <path className='fvc-pInfoSvgBasketFill' d="M22.5 26.7188C23.2767 26.7188 23.9062 26.0892 23.9062 25.3125C23.9062 24.5358 23.2767 23.9062 22.5 23.9062C21.7233 23.9062 21.0938 24.5358 21.0938 25.3125C21.0938 26.0892 21.7233 26.7188 22.5 26.7188Z" />
                                                            </svg>

                                                            <p>Добавить в корзину</p>
                                                        </button>

                                                        <button className='fvc-pInfoAddFavorites fvc-pInfoAddButton' onClick={() =>
                                                            addOrder(props.match.params.id, el?.Quantity !== 0 ? 'Note' : null, fullInfo, pid, confPidVid,true)

                                                        }>

                                                            <svg className='fvc-pInfoSvgIcons fvc-pInfoSvgFavorites' width="25" height="25" viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                                <path d="M30 0H0V30H30V0Z" />
                                                                <path className='fvc-pInfoSvgFavoritesFill' d="M15 25.3125C15 25.3125 3.28125 18.75 3.28125 10.7813C3.28149 9.37282 3.76952 8.00794 4.66236 6.91866C5.5552 5.82938 6.79774 5.08295 8.17874 4.80627C9.55973 4.52959 10.9939 4.73974 12.2375 5.40099C13.481 6.06224 14.4572 7.13377 15 8.43341L15 8.43342C15.5428 7.13378 16.5189 6.06224 17.7625 5.40099C19.0061 4.73974 20.4403 4.52959 21.8213 4.80627C23.2023 5.08295 24.4448 5.82938 25.3376 6.91866C26.2305 8.00794 26.7185 9.37282 26.7188 10.7813C26.7188 18.75 15 25.3125 15 25.3125Z" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                                                            </svg>
                                                            <p>Добавить в избранное</p>

                                                        </button>
                                                    </div>
                                                )
                                            }
                                        })

                                    }


                                </div>




                                {fullInfo ?
                                    <div className="fvc-productProvider">
                                        <div className="fvc-pProviderName">
                                            <p>
                                                Поставшик:
                                            </p>
                                            <p>{fullInfo?.VendorName}</p>
                                        </div>
                                        {vendorInfo ?


                                            <div className="fvc-pProviderItems">
                                                <div className="fvc-pProviderItem">
                                                    <p>Магазин:</p>
                                                    <p>{vendorInfo ? vendorInfo?.ShopName : null}</p>
                                                </div>

                                                <div className="fvc-pProviderItem">
                                                    <p>Отзывов:</p>
                                                    <p>{vendorInfo?.Credit ? vendorInfo?.Credit.TotalFeedbacks : null}</p>
                                                </div>
                                                <div className="fvc-pProviderItem">
                                                    <p>Положительных:</p>
                                                    <p>{vendorInfo?.Credit ? vendorInfo?.Credit.PositiveFeedbacks : null}</p>
                                                </div>
                                                <div className="fvc-pProviderItem">
                                                    <p>Оценка <br /> доставки:</p>
                                                    <p>{vendorInfo?.Scores ? vendorInfo?.Scores.DeliveryScore : null}</p>
                                                </div>
                                                <div className="fvc-pProviderItem">
                                                    <p>Оценка товаров:</p>
                                                    <p>{vendorInfo?.Scores ? vendorInfo?.Scores.ItemScore : null}</p>
                                                </div>
                                                <div className="fvc-pProviderItem">
                                                    <p>Оценка услуг:</p>
                                                    <p>{vendorInfo?.Scores ? vendorInfo?.Scores.ServiceScore : null}</p>
                                                </div>

                                                <div className="fvc-pProviderItem">
                                                    <p>Рейтинг:</p>
                                                    <p>{vendorInfo?.Credit ? vendorInfo?.Credit.Score : null}</p>
                                                </div>
                                                <div className="fvc-pProviderItem">
                                                    <Link>Запомнить поставщика</Link>
                                                </div>
                                                <div className="allProductIsProvider">

                                                    <img src='' alt="" />
                                                    <img src='' alt="" />
                                                    <img src='' alt="" />
                                                    <img src='' alt="" />

                                                    <Link to={'/Market/'+ fullInfo?.VendorId}  >
                                                        <p > Все товары этого продавца</p>
                                                    </Link> 
 
                                                </div>

                                            </div>
                                            :
                                            <div className="fvc-pProviderItems">
                                                <div className="fvc-pProviderItem">
                                                    <p>Магазин:</p>
                                                </div>

                                                <div className="fvc-pProviderItem">
                                                    <p>Отзывов:</p>
                                                </div>
                                                <div className="fvc-pProviderItem">
                                                    <p>Положительных:</p>
                                                </div>
                                                <div className="fvc-pProviderItem">
                                                    <p>Оценка <br /> доставки:</p>
                                                </div>
                                                <div className="fvc-pProviderItem">
                                                    <p>Оценка товаров:</p>
                                                </div>
                                                <div className="fvc-pProviderItem">
                                                    <p>Оценка услуг:</p>
                                                </div>

                                                <div className="fvc-pProviderItem">
                                                    <p>Рейтинг:</p>
                                                </div>
                                                <div className="fvc-pProviderItem">
                                                    <Link>Запомнить поставщика</Link>
                                                </div>
                                                <div className="allProductIsProvider">

                                                    <img src='' alt="" />
                                                    <img src='' alt="" />
                                                    <img src='' alt="" />
                                                    <img src='' alt="" />

                                                    <p> Все товары этого продавца</p>
                                                </div>

                                            </div>
                                        }

                                    </div>
                                    : <></>

                                }
                            </div>




                        </div>

                        <div className="fvc-AllInfoProduct">
                            <div className="fvc-AllInfoProductType">

                                <div className={classes.root} >

                                    <AppBar
                                        position="static"
                                        color="white"
                                    >
                                        <Tabs
                                            value={value}
                                            onChange={handleChange}
                                            indicatorColor="primary"
                                            textColor="primary"
                                            variant="scrollable"
                                            scrollButtons="auto"
                                            aria-label="scrollable auto tabs example"
                                            variant="fullWidth"

                                        >
                                            <Tab label="Характеристики товара" {...a11yProps(0)} />
                                            <Tab label="Фото и описание" {...a11yProps(1)} />
                                            <Tab label="Отзывы" {...a11yProps(2)} />

                                        </Tabs>
                                    </AppBar>
                                    <TabPanel value={value} index={0}>
                                        {
                                            pid?.filter((name, idx) => idx < 15).map(name => {
                                                return (

                                                    <div className="fvc-pTypeСharacter">
                                                        <p style={{ color: 'red' }}>{name}:</p>

                                                        {fullInfo?.Attributes.map(el => {
                                                            if (name == el.PropertyName) {
                                                                return (
                                                                    <span>{el.Value}</span>
                                                                )
                                                            }
                                                        })
                                                        }

                                                    </div>

                                                )


                                            })

                                        }
                                    </TabPanel>
                                    <TabPanel value={value} index={1}>
                                        <div className='f__tabImgItem' dangerouslySetInnerHTML={createMarkup()} />;
                                    </TabPanel>
                                    <TabPanel value={value} index={2}>
                                        Отзывы о товаре
                                    </TabPanel>
                                </div>
                            </div>
                        </div>
                    </div>
                    <FQ />
                </div>
            </div>
        </div>

    )
}
