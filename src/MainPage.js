import React from 'react';
import { Context } from '.';

const MainPage=(props)=>{
    const global=React.useContext(Context);
    const [statusone,Set_one]=React.useState("");
    const [statustwo,Set_two]=React.useState("");
    React.useEffect(()=>{
        global.ws.onmessage=(e)=>{
            let received=JSON.parse(e.data);
            if(received.type==="INITIAL"){
            Set_one(received.status_1);
            Set_two(received.status_2);}
            console.log("RECEIVED TOGGLE FE",received);
            if(received.type==="TOGGLE"){
                if(received.button==="one"){
                    Set_one(received.status);
                }else{
                    Set_two(received.status);
                }
            }
            
        }
    },[])
    const handleLogout=()=>{
        localStorage.clear();
        props.history.push("/");
        
    }
    const handleToggle=(e)=>{
        let send_toggle={type:"TOGGLE",button:e.target.id};
        global.ws.send(JSON.stringify(send_toggle));
    }
    return (
        <>
        <div class="alert alert-primary">
            Toggle Page<span className="float-right"><button ckassName="btn btn-danger" onClick={handleLogout}>Logout</button></span>
        </div>
        <div className="row" style={{marginTop:"150px"}}>
            <div className="col-4"></div>
            <div className="col-4">
            <button id="one" className="btn btn-outline-success btn-block"  onClick={handleToggle}>Button One {statusone==="enabled" ? "Disable":"Enable"}</button>
                <button id="two" className="btn btn-outline-success btn-block"  onClick={handleToggle}>Button Two {statustwo==="enabled" ? "Disable":"Enable"}</button>
            </div>
            <div className="col-4"></div>
        </div>
        </>
        
    )
}

export default MainPage;