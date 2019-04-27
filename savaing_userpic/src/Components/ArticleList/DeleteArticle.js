import React from "react";
import {
  BrowserRouter as Router,
  Redirect,
  Route,
  Link
} from "react-router-dom";
import { connect } from 'react-redux';
import firebase from '../../Utilities/firebase'
import { deleteArticle, fetchArticles } from '../../Actions/FileAction';

const firestore = firebase.firestore();
class DeleteArticle extends React.Component {
  constructor(props){
    super(props);
    this.props.fetchArticles()
    this.state = {
      redirectToHome : false
    }
  }
  successDelete = () =>{
    this.setState({
      redirectToHome : true
    })
  }
  render() {

        const id = this.props.match.params.id;
        console.log('fileid',id)
        const articles = this.props.articles;
        console.log('articledelete',articles)
        const user = firebase.auth().currentUser;
       // const currentUser = this.props.currentUser;
        //console.log('userid',currentUser)
        const currentArticle =  articles.find( item => item.id == id);
        
        
        let allowToDelete = false;
        if(user && currentArticle !== undefined){
          if(user.id === currentArticle.id){
            allowToDelete = true;
          }
        }

    return (
      <React.Fragment>
        { (this.state.redirectToHome || !allowToDelete) &&  <Redirect to={`/`}/> }
        { currentArticle === undefined ? (
          <div>404 - Content not found</div>
        ) : (
          <div>
            <h3>
              Are you sure you want to delete "{currentArticle.title}"?
            </h3>
            <button onClick={this.props.deleteArticle.bind(this,currentArticle.id,this.successDelete)}>Yes</button> <Link to={`/article/${currentArticle.id}`}>Cancel</Link>
            <hr />
        </div>
        )}
      </React.Fragment>
    );
  }
}

const mapStateToProps = state =>({
    articles : state.files,
  user : state.currentUser
})


const mapDispatchToProps = {
    fetchArticles,
  deleteArticle
}

export default connect(mapStateToProps,mapDispatchToProps) (DeleteArticle);