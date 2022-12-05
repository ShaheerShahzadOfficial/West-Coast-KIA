import React from "react";
import "./footer.css";
import logo from "../images/wlogo.png";
import { Link } from "react-router-dom";
const Footer = () => {
  return (
    <div className="Footer">
      <div className="forResponsive">
      <div className="First">
        <img src={logo} alt="Logo" />

        <div className="Page-Link">
          <Link>About</Link>
          <Link>CONFIGURE</Link>
          <Link>FIND A DEALER</Link>
          <Link>TEST DRIVE</Link>
          <Link>CONTACT US</Link>
        </div>

        <div className="SocialLink">
          <button>
            <i
              class="fa fa-facebook"
              style={{
                fontSize: "30px",
                color: "white",
                textShadow: "2px 2px 4px #000000"
              }}
            ></i>
          </button>
          <button>
            <i
              class="fa fa-instagram"
              style={{
                fontSize: "30px",
                color: "white",
                textShadow: "2px 2px 4px #000000"
              }}
            ></i>
          </button>
          <button>
            <i
              class="fa fa-twitter"
              style={{
                fontSize: "30px",
                color: "white",
                textShadow: "2px 2px 4px #000000"
              }}
            ></i>
          </button>
          <button>
            <i
              class="fa fa-pinterest"
              style={{
                fontSize: "30px",
                color: "white",
                textShadow: "2px 2px 4px #000000"
              }}
            ></i>
          </button>
          <button>
            <i
              class="fa fa-youtube-play"
              style={{
                fontSize: "30px",
                color: "white",
                textShadow: "2px 2px 4px #000000"
              }}
            ></i>
          </button>
        </div>
      </div>

      <div className="Middle">
      <h4>Subscribe To Our Newsletter</h4>

        <div>
          <input type="email" placeholder="Email Address" required={true} />
          <button>oo</button>
        </div>
      </div>
      </div>
      <div className="Last">
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
  );
};

export default Footer;
