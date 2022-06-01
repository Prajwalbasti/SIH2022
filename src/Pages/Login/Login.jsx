import React, {useState} from 'react'
import Input from '../../Components/Input/Input'
import "./Login.scss"
import visibility from "../../Assets/Vector.png"
import google from "../../Assets/Google.png"


function Login() {

    const [email, setEmail] = useState()
    const [password, setPassword] = useState()


  return (
    <div className='login'>
        <div className="content">
            <h2>
                Welcome Back
            </h2>

        <div className="form">
                

                <div class="input_section">
                    <Input type="text" placeholder="Email" onChange={(e) => setEmail(e.target.value)} />                  
                </div>
                <div className="input_section">
                <Input type="password" placeholder="Password" onChange={(e) => setPassword(e.target.value)} />
                <img src={visibility} />
                </div>
                <div className="forgot">
            <a>Forgot Password?</a>
        </div>
        </div>

        

        <button className='signin'>
            Sign In
        </button>

        <p className='mt-1'>New here? Create account</p>

        
        <p className='mt-1' >or</p>
        
        <div className="s-google mt-1">
            <img src={google} alt="google image" />
            <p>Sign in with Google</p>
        </div>

        </div>
    </div>
  )
}

export default Login