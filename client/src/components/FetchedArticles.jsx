import React, { Component } from 'react';
import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faStroopwafel } from '@fortawesome/free-solid-svg-icons'

library.add(faStroopwafel)

class FetchedArticles extends Component {

    constructor(props){
        super(props);
        this.state={
            fetchedData:this.props.data
        }
    }


    componentWillReceiveProps=(props)=>{
      const {data} = this.props;
      if(this.state.fetchedData!==data){
        console.log('differnet dtaa')
        this.setState({fetchedData:props.data});
      }
    }



    

  render() {
    return (
      <div className="container">
       <h2 className="text-center pt-5 pb-5"><FontAwesomeIcon icon="stroopwafel"/> Retrived Articles</h2>
       {Object.values(this.state.fetchedData).map((type,index) => {
                  return (
                    <div className="card" key={index}>
                        <div className="card-body text-center">
                            <div className="row">
                            <div className="col-md-3"><b>{type.headline.main}</b></div>
                            <div className="col-md-3"><b>{type.pub_date}</b></div>
                            <div className="col-md-3"><a href={type.web_url} className="btn btn-primary" ><small>Visit</small></a></div>
                            <div className="col-md-3"><button className="btn btn-secondary" onClick={()=>{this.props.saveClick(index)}} ><small>Save</small></button></div>
                            </div>     
                        </div>
                    </div>
                  );
            }   
          )
        }
       
      </div>
    );
  }
}

export default FetchedArticles;
