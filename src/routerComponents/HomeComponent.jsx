import React, { Component } from 'react';
import {HttpService} from './../Service/httpService';

class HomeComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {  
            products:[],
            columnHeaders:[],
            errorMessage:''   
        }

        this.serv =  new HttpService();
    }

    componentDidMount=()=>{
        //debugger;

        this.loadData();
         
   }

   // call the method from the HttpService class 
   loadData=()=> {
            //debugger;
            // subscribe to the promise
            this.serv.getData().then((response)=> {

                this.setState({products: response.data});  

                if(this.state.products.length !== 0)
                {
                // read first record from array and read its schema
                var firstRecord = this.state.products[0];
                var recProperties = Object.keys(firstRecord);
                // iterate over the properties and add in colunHeaders
                
                this.setState({columnHeaders: recProperties}, ()=> {
                    
                });
                }

                }).catch((error) => {
                    this.setState({errorMessage: error});
                });
    
    }

    handleEditSelected=(index)=>{
        this.props.history.push('/create/' + index);
    }

    handleDeleteSelected=(index)=>{
        let delProduct = this.state.products[index];
        this.serv.deleteData(delProduct.ProductRowId).then((resp)=>{
            this.loadData();
        });
    }

    render() { 
        return (
            <div>
              <table className="table table-bordered table-striped table-dark">
                   <thead>
                      <tr>
                        {
                            this.state.columnHeaders.map((col,idx)=> (
                                <th key={idx}>{col}</th>
                            ))
                        }
                      </tr>
                   </thead> 
                   <tbody>
                   {
                    this.state.products.map((prd,idx) => (
                       <tr key={idx}>
                          {
                              this.state.columnHeaders.map((col,i)=> (
                                  <td key={i}>{prd[col]}</td>
                              ))
                          } 
                          <td>
                          <input type="Button" value = "edit"
                                    onClick = {() => this.handleEditSelected(idx)}/>
                          </td>
                          <td>
                          <input type="Button" value = "delete"
                                    onClick = {() => this.handleDeleteSelected(idx)}/>
                          </td>
                       </tr> 
                    ))
                }
                   </tbody>
              </table>

            </div>
        );
    }
}
 
export default HomeComponent;