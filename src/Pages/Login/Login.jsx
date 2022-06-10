import React, { useState, useEffect } from "react";
import Input from '../../Components/Input/Input'
import { db, auth } from "../../firebase/firebase";
import firebase from "firebase";
import "./Login.scss"
import visibility from "../../Assets/eye-closed.png"
import google_logo from "../../Assets/Google.png"

import {Link, useNavigate} from "react-router-dom"

function Login() {

    // const [email, setEmail] = useState()
    // const [password, setPassword] = useState()

    const navigate = useNavigate()

  const [email, setEmail] = useState("");
  var pattern = new RegExp(/^[0-9\b]+$/);
  const [error_msg, seterror_msg] = useState("");
  const [password, setPassword] = useState("");
  const [user, setUser] = useState(null);
  const [passwordShown, setPasswordShown] = useState(false);
  const [correct, setcorrect] = useState(false);
  const [isUserSignedIn, setisUserSignedIn] = useState(true);

    const defaultOptions = {
        loop: true,
        autoplay: true,
        // animationData: animationData,
        rendererSettings: {
          preserveAspectRatio: "xMidYMid slice",
        },
      };
      if (error_msg.length > 0) {
        setTimeout(function () {
          seterror_msg("");
        }, 5000);
      }


      useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged((authUser) => {
          if (authUser) {
            setUser(authUser);
          } else {
            setUser(null);
          }
        });
        return () => {
          unsubscribe();
        };
      }, [user]);
    
    
      const Login = async(event) => {
        event.preventDefault();
        console.log(event);

         await auth.signInWithEmailAndPassword(email, password)
         .then(res => {
             console.log(res);             
             navigate("/upload");
         })
         .catch((error) => {
          seterror_msg("");
          let errorCode = error.code;
          if (
            errorCode === "auth/internal-error" ||
            errorCode === "auth/invalid-email"
          ) {
            seterror_msg("Invalid Email");
            setEmail("");
            setPassword("");
          } else if (errorCode === "auth/wrong-password") {
            seterror_msg("Incorrect Password");
            setPassword("");
          } else if (errorCode === "auth/user-not-found") {
            seterror_msg("New User? Sign-Up");
            setPassword("");
            setEmail("");
          }
          else{
            navigate("/upload");
            setcorrect(!correct);
          }
        });

      };
    
    
      const google = (event) => {
        event.preventDefault();
        var provider = new firebase.auth.GoogleAuthProvider();
        
        firebase
          .auth()
          .signInWithPopup(provider)
          .then((result) => {
            /** @type {firebase.auth.OAuthCredential} */
            var credential = result.credential;
    
            var token = credential.accessToken;
            var user = result.user;
          localStorage.setItem("auth", token);

            navigate("/upload");
            return db.collection("Hospital").doc(result.user.uid).set({
              Name: user.displayName,
              Email: user.email,
            });
            
          })
          .catch((error) => alert(error.message));
          
      };

      const togglePassword = () => {
        setPasswordShown(!passwordShown);
      };
    
      const signInButton = () => {
        document.getElementById("container").classList.remove("right-panel-active");
        seterror_msg("");
      };

  return (
    <div className='login'>
        <div className="content">
            <h2>
                Welcome Back
            </h2>

        <div className="form">
                

                <div class="input_section">
                    <Input type="text" 
                     placeholder="Email"
                     value={email}
                     onChange={(e) => setEmail(e.target.value)}
                     /> 
                                     
                </div>
                <div className="input_section">
                <Input 
                    type={passwordShown ? "text" : "password"}
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    />
                <img onClick={togglePassword}  src={visibility} />
                </div>
                <div className="forgot">
            <a>Forgot Password?</a>
        </div>
        </div>

        <div className="error"> {error_msg}</div>

        <button onClick={(e) => Login(e)} className='signin'>
            Sign In
        </button>

        <p className='mt-1'>
        <Link to="/Register">New Here? Create Account</Link>
        </p>

        
        <p className='mt-1' >or</p>
        
        <div className="s-google mt-1">
            <img  onClick={google} src={google_logo} alt="google image" />
           
            <p>Sign in with Google</p>
        </div>

        </div>
    </div>
  )
}

export default Login