import React from 'react'
import {Link} from 'react-router-dom'

{/* <Link to={"/articles/"+this.props.article.id}>{this.props.article.title} </Link> */}

const SeriesItem = ({ series }) => (
    <li >
       
        <Link to={"/articles/"+series.id} style={{color:'black'}}>
           {series.title}
        </Link>
       
       
    </li>
)

const SeriesList = (props) =>{
    return(
        <div>
            <ul>
                {props.list.map(series => (
                    <SeriesItem  series={series} key={series.id}/>
                ))}
            </ul>
        </div>
    )
}

export default SeriesList