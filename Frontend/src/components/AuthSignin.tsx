import { Link, useNavigate ,} from "react-router-dom"
import { ChangeEvent, useState } from "react";
import { SigninInput } from '@100xdevs/medium-common';
import axios from "axios";
export const Auth1 = () =>{
 const navigate = useNavigate();
 const [postInputs,SetPostInputs] = useState<SigninInput>({

 username: "",
 password: ""
 })

 async function sendRequest() {
  try {
      const response = await axios.post("https://backend.saraswatdevesh98.workers.dev/api/v1/user/signin", postInputs);
      const jwt = response.data;
      localStorage.setItem("token", jwt);
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
               Don't have an account? {<Link to="/">Blogs</Link>}
              </div>
             
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
               <button onClick={sendRequest } type ="button" className="mt-8 w-32 text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700">Sign in</button>
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


