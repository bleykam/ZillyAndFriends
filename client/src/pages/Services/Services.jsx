import "./Services.scss";
import { Link } from "react-router-dom";
import arlo from '../../assets/ella.png';
import brownie from '../../assets/leah.png';
import neshama from '../../assets/neshama.png';
import lulu from "../../assets/lulu3.png";
import Boarding from "./Boarding";
import DayCare from "./DayCare";


const Services = () => {

  return (
    <main className="services">
      <section className="services__cards">
        <section className="section__left">
          
          <div className="sample-card-left ">
            <h3 className="sample-card-left__title">Daycare and Boarding</h3>
            <ul className="sample-card__desc-list">
              <li className="sample-card__desc-item">Pets cared for per the client specifications. </li>
              <li className="sample-card__desc-item">Your pet will stay in a spacious apartment with plenty of room to play and relax.</li>
              <li className="sample-card__desc-item">Your pet will have access to two dog one next to the building the other just two minutes away.</li>
              <li className="sample-card__desc-item">Your fur babies are welcome to lounge on the furniture. They can sleep wherever they are most comfortable. My goal is to create a homely atmosphere.</li>
              <li className="sample-card__desc-item">Your pet will will be free to roam.  Pets are only crated at the request of the owner.  Owner must provide the crate.  </li>
              <li className="sample-card__desc-item">Pictures and updates via text or email (if requested)</li>
              <li className="sample-card__desc-item">Your pet will receive all the love, attention, and exercise they need!</li>
            </ul>
          </div>
        </section>

        


        <section className="section__right">
          <div className="section__image-div-right">
            <img className="section__image-right-top" src={neshama} alt="section image" />
          </div>
          <div className="sample-card-right">
            <h3 className="sample-card-right__title">Rates</h3>
            <ul className="sample-card__desc-list">
              <li className="sample-card__desc-item"> Daycare -$30 up to 4hrs, $45 for up to 12hrs. ($25 extra for each additional dog).</li>
              <li className="sample-card__desc-item">After 12hrs boarding boarding rates will apply.</li>
              <li className="sample-card__desc-item"> Boarding - $65/85* per every 24 hours of boarding ($50/55* extra for each additional dog).</li>
              <li className="sample-card__desc-item"> Holiday Rates:.</li>
                <ul>
                  <li> Daycare -$40 up to 4hrs, $55 for up to 12hrs. ($30 extra for each additional dog)</li>
                  <li>Boarding - $85 per every 24 hours of boarding ($55 extra for each additional dog)</li>
                </ul>
            </ul>
          </div>
          <div className="section__image-div">
            <img className="section__image-right-bottom" src={neshama} alt="section image" />
          </div>
        </section>

      </section>

      {/* <div className="sample-card__button"><Link to="/booking" className="sample-card__link"><button className="services__button">Book Now!</button></Link></div> */}

    </main>
  );
}

export default Services;