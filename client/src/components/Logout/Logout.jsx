import "./Logout.scss";
import { useNavigate } from "react-router-dom";
import { supabase } from "../../utils";
import { Button } from 'react-bootstrap';


export const Logout= () => {
  const navigate = useNavigate();

  async function signOut() {
    const { error } = await supabase.auth.signOut({
      options: {
        scope: 'global',
      }
    });
    
    signOut();
    navigate("/");
  };
}

export default Logout;
