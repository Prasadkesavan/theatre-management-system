import React from 'react';
import {useDispatch} from 'react-redux';
import {adminActions} from "../../store";
import Authform from './Authform';
import { sendAdminAuthRequest } from '../../api-helpers/api-helpers';
import { useNavigate } from 'react-router';
const Admin = () => {
  const navigate =useNavigate();
  const dispatch =useDispatch();
  const onResReceived =(data)=>{
    console.log(data);
    dispatch(adminActions.login());
    localStorage.setItem("adminId",data.id)
    localStorage.setItem("token",data.token);
    navigate("/");
  }
  const getData = (data) => {
    console.log("Admin", data);
    sendAdminAuthRequest(data.inputs)
      .then(onResReceived)
      .catch((err) => console.log(err));
  };
  
  return (
   <div> <Authform onSubmit ={getData} isAdmin={true} />

</div>
  );
};

export default Admin;


