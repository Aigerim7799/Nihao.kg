
import React, { useState, useEffect } from 'react'
import './Telephone.css'
import like from './img/Vector-2.png'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import InfiniteScroll from 'react-infinite-scroll-component'
import { fetchItems } from '../../actions'
import loader from '../../images/load.gif' 
import { NavLink } from 'react-router-dom'




const ProductItems = (props) => {


     
     return (
          <NavLink to={'/fullinfo/'+props.el?.Id} className='katalogItem'>
          
               <div style={props.el ? { background: `url(${props.el?.Pictures ? props.el?.Pictures[0]?.Url : null})center/cover ` } : null} className='catalogItemImg dop'>
                    <p>{props.el ? props.el?.BrandName : null}</p>
               </div>
               <div className='like'>
                    <p>{props.el.Price ? props.el?.Price?.ConvertedPrice : null}</p>
                    <img src={like} />
               </div>
          
          </NavLink>
     )
}


function Telephone(props) {
     let bol = '>'
     const [data, setData] = useState()
     const [id, setId] = useState(props?.cId)
     let i = 0
     useEffect(() => {
          setData(props?.items?.note !== undefined ? props.items.note[i] : null)
          
     })
     const refresh = () => {

     }
     const nextItems = () => {
          props.setCount(props?.count + 50)
          props.fetchItems(props?.id, props?.count)
          i++
     }

   
     return (
          <>


               <div>
                    {
                         props.items.note[0] ?
                              <div>
                                   <div className='Catalogs__item'>
                                        <div className='Katalog'>
                                             <span className='catalogKatalog'>Каталог</span>
                                             <span>{bol}</span>
                                             <span>{'Taobao'}</span>
                                             <span>{bol}</span>
                                             <span>{props.value}</span>
                                        </div>
                                        <InfiniteScroll

                                             dataLength={props.items.note ? props.items.note.length : null} //This is important field to render the next data
                                             next={props.items.note[0] ? nextItems : null}
                                             hasMore={true}
                                             loader={<div style={{width:'100%', height:'100%', display:'flex', justifyContent:'center', alignItems:'center'}}><img src={loader} /></div>}
                                             endMessage={
                                                  <p style={{ textAlign: 'center' }}>
                                                       <b>Yay! You have seen it all</b>
                                                  </p>
                                             }
                                             // below props only if you need pull down functionality
                                             refreshFunction={(e) => { refresh() }}
                                             pullDownToRefresh
                                             pullDownToRefreshThreshold={50}
                                             pullDownToRefreshContent={
                                                  <h3 style={{ textAlign: 'center' }}>&#8595; Pull down to refresh</h3>
                                             }
                                             releaseToRefreshContent={
                                                  <h3 style={{ textAlign: 'center' }}>&#8593; Release to refresh</h3>
                                             }
                                        >
                                             <div className='katalogContentMoby'>
                                                  {
                                                       props?.items?.note !== undefined ?
                                                            props?.items?.note && props?.items?.note?.map(element => {

                                                                 return (
                                                                      <>
                                                                           {element !== undefined ?
                                                                                element?.Result?.Items?.Items?.Content && element?.Result?.Items.Items.Content?.map(el => {
                                                                                     if (el.PromotionPrice == undefined) {
                                                                                          return (
                                                                                               <>
                                                                                               <ProductItems id={props?.id} setId={props?.setId} el={el} setMoreInfoModal={props?.setMoreInfoModal} />
                                                                                               </>
                                                                                          )
                                                                                     } else { return null }

                                                                                }) : null
                                                                           }
                                                                      </>
                                                                 )
                                                            }) : null
                                                  }
                                             </div>
                                        </InfiniteScroll>

                                   </div>

                                   <div style={{paddingBottom:'3%'}}>
                                   <div className='Catalogs__item'>

                                        <div className="Katalog">
                                             <span>Акции</span>
                                        </div>
                                        <InfiniteScroll
                                             dataLength={props.items.note ? props.items.note.length : null} //This is important field to render the next data
                                             next={props.items.note[0] ? nextItems : null}
                                             hasMore={true}
                                             loader={<div style={{width:'100%', height:'100%', display:'flex', justifyContent:'center', alignItems:'center'}}><img src={loader} /></div>}
                                             endMessage={
                                                  <p style={{ textAlign: 'center' }}>
                                                       <b>Yay! You have seen it all</b>
                                                  </p>
                                             }
                                             // below props only if you need pull down functionality
                                             refreshFunction={(e) => { }}
                                             pullDownToRefresh
                                             pullDownToRefreshThreshold={200}
                                             pullDownToRefreshContent={
                                                  <h3 style={{ textAlign: 'center' }}>&#8595; Pull down to refresh</h3>
                                             }
                                             releaseToRefreshContent={
                                                  <h3 style={{ textAlign: 'center' }}>&#8593; Release to refresh</h3>
                                             }
                                        >
                                             <div className='katalogContentMoby'>
                                                  {
                                                       props?.items?.note !== undefined ?
                                                            props?.items?.note && props?.items?.note?.map(element => {
                                                                 return (
                                                                      <>
                                                                           {element !== undefined ?
                                                                                element?.Result?.Items?.Items?.Content && element?.Result?.Items?.Items.Content?.map(el => {

                                                                                     if (el.PromotionPrice !== undefined) {

                                                                                          return (<>
                                                                                               <ProductItems id={props?.id} setId={props?.setId} setMoreInfoModal={props?.setMoreInfoModal} el={el} />
                                                                                               </>
                                                                                               )
                                                                                     } else { return null }

                                                                                }) : null
                                                                           }
                                                                      </>
                                                                 )
                                                            }) : null
                                                  }
                                             </div>

                                        </InfiniteScroll>
                                   </div>

                                   </div>
                              </div>

                              : null
                    }
               </div>
          </>
     )


}

const mapStateToProps = (state) => {
  return {
    items: state.items,
  };
};
function mapDispatchToProps(dispatch) {
  return bindActionCreators({ fetchItems }, dispatch);
}
export default connect(mapStateToProps, mapDispatchToProps)(Telephone);
