import React, { useState, useEffect } from "react";
import { db, auth } from "../../firebase/firebase";
import firebase from "firebase";import "./Register.scss"
import google_logo from "../../Assets/Google.png"
import Input from '../../Components/Input/Input'
import {Link, useNavigate, Navigate} from "react-router-dom";

function Register() {

    const navigate = useNavigate();
    
    
    const [username, setUsername] = useState("");
    const [lastname, setlastname] = useState("");
    const [email, setEmail] = useState("");
    var pattern = new RegExp(/^[0-9\b]+$/);
    const [error_msg, seterror_msg] = useState("");
    const [password, setPassword] = useState("");
    const [password1, setPassword1] = useState("");
    const [user, setUser] = useState(null);
    
    
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
  
  
    const SignUp = (event) => {
      event.preventDefault();
       if (password.length < 6) {
        // setPassword("");
        // setPassword1("");
        seterror_msg("Please use a strong password, min. 6 characters");
      } else if (password !== password1) {
        seterror_msg("Passwords do not match");
      //   setPassword("");
      //   setPassword1("");
      } else if (username === "") {
        seterror_msg("Please Enter your First Name");
      } else if (lastname === "") {
          seterror_msg("Please Enter your Last Name");
        }
         else {
        auth
          .createUserWithEmailAndPassword(email, password)
          .then((cred) => {
            
            navigate("/login");
            return db.collection("Hospital").doc(cred.user.uid).set({
              Name: username,
              Lastname: lastname,
              Email: email,         
            });
            
            
          })
          .catch((error) => {
            seterror_msg("");
            let errorCode = error.code;
            if (errorCode === "auth/email-already-in-use") {
              seterror_msg("Email Already Exists!");
              setEmail("");
              setPassword("");
              setPassword1("");
            } else if (errorCode === "auth/invalid-email") {
              seterror_msg("Please Enter a Valid mail id");
              setEmail("");
              setPassword("");
              setPassword1("");
            } else if (
              (errorCode === "auth/invalid-password") |
              (errorCode === "auth/weak-password")
            ) {
              seterror_msg("Enter a Strong Password");
              setPassword("");
              setPassword1("");
            }
          });
      }
    };
  
    const google = (event) => {
      event.preventDefault();
      var provider = new firebase.auth.GoogleAuthProvider();
     
      firebase
        .auth()
        .signInWithPopup(provider)
        .then((result) => {
          /** @type {firebase.auth.OAuthCredential} */
          console.log(result);
          var credential = result.credential;
          var token = credential.accessToken;
          var user = result.user;
          localStorage.setItem("npg_auth", token);
          navigate("/");
          return db.collection("Hospital").doc(result.user.uid).set({
            Name: user.displayName,
            Email: user.email,
            
          });
        })
        .catch((error) => alert(error.message));
       
    };

    const npg_auth = localStorage.getItem('npg_auth');

  return (
    <div className='register'>
      {npg_auth ? <Navigate replace to="/" /> : null}
        <div className="content">
            <h2>
                Create Account
            </h2>
            <div className="mt-1 navigate">

            <Link to="/Login">Already have an Account? Signin</Link>
            </div>

        <div className="form">        
                
                <div className="name_sec">
                <div class="input_section">
                    <Input 
                    type="text" 
                    placeholder="First Name" 
                    value={username}
                    onChange={(e) => setUsername(e.target.value)} />                  
                </div>
                <div class="input_section">
                    <Input 
                    type="text" 
                    placeholder="Last Name" 
                    value={lastname}
                    onChange={(e) => setlastname(e.target.value)} />                  
                </div>
                </div>

            

                <div class="input_section">
                    <Input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />                  
                </div>
                <div className="input_section">
                <Input type="password" placeholder="Create Password" value={password} onChange={(e) => setPassword(e.target.value)} />
                </div>

                <div className="input_section">
                <Input type="password" placeholder="Retype password" value={password1} onChange={(e) => setPassword1(e.target.value)} />
                </div>

               
        </div>

        <div className="error"><p>
        {error_msg}
          </p> </div>
               

        <button onClick={SignUp} className='signin'>

            Sign up
            
        </button>

        
        <p className='mt-1' >or</p>
        
        <div className="s-google mt-1" onClick={google}>
            <img  src={google_logo} alt="google image" />
            <p>Sign up with Google</p>
        </div>

        </div>
    </div>
  )
}

export default Register