import React from 'react';
import { Context } from '.';



const App=(props)=> {
  const global=React.useContext(Context);
  const initial={email:"",pass:""};//initial state of login form
  const [login_details,setDetails]=React.useState(initial);//State for Login details of the user
  const handleChange=(e)=>{
    setDetails({...login_details,[e.target.id]:e.target.value});//To Handle change for email id and password during login
  }
  const sendData=()=>{
    let body={"type":"LOGIN","email":login_details.email,"pass":login_details.pass}
    setDetails(initial);
    global.ws.send(JSON.stringify(body));
  }
  React.useEffect(()=>{
    global.ws.onmessage=(e)=>{
      let received=JSON.parse(e.data);
      if(received.type==="LOGIN"){
      if(received.message==="not found")
        alert("user doesnt exist");
      else{
        if(received.message==="Success"){
          alert("Login Success");
          localStorage.setItem('user',received.user);
          props.history.push("/page");
        }
        else
          alert("Incorrect Password");
    }
  }
  }
  },[global.ws.onmessage])
  return (
    <div>
      <h1>Login</h1>
      <div className="row" style={{marginTop:"100px"}}>
        <div className="col"></div>
        <div className="col">
          <div>
            <label htmlFor="email">Email:</label>
          <input type="text" className="form-control" id="email" onChange={handleChange} value={login_details.email} placeholder="login Email.."></input>
        </div>
        <div className="form-group" style={{marginTop:"20px"}}>
        <label htmlFor="pass">Password:</label>
          <input type="password" className="form-control" id="pass"onChange={handleChange} value={login_details.pass} placeholder="Password.."></input>
        </div>
      <button className="btn btn-primary" onClick={sendData}>Login</button>
      </div>
      <div className="col"></div>
      </div>
    </div>
  );
}

export default App;
