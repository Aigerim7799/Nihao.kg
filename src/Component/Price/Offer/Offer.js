import React from 'react'
import price from '../Price.module.css'

export default function Offer (props){
    return(
        <>
        <div className="katalogContentMoby">
        {props.items.note !== undefined ?
            props.items.note &&
            props.items.note.map((element) => {
              return (
                <>
                  {element !== null
                    ? element?.OtapiItemInfoSubList.Content &&
                      element?.OtapiItemInfoSubList.Content.map(
                        (el) => {
                            if(el.PromotionPrice!==undefined){
                          return (
                            <div className="katalogItem">
                              <div
                                style={
                                  el
                                    ? {
                                        background: `url(${el.Pictures[0].Url})center/cover `,
                                      }
                                    : null
                                }
                                className="catalogItemImg dop"
                              >
                                <p>{el ? el.BrandName : null}</p>
                              </div>
                              <div className="like">
                                <p>
                                  {el.Price
                                    ? el.Price.ConvertedPrice
                                    : null}
                                </p>
                                {/*<img src={like} />*/}
                              </div>
                            </div>
                          )
                        }
                        else{ return null}
                    }
                      )
                    : null}
                </>
              );
            })
          : null}
      </div>
        
    </>
    )
}

