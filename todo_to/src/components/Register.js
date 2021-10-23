import React, { Component } from 'react'
import axios from 'axios';

const regForEmail=RegExp(/^[^\s@]+@[^\s@]+\.[^\s@]+$/);
export class Registration extends Component {
    constructor(props){
        super(props);
        this.state={
            Regist:[],
            firstname:null,
            lastname1:null,
            username:null,
            email:null,
            password:null,
            conpassword:null,
            id:null,
            errors:{
                firstname:'',
                lastname1:'',
                username:'',
                email:'',
                password:'',
                conpassword:'',
                
            }
        }
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
        handler=(event)=>{
            const {name,value}=event.target;
            let errors=this.state.errors;
            switch(name){
                case 'firstname':
                    errors.firstname=value.length<4?'firstname is not valid':'';
                    break;
                case 'lastname1':
                    errors.lastname1=value.length<2?'lastname is not valid':'';
                    break;
                case 'username':
                    errors.username=value.length<4?'enter username correctly':'';
                    break;    
                case 'email':
                    errors.email=regForEmail.test(value)?'':'Email is not valid';
                    break;
                case 'password':
                        errors.password=value.length<8?'Password must me 8 chanrater long':'';
                        break;
                case 'conpassword':
                        errors.conpassword=value!==this.state.password?'Password is not matched':'';
                        break;
                
                default:        
                    break;
            }
            this.setState({errors,[name]:value},()=>{
                console.log(errors)
            })
        }
        add=async(event)=>{
            event.preventDefault();
            let formData={firstname:this.state.firstname, lastname1:this.state.lastname1,
            username:this.state.username, email:this.state.email,password:this.state.password,conpassword:this.state.conpassword};
            try{
            const URL="http://localhost:3001/Registration";
               const resData=await axios.post(URL,formData)
                const res=await axios.get(URL)
                this.setState({Regist:res.data,firstname:'', lastname1:'',username:'',email:'',password:'',conpassword:''})
                alert("done")
                
            }
            
            catch(err){
                console.log(err)
            }
        }
         changeedlogin=()=>{
             this.props.history.push('/login')
         }
    render() {
        const {errors}=this.state;
        return (
            
            <div className="co">
            <div className="con container jumbotron h" >
            <h2>Sign Up</h2>
                <form onSubmit={this.add} style={{padding:"10px"}} validate>
                   <div className="row" style={{padding:"10px"}}>
                <label className=" col-lg-2">    FirstName : </label> 
            <input type="text" name="firstname" className="col-lg-2" onChange={this.handler} required/> 
            {errors.firstname.length>0 && 
            <span style={{color:'red'}}>{errors.firstname}</span>}</div>
             <label className="col-lg-2">    LastName : </label> 
            <input type="text" name="lastname1" className="col-lg-2" onChange={this.handler} required/> 
            {errors.lastname1.length>0 && 
            <span style={{color:'red'}}>{errors.lastname1}</span>}<br/> 
            <div className="row " style={{padding:"10px"}}>
             <label className=" col-lg-2">  username </label> 
            <input type="text" name="username" className="col-lg-2  " onChange={this.handler} required/> 
            {errors.username.length>0 && 
            <span style={{color:'red'}}>{errors.username}</span>}
            </div>
                       <div className="row " style={{padding:"10px"}}>
            <label  className=" col-lg-2">   Email : </label>
           <input type="text" name="email" className="col-lg-2"  onChange={this.handler} required/> {errors.email.length>0 && 
            <span style={{color:'red'}}>{errors.email}</span>}
           
           </div>
                       <div className="row" style={{padding:"10px"}}>
            <label  className=" col-lg-2">Password : </label>
            <input type="password" name="password"  className="col-lg-2" onChange={this.handler} required/>
            {errors.password.length>0 && 
            <span style={{color:'red'}}>{errors.password}</span>}</div>
              <div className="row" style={{padding:"10px"}}>
            <label  className=" col-lg-2"> ConfirmPassword : </label>
            <input type="password" name="conpassword" className=" col-lg-2" onChange={this.handler} required/>
            {errors.conpassword.length>0 && 
            <span style={{color:'red'}}>{errors.conpassword}</span>}<br/></div>
                       
            <input type="submit" value="Register" className=" btn btn-info col-md-3 " />
            <input type="submit" value="login" className=" btn btn-success col-md-3 "onClick={this.changeedlogin.bind()} />
             
            </form>
                
            </div>
           
            </div>
        )
    }
}

export default Registration
