
import "./Home.scss"
import AboutUs from "../AboutUs/AboutUs";
import Contact from "../../components/Contact/Contact";
import Front from "./Front";

export default function Home() {

  return (
    <main className="home">
    <Front />



      <Contact />
      {/* <div className="home__table">
      <table border="0" cellpadding="10" cellspacing="0" align="center">
        <tr>
            <td align="center"></td>
        </tr>
      <tr>
        <td align="center">
            <a href="https://www.paypal.com/webapps/mpp/paypal-popup" title="How PayPal Works" onclick="javascript:window.open('https://www.paypal.com/webapps/mpp/paypal-popup','WIPaypal','toolbar=no, location=no, directories=no, status=no, menubar=no, scrollbars=yes, resizable=yes, width=1060, height=700'); return false;"><img src="https://www.paypalobjects.com/webstatic/mktg/logo/bdg_now_accepting_pp_2line_w.png" border="0" alt="Now Accepting PayPal"></img></a>
            <div className="paypal-now"><a href="https://www.paypal.com/webapps/mpp/how-paypal-works"><font size="2" face="Arial" color="#0079CD">How PayPal Works</font></a></div>
        </td>
      </tr>
      </table>
    </div> */}
      <footer className="container mt-3">
        <p className="float-end">
          {/* biome-ignore lint/a11y/useValidAnchor: <explanation> */}
          <a href="#">Back to top</a>
        </p>

        <p>
          &copy; Zilly & Friends,Inc. &middot;{" "}
          {/* biome-ignore lint/a11y/useValidAnchor: <explanation> */}
          <a href="/privacypolicy">Privacy</a> &middot; <a href="#">Terms</a>
        </p>
      </footer>
    </main>
  );
}