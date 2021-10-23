import React from "react";
import axios from "axios";

const regForEmail=RegExp(/^[^\s@]+@[^\s@]+\.[^\s@]+$/);
class Login extends React.Component {
constructor(props) {
super(props);
this.state = { Regist:[],email: null, password:null,errors:{
    email:'',
    password:''
} };
}
handle=(event)=> {
let {name, value} = event.target;
let errors = this.state.errors;

switch(name){
    case 'email': errors.email = regForEmail.test(value)?'':'Enter Email correctly'
    break;
    case 'password': errors.password = value.length < 8?'Password must contain atleast 8 characters':''
    break;
    default:
        break;
}
this.setState({[name]:value, errors});
}
componentDidMount=async()=>{
    try{
    const URL="http://localhost:3001/Registration" 
    const res=await axios.get(URL);
    this.setState({Regist:res.data})
}
catch(err){
    console.log(err)
}
}
handleSubmit = async(event)=> {
event.preventDefault();
let {Regist}=this.state;
if (Regist.find(x=>x.email === this.state.email) && Regist.find(x=>x.password === this.state.password)) {
    alert('Login successful');
this.props.history.push("/todo");
} else {
alert('Incorrect Credntials!');
}
}
render() {
    const {errors} = this.state;
return (
<div style={{backgroundColor:"cadetblue",height:700}}>
    <div className="container jumbotron mt-5 ">
<form onSubmit={this.handleSubmit}>
    <h2>Login Here!</h2>
<div className="row " style={{padding:"10px"}}>
            <label  className=" col-lg-2">   Email : </label>
           <input type="text" name="email" className="col-lg-2"  value={this.state.email}
onChange={this.handle.bind()} required autoFocus/> {errors.email.length>0 && 
            <span style={{color:'red'}}>{errors.email}</span>}
           
           </div>
<div className="row" style={{padding:"10px"}}>
            <label  className=" col-lg-2">Password : </label>
            <input type="password" name="password"  className="col-lg-2" value={this.state.password}
onChange={this.handle.bind()} required/>
            {errors.password.length>0 && 
            <span style={{color:'red'}}>{errors.password}</span>}</div>
            <button
            className = "btn btn-primary"
>
Submit
</button>
            </form>
            </div>
</div>
);
}
}
export default Login;