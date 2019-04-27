import React from 'react';
import {
  BrowserRouter as Router,
  Redirect,
  Route,
  Link
} from "react-router-dom";
import firebase from '../../Utilities/firebase'
import { connect } from 'react-redux';
import DetailPage from './DetailPage'
import { deleteArticle } from '../../Actions/FileAction'
import CommentForm from  './CommentForm'

const firestore = firebase.firestore();
class ArticleDetailList extends React.Component{

    constructor(props) {
        super(props);
        this.state = {
          messages: [],
          
        }    
    
        firestore.collection('message').onSnapshot(snapshot => {
          const messages = [];
          snapshot.docs.forEach(item => {
            const message = item.data();
            message.id = item.id;
            messages.push(message);
          })

          console.log('messageitem',messages);
       
          this.setState({
            messages: messages
          })
        })
    }
    render(){
      const user = firebase.auth().currentUser;
      
      const id = this.props.match.params.id;
      console.log('userid',user.email);
      const articles = this.state.messages;
     // console.log('articlesss',articles)
    const currentuser = articles.map(item => item);
   
     console.log('currentuser',currentuser)
       
        // let allowToDelete = false;
        // if(user){
        //   if(user.email==currentuser){
        //     allowToDelete = true;
        //   }
        // }
      
        
     return (
       
        <React.Fragment>
          <br/>
            
          <div>
          {this.state.messages.map(item => (
                  item.id==id && 
                     
                    <h5>created_by {item.created_by} </h5>
                    
                    ))}
          </div>
           <br></br>
        {/* { allowToDelete && (
            <Link to={`/home/articles/delete/${currentuser.id}`}>Delete</Link>
        ) } */}
         <hr />
        {/* <CommentForm article =  {currentArticle}/>
        {
          currentArticle.comments == undefined ? "no comment":

          
          currentArticle.comments.map( (item,index) => <div key={index}>{item.comment} by {item.author.username}</div>)
        } */}

   
      </React.Fragment>
     );
    }
}

const mapStateToProps = (state) => ({
    user: state.currentUser,
  })

// const mapDispatchToProps = {
 
//   deleteArticle
// }

export default connect (mapStateToProps)(ArticleDetailList)