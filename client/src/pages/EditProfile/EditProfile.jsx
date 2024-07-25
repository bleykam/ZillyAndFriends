import Profile from "../Profile/Profile";
import Create from "../CreateProfile/CreateProfile";
import "./EditProfile.scss";
import { getProfile } from "../../utils";
import AddPet from "../AddPet/AddPet";
import { InputField } from "../../components/formFields/formFields";
import { useState } from "react";
export default function EditProfile() {
    const userObj = localStorage.getItem('sb-fjfdhtjlejguyzhbijav-auth-token');
    const user = JSON.parse(userObj)
    const userId = user?.user?.id;
    const[profile, setProfile] = getProfile(user);
    const [values, setValues] = useState({ first_name: profile?.first_name, last_name: profile?.last_name, email: user?.user.email ||"", phone_number:"", pet_name: "", pet_age:"", pet_weight:"", breed: "", energy_info:"", food_info:"", 
  vet_info:"", emergency:"", additional_info:"", med_info:"", potty_info:"", anxiety:"", micro:"", spayed_neutered:"", house_trianed:"", friendly:"", alone:""});

    console.log("PROFILE", profile)

const handleChange = (event) => {
    if (!event) {
        return;
    }
    const { name, value } = event.target;
    setValues({ ...values, [name]: value });
    
  };
    
    return (
        <div>
        <InputField  label="First Name" defaultValue={profile?.first_name} type="text" name="first_name" id="first_name" onChange={handleChange} value={values.first_name} placeholder='required'required />
        <InputField  label="Last Name" type="text" name="last_name" id="last_name" onChange={handleChange} placeholder='required' value={values.last_name} required  />
        <InputField  label="Phone Number" type='tel' name="phone_number" id="phone_number" placeholder='required' onChange={handleChange} value={values.phone_number} required  />
        </div>
    );
}
