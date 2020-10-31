import React, { Component } from 'react';   

import DropDownComponent from './../reusableComponents/dropdownComponent'
import {Categories, Manufacturers} from './../modeldata/model';
import {HttpService} from './../Service/httpService';
import {Route, Link, Switch, Redirect} from 'react-router-dom';

class ProductComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {   
            ProductRowId:0,            
            ProductId: 0,
            ProductName: '',
            CategoryName: '',
            Manufacturer: '',
            BasePrice:0,   
            Description:'',
            categories: Categories,
            manufacturers:Manufacturers,
            products:[],
            receivedContactNumber:0
       }

       this.serv =  new HttpService();
    }

    componentDidMount=()=>{
        // logic for read the route parameter
        let id = this.props.match.params.id;
        this.setState({receivedContactNumber:id})
        console.log(`Contact Component is mounted`);
        this.serv.getData().then((response)=> {

            this.setState({products: response.data});  

            if(this.state.receivedContactNumber >= 0)
            {
                let prd = this.state.products[this.state.receivedContactNumber];
                this.setState({ProductRowId:prd.ProductRowId});
                this.setState({ProductId:prd.ProductId});
                this.setState({ProductName:prd.ProductName});
                this.setState({CategoryName:prd.CategoryName});
                this.setState({Manufacturer:prd.Manufacturer});
                this.setState({BasePrice:prd.BasePrice});
                this.setState({Description:prd.Description});
            }

        }).catch((error) => {
            this.setState({errorMessage: error});
        });


    }
    componentWillUnmount=()=>{
        console.log(`Contact Component is un mounted`);
    }


    handleChanges=(evt)=>{
        this.setState({[evt.target.name]:evt.target.value},()=>{});
    }

    clear=()=>{
        debugger;
        this.setState({ProductId:0});
        this.setState({ProductName:''});
        this.setState({CategoryName:''});
        this.setState({Manufacturer:''});
        this.setState({BasePrice:0});
        this.setState({Description:''});
        // subscribe to the promise
        this.serv.getData().then((response)=> {
            this.setState({products: response.data});  
        }).catch((error) => {
            this.setState({errorMessage: error});
        });
      
    }


    save=()=>{
        // to read product values and update it in products array
        var prd = {
             ProductRowId:this.state.ProductRowId,
             ProductId: this.state.ProductId,
             ProductName: this.state.ProductName,
             CategoryName: this.state.CategoryName,
             Manufacturer: this.state.Manufacturer,
             Description:this.state.Description,
             BasePrice: this.state.BasePrice   
        };
        //debugger;

        if(this.state.receivedContactNumber === '-1')
        {
            this.serv.postData(prd)
            .then((response)=> {
                console.log(`Received Data ${JSON.stringify(response.data)}`);
                this.props.history.push('/'); 
            })
            .catch((error)=> {
                this.setState({errorMessage: error});
            });
        }
        else
        {
            this.serv.putData(prd)
            .then((response)=> {
                console.log(`Received Data ${JSON.stringify(response.data)}`);
                this.props.history.push('/'); 
            })
            .catch((error)=> {
                this.setState({errorMessage: error});
            });
        }

    }

    getSelectedCategory=(val)=>{
        this.setState({CategoryName: val}, ()=>{});
    }
    
    getSelectedManufacturer=(val)=>{
        this.setState({Manufacturer: val}, ()=>{});
    }

    render() { 
        return (  
            <div className="container">
            <form>
                <div className="form-group">
                   <label>Product Row Id</label>
                   <input type="text" value={this.state.ProductRowId} 
                   name="ProductRowId"
                   className="form-control" onChange={this.handleChanges.bind(this)}/>
               </div>

               <div className="form-group">
                   <label>Product Id</label>
                   <input type="text" value={this.state.ProductId} 
                   name="ProductId"
                   className="form-control" onChange={this.handleChanges.bind(this)}/>
               </div>
               <div className="form-group">
                   <label>Product Name</label>
                   <input type="text" value={this.state.ProductName} 
                   name="ProductName"
                   className="form-control" onChange={this.handleChanges.bind(this)}/>
               </div>
               <div className="form-group">
                   <label>Category Name</label>
                   <DropDownComponent data={this.state.CategoryName} 
                   dataSource={this.state.categories}
                   selectedValue={this.getSelectedCategory.bind(this)}
                   ></DropDownComponent>
                  {/*  <select type="text" value={this.state.CategoryName} 
                   name="CategoryName"
                   className="form-control" onChange={this.handleChanges.bind(this)}>
                     {
                         this.state.categories.map((cat,idx)=> (
                             <option key={idx}>{cat}</option>
                         ))
                     }
                   </select>*/}
               </div>
               <div className="form-group">
                   <label>Manufacturer Name</label>
                   <DropDownComponent data={this.state.Manufacturer} 
                   dataSource={this.state.manufacturers}
                   selectedValue={this.getSelectedManufacturer.bind(this)} 
                   ></DropDownComponent>
                  {/* <select type="text" value={this.state.Manufacturer} 
                   name="Manufacturer"
                   className="form-control" onChange={this.handleChanges.bind(this)}>
                   {
                       this.state.manufacturers.map((man,idx)=> (
                           <option key={idx}>{man}</option>
                       ))
                   }
               </select> */}
               </div>
               <div className="form-group">
                   <label>Base Price</label>
                   <input type="text" value={this.state.BasePrice}
                   name="BasePrice"
                   className="form-control" onChange={this.handleChanges.bind(this)}/>
               </div>
               <div className="form-group">
                   <label>Description</label>
                   <input type="text" value={this.state.Description}
                   name="Description"
                   className="form-control" onChange={this.handleChanges.bind(this)}/>
               </div>

               <div className="form-group">
               <input type="button" value="Clear" className="btn btn-warning"
                 onClick={this.clear.bind(this)}/>
               <input type="button" value="Save" className="btn btn-success"
               onClick={this.save.bind(this)}/>
               
             </div>
             <div>
                  <Link to={"/"}>Go to Home Page</Link>
              </div>
              </form>


            </div>
        );
    }
}
 
export default ProductComponent;