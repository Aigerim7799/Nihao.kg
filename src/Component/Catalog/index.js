import React, { useState, useEffect, Suspense } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { fetchCatalog, fetchItems,fetchCatalogAlibaba } from '../../actions'
import TreeView from '@material-ui/lab/TreeView';
import TreeItem from '@material-ui/lab/TreeItem';
import Collapse from '@material-ui/core/Collapse';
import AddIcon from '@material-ui/icons/Add';
import RemoveIcon from '@material-ui/icons/Remove';
import LensIcon from '@material-ui/icons/Lens';
import { useSpring, animated } from '@react-spring/web';
import { Link } from 'react-router-dom';
import './catalog.css';
import SubCatalogs from '../SubCatalogs/index';
import Telephone from '../Telephone';
import PropTypes from 'prop-types';
import SwipeableViews from 'react-swipeable-views';
import { makeStyles, useTheme, withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';

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

function TransitionComponent(props) {
  const style = useSpring({
    from: { opacity: 0, transform: 'translate3d(20px,0,0)' },
    to: { opacity: props.in ? 1 : 0, transform: `translate3d(${props.in ? 0 : 20}px,0,0)` },
  });

  return (
    <animated.div style={style}>
      <Collapse {...props} />
    </animated.div>
  );
}

TransitionComponent.propTypes = {
  /**
   * Show the component; triggers the enter or exit states
   */
  in: PropTypes.bool,
};

const StyledTreeItem = withStyles((theme) => ({
  iconContainer: {
    '& .close': {
      opacity: 0.3,
    },
  },
  group: {
    marginLeft: 7,
    paddingLeft: 18,
  },
}))((props) => <TreeItem {...props} TransitionComponent={TransitionComponent} />);

const useStyles = makeStyles({
  root: {
    height: 'auto',
    flexGrow: 1,
    maxWidth: 1200,
    marginLeft: '2%',
  },
  closeIcon: {
    fontSize: '2%',
    color: 'green',
  },
});

function Catalog(props) {
  const classes = useStyles();

  const [value, setValue] = useState()
  const [count, setCount] = useState(props?.items?.note[0]===undefined?1:1)
  const [id, setId] = useState()
  const [selectedId, setSelectedId]=useState()
  const [currentId, setCurrentId]=useState()
  const [thirdId, setThirdId]=useState()
  const [fourthId, setFourthId]=useState()

  const theme = useTheme();
  const [valueTab, setValueTab] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValueTab(newValue);
    props.fetchCatalogAlibaba(props.catalog?props?.catalog[0]?.Id:null)

  };

  const handleChangeIndex = (index) => {
    setValueTab(index);

  };

  useEffect(() => {

    props.fetchCatalog()
    
  }, [])
  const getSelectedId =(id)=>{
    setSelectedId(id)

  }
  const getCurrentId=(id)=>{
    setCurrentId(id)
  }
  const getThirdId=(id)=>{
    setThirdId(id)
  }
  const getFourthId=(id)=>{
    setFourthId(id)
  }
  
  const getId = (id1,Name) => {
    setCount(props?.items?.note[0]===undefined?1:count)
    props?.fetchItems(id1,count)
    setValueTab(Name)
    setId(id1)
    
  }


  return (
    <>
    <div className='productCatalog'>
      <div className='headerProdCatalog'>
        <p>Каталог</p>
      </div>
      <div className='Catalog__button'>
          <AppBar position="static" color="default">
          <Tabs
            value={valueTab}
            onChange={handleChange}
            indicatorColor="primary"
            textColor="primary"
            variant="fullWidth"
            aria-label="full width tabs example"
          >
            <Tab className="catalog__tab" label="Tao Bao" {...a11yProps(0)} />
            <Tab className="catalog__tab" label="1688" {...a11yProps(1)} />
          </Tabs>
        </AppBar>
      </div>
      <SwipeableViews
      className="catalog__swipeableView"
    axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
    index={valueTab}
    onChangeIndex={handleChangeIndex}
  >
    <TabPanel value={valueTab} index={0} dir={theme.direction}>
                <TreeView
                className={classes.root}
                defaultExpanded={['1']}
                defaultCollapseIcon={<RemoveIcon />}
                defaultExpandIcon={<AddIcon />}
                defaultEndIcon={<LensIcon className={classes.closeIcon} />}
              >
                <div className='Catalog__List'>

                  <div className='Catalog__leftList'>
                    {props.catalog ?
                      props.catalog && props.catalog?.map((item, index) => {
                        if (index <= 13 && item.Name !== '1688 - Оптом') {
                          return (
                            <SubCatalogs data={item} selectedId={selectedId} getSelectedId={getSelectedId} currentId={currentId} getCurrentId={getCurrentId} thirdId={thirdId} getThirdId={getThirdId} getId={getId} getFourthId={getFourthId} fourthId={fourthId} />
                          )
                        } else {
                          return null
                        }

                      }) : null
                    }

                  </div>

                  <div className='Catalog__rightList'>
                    {props.catalog ?
                      props.catalog && props.catalog?.map((item, index) => {
                        if (index >= 14) {
                          return (
                            <SubCatalogs data={item} selectedId={selectedId} getSelectedId={getSelectedId} currentId={currentId} getCurrentId={getCurrentId} thirdId={thirdId} getThirdId={getThirdId} getId={getId}  getFourthId={getFourthId} fourthId={fourthId} />
                          )
                        } else {
                          return null
                        }

                      }) : null
                    }
                  </div>
                </div>
              </TreeView>
    </TabPanel>
    <TabPanel value={valueTab} index={1} dir={theme.direction}>
      <div className="Catalog__List">
        <div className="Catalog__leftList">
        {props.catalog ?
                      props.alibabaCatalog && props.alibabaCatalog?.map((item, index) => {
                        if (index <= 26) {
                          return (
                            <SubCatalogs data={item} selectedId={selectedId} getSelectedId={getSelectedId} currentId={currentId} getCurrentId={getCurrentId} thirdId={thirdId} getThirdId={getThirdId} getId={getId}  getFourthId={getFourthId} fourthId={fourthId} />
                          )
                        } else {
                          return null
                        }

                      }) : null
                    }
        </div>
        <div className='Catalog__rightList'>
                    {props.catalog ?
                      props.alibabaCatalog && props.alibabaCatalog?.map((item, index) => {
                        if (index >= 26) {
                          return (
                            <SubCatalogs data={item} selectedId={selectedId} getSelectedId={getSelectedId} currentId={currentId} getCurrentId={getCurrentId} thirdId={thirdId} getThirdId={getThirdId} getId={getId}  getFourthId={getFourthId} fourthId={fourthId} />
                          )
                        } else {
                          return null
                        }

                      }) : null
                    }
                  </div>
      </div>
    </TabPanel>
  </SwipeableViews>
      
      <div>

      </div>
    </div>
    <Suspense fallback={<h1>Loading profile...</h1>}>
      <Telephone id={id !==undefined? id:id } setId={setId} setMoreInfoModal={props.setMoreInfoModal} setCount={setCount} count={count} item={props.items} value={value} />
    </Suspense>
 </>


)
}
const mapStateToProps = (state) => {
return {
catalog: state.catalog[0],
items: state.items,
alibabaCatalog:state.alibabaCatalog[0]
}
}
function mapDispatchToProps(dispatch) {
return bindActionCreators({ fetchCatalog, fetchItems,fetchCatalogAlibaba }, dispatch)
}
export default connect(mapStateToProps, mapDispatchToProps)(Catalog)

// getItems={getItems}
