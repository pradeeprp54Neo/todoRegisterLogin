
import React, { Component } from 'react'
import { Form,option } from 'react-bootstrap';
import '../App.css'
export class Todo extends Component {
    constructor(props){
        super(props);
        this.state = {list:[
            
        ],
         title: ' ',
        isUpdate: false,
        isCompleted:false
    };
        
        
    }
    

    handler = (event) =>{
        let{name, value} = event.target;
        this.setState({ [name] : value})
    }

    addtitle = () =>{
        let item = this.state.title;
       
        
        let ap_list = { title: item};
        this.setState({ list: [...this.state.list, ap_list],isCompleted:false })
        document.getElementById('title').value = "";
       

        
    }
    deletetitle=(index)=>{
       let items=this.state.list;
       items.splice(index,1);
       this.setState({
           list:items
       });
        
    }
    change=(index)=>{
        let items=this.state.list;
       items[index].isCompleted = true;
      this.setState({list:items});
    }

       
    render() {

        return (
            <div className="container">
                <h2 style={{fontSize:"50px"}}>Todo list</h2>
                
                
                 <Form>
  <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
    <Form.Label className="text-dark"> Add Todo</Form.Label>
    <Form.Control type="text" name="title"   id="title" placeholder="Add new todo"   onChange={this.handler}/>
  </Form.Group>
  <Form.Group controlId="exampleForm.ControlSelect1">
    <Form.Label className="text-dark"s> Priority</Form.Label>
    <Form.Control as="select">
      <option>1</option>
      <option>2</option>
      <option>3</option>
      <option>4</option>
      <option>5</option>
    </Form.Control>
  </Form.Group>
</Form>
              
              <button id="add_btn"  className="p1" onClick={this.addtitle.bind(this)}>Submit</button> 
               
             
             
                <table align="center" className="tab" border='1'>
                   
                <tbody>
                {this.state.list.map((item,ind)=>
                <tr key={item.title}>
                  
                    <td style={{color:"black"}}  className={item.isCompleted?"strick":''}>{item.title}</td>
                   
                    <td><button onClick={this.deletetitle.bind(this,ind)}><img src="3.jpg"   heigth="25px" width="25px" /></button> 
                    <button onClick={this.change.bind(this,ind)}>
    <img src="4.jpg"   heigth="25px" width="25px" />
                   </button></td>
                    </tr>)}</tbody>
            </table>
            </div>
        )
    }
}

export default Todo;