import React,{useState,useEffect} from 'react'
import { Carousel} from 'react-bootstrap';
import './ModalCorousel.css'
    export function ControlledCarousel(props){
        const [index, setIndex] = useState(0);
        const handleSelect = (selectedIndex, e) => {
          setIndex(selectedIndex);
        };
        return (
          <div className='carousel'>
              <div className = 'carousel_wrapper'>
                <Carousel activeIndex={index} onSelect={handleSelect} className="carousel_modal">
                  <Carousel.Item className='Modal_item'>
                    <img
                      className="block"
                      src={props.img}
                      alt="First slide"
                    />
                  </Carousel.Item>
                  <Carousel.Item className='Modal_item'> 
                    <img
                      className="block"
                      src={props.img}
                      alt="Second slide"
                    />
                  </Carousel.Item>
                </Carousel>
            </div>
          </div>
          
        );
      }
