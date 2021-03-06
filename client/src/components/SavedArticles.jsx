import React, { Component } from 'react';
import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faStroopwafel } from '@fortawesome/free-solid-svg-icons'

library.add(faStroopwafel)

class SavedArticles extends Component {


    constructor(props){
        super(props);
        console.log(props)
        this.state={
            data:this.props.data
        }
    }

    componentWillReceiveProps=(props)=>{
      const {data} = this.props;
      if(this.state.data!==data){
        console.log('differnet dtaa')
        this.setState({data:props.data});
      }
    }




  render() {
    return (
      <div className="container">
       <h2 className="text-center pt-5 pb-5"><FontAwesomeIcon icon="stroopwafel"/> Saved Articles</h2>  
       {Object.values(this.state.data).map((type,index) => {
            return (
              <div className="card" key={index}>
                  <div className="card-body text-center">
                      <div className="row">
                      <div className="col-md-3"><b>{type.title}</b></div>
                      <div className="col-md-3"><b>{type.date}</b></div>
                      <div className="col-md-3"><a href={type.url} className="btn btn-primary" ><small>Visit</small></a></div>
                      <div className="col-md-3"><button className="btn btn-secondary" onClick={()=>{this.props.deleteClick(index)}} ><small>Delete</small></button></div>
                      </div>     
                  </div>
              </div>
            );
            }   
          )}
      </div>
    );
  }
}

export default SavedArticles;
