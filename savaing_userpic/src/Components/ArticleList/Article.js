import React from 'react';
import {
    BrowserRouter as Router,
    Redirect,
    Route,
    Link
  } from "react-router-dom";
  import ArticleDetailList from "./ArticleDetailList";
  import DeleteArticle from './DeleteArticle'

export default function Article(props) {
    const item = props.message;
    console.log(props.ownmessage);

   
    return (
   <Router>
     <br></br>
        <div class="col-sm-3" key={item.id}>
            <br></br>
                {
                    item.image && 
                    <Link to={"/home/articles/"+item.id}>
                      <img src={item.image} alt="message content" 
                      class="img img-responsive"
                       style={{width:'250px',height:'250px'}}/>
                    </Link>
                   // <h4>{item.created_by}</h4>
                }
                
        </div>

        <Route path="/home/articles/:id" exact component={ArticleDetailList} />
        <Route
              path="/home/articles/delete/:id"
              exact
              component={DeleteArticle}
            />

        </Router>
    )
}
