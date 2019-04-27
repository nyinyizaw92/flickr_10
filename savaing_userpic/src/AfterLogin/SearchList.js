import React from 'react'
import { connect } from  'react-redux'
import SeriesList from './SeriesList'

class SearchList extends React.Component{

    constructor(props){
        super(props);
        this.state ={
            series:[],
            seriesName:'',
            isfetching:false
        }
    }
        handlechange = (e) =>{
            this.setState({seriesName:e.target.value,isfetching:true})
            const files = this.props.files;
            const result = files.map(item => item.title)
            console.log('reslultlist',result)
            if(`files=$e.target.value`){
               
                  this.setState({
                    series:files,
                    isfetching:false
                  })
            }
        }
    
    render(){
        console.log('finalres',this.state.series)
        const search = {
            width:'600px',
            marginTop:'-2px',
            marginLeft:'150px'
        }

        // const files = this.props.files;
        // const result = files.map(item => item.title)
        // console.log('resultlist',result)
        return(
            <React.Fragment>
                <input type="text" style={search}  
                onChange={this.handlechange} 
                placeholder="Search"></input>
                <button class="btn btn-sm btn-success">Search</button>

                {
                     !this.state.isfetching && <SeriesList list={this.state.series}/>
                 }
            </React.Fragment>

            
          
        )
    }
}

const mapStateToProps = state =>({
    files:state.files
})

export default connect(mapStateToProps)(SearchList)