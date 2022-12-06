import React, { Fragment, useState } from "react";
import "./Home.css";
import car1 from "../../images/car1.png";
import slide1 from "../../images/slide1.png";
import slide2 from "../../images/brochure1.png";
import slide3 from "../../images/brochure2.png";
import slide4 from "../../images/brochure3.png";
import slide5 from "../../images/brochure4.png";
import slide6 from "../../images/slide2.png";
import contact from "../../images/contact.png";
import service from "../../images/service.png";

const Home = () => {
  const [slideNum, setSlideNum] = useState(1);

  function forwardSlide() {
    setSlideNum(slideNum === 3 ? (slideNum - 3) + 1 : slideNum + 1);
  }
  function backwardSlide() {
    setSlideNum(slideNum === 1 ? (slideNum + 3) - 1 : slideNum - 1);
  }

  return (
    <Fragment>
      <div className="Hero">
        <img src={car1} alt="" />
        <div>
          <h1>Movement that Inspires</h1>
          <p> Luxury Car Experience Like Never Before </p>

          <button>BOOK A TEST DRIVE</button>
        </div>
      </div>

      <div className="vehicle">
        <h2 style={{ textAlign: "center" }}>
          Comfort Redefined - Experience the Compelling Luxury with Kia Today *
        </h2>

        <h3 className="ourVehicles">Our Vehicles</h3>

        <div className="vehiclesContainer">
          <img src={slide1} alt="" />
          <img src={slide2} alt="" />
          <img src={slide3} alt="" />
          <img src={slide4} alt="" />
          <img src={slide5} alt="" />
          <img src={slide6} alt="" />
        </div>
      </div>

      <div className="Service">
        <h1
          style={{ width: "80%", margin: "auto", paddingTop: "2vmin" }}
          className="ServicesHeading"
        >
          Services
        </h1>
        <div className="SlideContainerDiv">
          <a href={`#slide${slideNum}`}>
            <button id="Backward" onClick={forwardSlide}> </button>{" "}
          </a>

          <div className="SlideContainer">
            <div className="slides" id="slide1">
              <img src={service} alt="" />
              <div className="slid-content">
                <h1>
                  Cost
                  <br />
                </h1>
                <h1 style={{ color: "#BB162B" }}>Calculator</h1>
                <br />
                <p>
                  We can help you calculate the indicative
                  <br />
                  cost for periodic maitenance service
                </p>
              </div>
            </div>

            <div className="slides" id="slide2">
              <img src={service} alt="" />
              <div className="slid-content">
                <h1>
                  Cost
                  <br />
                </h1>
                <h1 style={{ color: "#BB162B" }}>Calculator</h1>
                <br />
                <p>
                  We can help you calculate the indicative
                  <br />
                  cost for periodic maitenance service
                </p>
              </div>
            </div>

            <div className="slides" id="slide3">
              <img src={service} alt="" />
              <div className="slid-content">
                <h1>
                  Cost
                  <br />
                </h1>
                <h1 style={{ color: "#BB162B" }}>Calculator</h1>
                <br />
                <p>
                  We can help you calculate the indicative
                  <br />
                  cost for periodic maitenance service
                </p>
              </div>
            </div>
          </div>
          <a href={`#slide${slideNum}`}>
            {" "}
            <button id="Forward" onClick={backwardSlide}> </button>{" "}
          </a>
        </div>
      </div>

      <div className="ContactUs">
        <h1 style={{ margin: "4vmax", width: "80%" }}>Contact Us</h1>
        <div className="ContactForm">
          <div>
            <input type="text" placeholder="FIRST NAME" />
            <input type="text" placeholder="LAST NAME" />
          </div>
          <div>
            <input type="email" placeholder="E-MAIL" />
            <input type="number" placeholder="CONTACT NUMBER" />
          </div>
          <div>
            <textarea placeholder="TEXT" />
            <button>SEND</button>
          </div>
        </div>

        <div className="Contact">
          <img src={contact} alt="" />
          <div>
            <p>
              <strong>West Coast</strong>
              <br />
              Sg Highway North
              <br />
              D1, GANESH MARIDIAN S.G. HIGHWAY,
              <br />
              OPP KARGIL PETROL PUMP
              <br />
              97233 16316
              <br />
              Kia.sales2@karnavati.co
              <br />
              west-coast-sghighway.in.kia
            </p>
          </div>
        </div>
      </div>

      <div className="achievement">
        <div className="score">
          <h1 style={{ color: "#BB162B" }}>11620</h1>
          <p>Car Sold </p>
        </div>
        <div className="score">
          <h1>100%</h1>
          <p>
            Customer
            <br />
            Satisfaction{" "}
          </p>
        </div>
        <div className="score">
          <h1>42350</h1>
          <p>
            Service
            <br /> Completed{" "}
          </p>
        </div>
      </div>

      <div className="responsive-map">
        <iframe
          title="Map"
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2822.7806761080233!2d-93.29138368446431!3d44.96844997909819!
  2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x52b32b6ee2c87c91%3A0xc20dff2748d2bd92!2sWalker+Art+Center!5e0!3m2!1sen!2sus!
  4v1514524647889"
          width="600"
          height="450"
          frameBorder="0"
          style={{ border: 0 }}
          allowFullScreen
        ></iframe>
      </div>
    </Fragment>
  );
};

export default Home;
