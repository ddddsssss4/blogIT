import { Link, useNavigate ,} from "react-router-dom"
import { ChangeEvent, useState } from "react";
import axios from "axios";
import { SignupInput } from '@100xdevs/medium-common';

export const Auth = () =>{
 const navigate = useNavigate();
 const [postInputs,SetPostInputs] = useState<SignupInput>({
 name: "",
 username: "",
 password: ""
 })

 
 async function sendRequest() {
  try {
      const response = await axios.post("https://backend.saraswatdevesh98.workers.dev/api/v1/user/signup", postInputs);
   
      
      
localStorage.setItem("token", response.data);


      navigate("/blogs");
  } catch(e) {
      alert("Error while signing up")
      // alert the user here that the request failed
  }
}
  return (
    <>
            <div className="  h-screen flex flex-col justify-center items-center">
              <div className = "font-extrabold text-2xl">
                Create An Account
              </div>
              <div className="text-slate-500 ">
                Already Have An Account? {<Link to="/Signin">Blogs</Link>}
              </div>
              <LabelledInput label = "Name" placeholder="Devesh" onChange = {(e) =>{
                SetPostInputs({
                  ...postInputs,
                  name: e.target.value
                })
              }}/>
              <LabelledInput label = "username" placeholder = "harkirat@gmail.com" 
              onChange = {(e) => {
                SetPostInputs({
                  ...postInputs,
                  username: e.target.value
                })
              }}/>
               <LabelledInput label = "Password" type = {"password"} placeholder = "123456" 
              onChange = {(e) => {
                SetPostInputs({
                  ...postInputs,
                  password: e.target.value
                })
              }}/>
               <button onClick={sendRequest} type="button" className="mt-8 w-32 text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700">Sign up</button>
        </div>
   </>
  )
}

interface LabelledInputType{
    label : string;
    placeholder: string;
    onChange: (e: 
    ChangeEvent<HTMLInputElement>
  ) =>
    void;
    type? :string;
  
}

    function LabelledInput({label , placeholder , onChange , type}:LabelledInputType){
      return <div>
        <label className="block mb-2 text-sm text-black font-semibold pt-4">{label}</label>
        <input onChange={onChange} type={type || "text"} id="first_name" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" placeholder={placeholder} required />
      </div>
    }


