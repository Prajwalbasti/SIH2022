import React,{useState} from 'react'
import "./Register.scss"
import google from "../../Assets/Google.png"
import Input from '../../Components/Input/Input'


function Register() {

    const [email, setEmail] = useState()
    const [password, setPassword] = useState()
    const [fName, setFName] = useState()
    const [lName, setLName] = useState()



    



  return (
    <div className='register'>
        <div className="content">
            <h2>
                Create Account
            </h2>
            <p>Already have a account? Sign in</p>

        <div className="form">        
                
                <div className="name_sec">
                <div class="input_section">
                    <Input type="text" placeholder="First Name" onChange={(e) => setFName(e.target.value)} />                  
                </div>
                <div class="input_section">
                    <Input type="text" placeholder="Last Name" onChange={(e) => setLName(e.target.value)} />                  
                </div>
                </div>

            

                <div class="input_section">
                    <Input type="text" placeholder="Email" onChange={(e) => setEmail(e.target.value)} />                  
                </div>
                <div className="input_section">
                <Input type="password" placeholder="Create Password" onChange={(e) => setPassword(e.target.value)} />
                </div>

                <div className="input_section">
                <Input type="password" placeholder="Retype password" onChange={(e) => setPassword(e.target.value)} />
                </div>

                <div className="forgot">
            <a>Forgot Password?</a>
        </div>
        </div>

        

        <button className='signin'>
            Sign In
        </button>

        
        <p className='mt-1' >or</p>
        
        <div className="s-google mt-1">
            <img src={google} alt="google image" />
            <p>Sign in with Google</p>
        </div>

        </div>
    </div>
  )
}

export default Register