import React from "react";
import "./Banner.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { Carousel, Container } from "react-bootstrap";
import cube from "./img/cube.jpg";
import laptop from "./img/laptop.jpg";
import phone from "./img/phone.jpg";
import kids1 from "./img/kids1.jpg";
import ps5  from "./img/ps5.jpg"
let imgBanner = [
  {img:cube},
  {img:laptop},
  {img:phone},
  {img:kids1},
  {img:ps5},
]
export default function Banner() {
  return (
    <div className="banner_wrap">
      <div className="banner__div">
        <div className="banner_line">
          <p className="banner_text">
            NIHAO KG - крупнейший оптовый интернет магазин Китая
          </p>
        </div>
        <Carousel className="carousel">
        {
        imgBanner.map((el)=>{
          return(
            <Carousel.Item>
            <img className="d-block" src={el.img} />
            </Carousel.Item>
          )
        })
        }
        </Carousel>
      </div>
    </div>
  );
}
