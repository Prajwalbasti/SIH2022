// import React, { useState, useEffect } from "react";
// import { db, auth } from "../../firebase/firebase";
// import './Profile.scss';



// function Profile({user1}){
//   const [username, setUsername] = useState("");
//   const [phone, setPhone] = useState("");
//   const [email, setEmail] = useState("");
//   const [address1,setAddress1]=useState("");
//   const [address2,setAddress2]=useState("");
//   const [state,setState]=useState("");
//   const [country,setCountry]=useState("");
//   const [postalcode,setPostalCode]=useState("");
//   const [msg,setMsg]=useState("");

//   if(msg.length>0)
//   {
//     setTimeout(function(){ setMsg("") }, 5000);
//   }

//   const Update = () => {
//          db.collection("System Admins").doc().update({
//           Name: username,
//           Phone: phone,
//           Email: email,
//           Address1:address1,
//           Address2:address2,
//           State:state,
//           Country:country,
//           PostalCode:postalcode
//         }).then(function () {
//           setMsg("Account Updated");
//         });
        
//       }
//       useEffect(()=>{

//         db.collection('System Admins').doc().onSnapshot(snapshot =>{
//           setUsername(snapshot.data().Name) 
//           setPhone(snapshot.data().Phone) 
//           setEmail(snapshot.data().Email) 
//           setAddress1(snapshot.data().Address1) 
//           setAddress2(snapshot.data().Address2) 
//           setState(snapshot.data().State) 
//           setCountry(snapshot.data().Country) 
//           setPostalCode(snapshot.data().PostalCode) 
//         })
//       },[user1]);
      
//     return (

//       <div className="profile">
//       <div className="form">
//       <div className="col1">
        
//       <input
//           type="username"
//           placeholder="👤 Name"
//           value={username}
//           onChange={(e) => setUsername(e.target.value)}
//         />
        
//         <br></br>
//         <input
//           type="phone"
//           placeholder="☎️ Contact Number "
//           value={phone}
//           onChange={(e) => setPhone(e.target.value)}
//         />
//         <br></br>
//         <input
//           type="address1"
//           placeholder="📍 Address Line 1 "
//           value={address1}
//           onChange={(e) => setAddress1(e.target.value)}
//         />
//         <br></br>
//         <input
//           type="state"
//           placeholder="➡️ State"
//           value={state}
//           onChange={(e) => setState(e.target.value)}
//         />
//         <br></br>
//        </div>
//        <div className="profile_button">
//         <button onClick={Update}>Update</button>
//         <div className ="update">
//           {msg}
//           </div>
//         </div>  

//         <div className="col2">
//         <input
//           type="email"
//           placeholder="📧 Email "
//           value={email}
//           onChange={(e) => setEmail(e.target.value)}
//         />
//         <br></br>
//         <input
//           type="postalcode"
//           placeholder="📮 Postal Code "
//           value={postalcode}
//           onChange={(e) => setPostalCode(e.target.value)}
//         />
//         <br></br>
//          <input
//           type="address2"
//           placeholder="📍 Address Line 2"
//           value={address2}
//           onChange={(e) => setAddress2(e.target.value)}
//         />
//         <br></br>
//         <input
//           type="country"
//           placeholder="➡️ Country "
//           value={country}
//           onChange={(e) => setCountry(e.target.value)}
//         />
//         </div>
//         <br></br>    
//         </div> 
       
//   </div>
// )
// }

// export default Profile;


import React, { useState, useEffect } from "react";
import { db, auth } from "../../firebase/firebase";
import './Profile.scss';
import Sidebar from "../../Components/Sidebar/Sidebar";
import logo from './../../Assets/drdo.svg'


function Profile({user1}){
  const [username, setUsername] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [address1,setAddress1]=useState("");
  const [address2,setAddress2]=useState("");
  const [state,setState]=useState("");
  const [country,setCountry]=useState("");
  const [postalcode,setPostalCode]=useState("");
  const [msg,setMsg]=useState("");

  if(msg.length>0)
  {
    setTimeout(function(){ setMsg("") }, 5000);
  }

  const Update = () => {
         db.collection("System Admins").doc().update({
          Name: username,
          Phone: phone,
          Email: email,
          Address1:address1,
          Address2:address2,
          State:state,
          Country:country,
          PostalCode:postalcode
        }).then(function () {
          setMsg("Account Updated");
        });
        
      }
      useEffect(()=>{

        db.collection('System Admins').doc().onSnapshot(snapshot =>{
          setUsername(snapshot.data().Name) 
          setPhone(snapshot.data().Phone) 
          setEmail(snapshot.data().Email) 
          setAddress1(snapshot.data().Address1) 
          setAddress2(snapshot.data().Address2) 
          setState(snapshot.data().State) 
          setCountry(snapshot.data().Country) 
          setPostalCode(snapshot.data().PostalCode) 
        })
      },[user1]);
      
    return (

      <div className='feature-soon'>
          <div className='logoMain'>
            <img src={logo} alt="" />
          </div>
        

              <div className="col1">
        
               <input
                  type="username"
                  placeholder="👤 Name"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                />
                
                <br></br>
                <input
                  type="phone"
                  placeholder="☎️ Contact Number "
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                />
                <br></br>
                <input
                  type="address1"
                  placeholder="📍 Address Line 1 "
                  value={address1}
                  onChange={(e) => setAddress1(e.target.value)}
                />
                <br></br>
                <input
                  type="state"
                  placeholder="➡️ State"
                  value={state}
                  onChange={(e) => setState(e.target.value)}
                />
                <br></br>
               </div>
               <div className="profile_button">
                <button onClick={Update}>Update</button>
                <div className ="update">
                  {msg}
                  </div>
                </div>  
        
                <div className="col2">
                <input
                  type="email"
                  placeholder="📧 Email "
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
                <br></br>
                <input
                  type="postalcode"
                  placeholder="📮 Postal Code "
                  value={postalcode}
                  onChange={(e) => setPostalCode(e.target.value)}
                />
                <br></br>
                 <input
                  type="address2"
                  placeholder="📍 Address Line 2"
                  value={address2}
                  onChange={(e) => setAddress2(e.target.value)}
                />
                <br></br>
                <input
                  type="country"
                  placeholder="➡️ Country "
                  value={country}
                  onChange={(e) => setCountry(e.target.value)}
                />
                </div>
                <br></br>    





      </div>
 )
}

export default Profile;