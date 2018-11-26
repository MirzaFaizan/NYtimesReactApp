import React, { Component } from 'react';
import './App.css';
import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faStroopwafel } from '@fortawesome/free-solid-svg-icons'
import DisplayFetchedArticles from './components/FetchedArticles';
import SavedArticles from './components/SavedArticles';
library.add(faStroopwafel)

class App extends Component {

  componentDidMount=()=>{
    console.log("initial search")
    const base = "https://api.nytimes.com/svc/search/v2/articlesearch.json?q="
    const key = "d640232085e54b988cd43ba866cb35e8";
    fetch(base + "Hello world&api-key=" + key)
    .then(results => {
      return results.json();
    })
    .then(data =>{
      console.log(data);
      this.setState({
        outputData:data,
        loading:false
      })
    }).catch(err=>{
      console.log(err)
    });
    
  }


  componentWillMount=()=>{
    fetch('/articles/ShowArticles', {
      method: 'GET',
    })
    .then(res=>res.json())
    .then(res=>{
   
      if(res){
        console.log('Stored Articles', res)
       this.setState({
        SavedData:res
       })
      };
    }
    );
  }


  constructor(props){
    super(props);
    this.state={
      outputData:{},
      input:'',
      items:0,
      loading:true,
      SavedData:{}
    }
  }

  searchNYtimes=()=>{
    console.log("about to search")
    const base = "https://api.nytimes.com/svc/search/v2/articlesearch.json?q="
    const key = "d640232085e54b988cd43ba866cb35e8";
    fetch(base + this.state.input + "&api-key=" + key)
    .then(results => {
      return results.json();
    })
    .then(data =>{
      console.log(data);
      this.setState({
        outputData:data,
        loading:false
      })
      this.forceUpdate();
    }).catch(err=>{
      console.log(err)
    })
  }


  //Delete and save ka yhn
          //delete Click Function
          deleteClick = (index) => {
            console.log(this.state.SavedData[index])
            
            
            let temp = this.state.SavedData[index];
            
            var details = {
                'id': temp._id,
            };
            
           
            var formBody = [];
            for (var property in details) {
              var encodedKey = encodeURIComponent(property);
              var encodedValue = encodeURIComponent(details[property]);
              formBody.push(encodedKey + "=" + encodedValue);
            }
            formBody = formBody.join("&");
            
            
            fetch('/articles/DeleteArticle', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8' 
              },
              body: formBody
            })
            .then(res=>res.json())
            .then(res=>{
           
              if(res){
                console.log('Response', res)
              };
            }
            );

            let tempSavedData = this.state.SavedData;
            tempSavedData.pop(index);
            console.log('after delete local varibale',tempSavedData);

            this.setState({SavedData:tempSavedData});

        }




//save Click Function
    saveClick = (index) => {
      console.log(this.state.outputData.response.docs[index])
      let temp = this.state.outputData.response.docs[index];
      var details = {
          'title': temp.headline.main,
          'date': temp.pub_date,
          'url': temp.web_url,
      };
      
     
      var formBody = [];
      for (var property in details) {
        var encodedKey = encodeURIComponent(property);
        var encodedValue = encodeURIComponent(details[property]);
        formBody.push(encodedKey + "=" + encodedValue);
      }
      formBody = formBody.join("&");
      
      
      fetch('/articles', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8' 
        },
        body: formBody
      })
      .then(res=>res.json())
      .then(res=>{
     
        if(res){
          console.log('Response', res)
        };
      }
      );

      let tempSavedData = this.state.SavedData;
      tempSavedData.push({
        title:temp.headline.main,
        date:temp.pub_date,
        url:temp.web_url
      })
      this.setState({SavedData:tempSavedData})

  }

  //hanlde changes

  handleInputChange=(e)=>{
    this.setState({input:e.target.value})
  }

  //reset form
  resetForm=()=>{
    this.setState({
      input:'',
    })
  }




  render() {
    return (
      <div className="container">
       <h1 className="text-center pt-5 pb-5"><FontAwesomeIcon icon="stroopwafel"/> New York Times Search</h1>  
        <div className="card">
          <div className="card-body">
            <h2 className="card-title">Search Parameters</h2>
              <div className="form-group">
                <label htmlFor="TermInput">Search Term</label>
                <input 
                  type="text" 
                  className="form-control" 
                  id="TermSearch"  
                  placeholder="e.g Tide Pods"
                  onChange={e => this.handleInputChange(e)}
                  value={this.state.input}
                  />
              </div>

            <button className="btn btn-primary mr-1" onClick={this.searchNYtimes}>Search</button>
            <button className="btn btn-primary" onClick={this.resetForm}>Clear Form</button>
          </div>
        </div>
        {
        (this.state.loading)===true? <p className="text-center"><b>Loading......</b></p>:<DisplayFetchedArticles data={this.state.outputData.response.docs} saveClick={this.saveClick} />
        }
        <SavedArticles data={this.state.SavedData} deleteClick={this.deleteClick}/>
      </div>
    );
  }
}

export default App;
