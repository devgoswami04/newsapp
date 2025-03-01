import React, { Component } from 'react'
import NewItem from './NewItem'
import Spinner from './Spinner';
import PropTypes from 'prop-types'


export class News extends Component {
   static defaultProps={
    country:'us',
    pageSize:8,
    category:"general"
   };
   static propTypes={
    country:PropTypes.string,
    pageSize:PropTypes.number,
    category:PropTypes.string
   };
    constructor() {
        super();
        this.state = {
            articles: [],
            loading: false,
            page:1
        }
    }
    async componentDidMount(){
        let url=`https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=fb5c69c601754b2abbc697ac218221c3&pageSize=${this.props.pageSize}`;
        this.setState({loading:true});
        let data= await fetch(url);
        let parsedData=await data.json();
        this.setState({articles: parsedData.articles,
            totalResults:parsedData.totalResults,
            loading:false
        });
    }
    handleNextclick=async ()=>{
    
        let url=`https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=fb5c69c601754b2abbc697ac218221c3&page= ${this.state.page+1}&pageSize=${this.props.pageSize}`;
        this.setState({loading:true});
        let data= await fetch(url);
        let parsedData=await data.json();
        this.setState({page:this.state.page+1,
            articles: parsedData.articles,
            loading:false
        })}
    handlePreviousclick=async ()=>{
        let url=`https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=fb5c69c601754b2abbc697ac218221c3&page= ${this.state.page-1}&pageSize=${this.props.pageSize}`;
        this.setState({loading:true});
        let data= await fetch(url);
        let parsedData=await data.json();
        this.setState({page:this.state.page-1,
            articles: parsedData.articles,
            loading:false
        })
    }
    render() {
        return (

            <div className="container my-3 ">
                <h1 className="text-center">Chronicle-Top Headlines</h1>
                {this.state.loading && <Spinner/>}
                <div className="row ">
                    {!this.state.loading && this.state.articles.map((element) => {
                       return  <div className="col-md-4" key={element.url}>
                            <NewItem  title={element.title?element.title.slice(0,40):""} description={element.description?element.description.slice(0,80):""} imageUrl={element.urlToImage} newsUrl={element.url} author={element.author} date={element.publishedAt} source={element.source.name} />
                        </div>
                    })}
                    <div className="container d-flex justify-content-between">
                    <button disabled={this.state.page<=1} type="button" className="btn btn-dark" onClick={this.handlePreviousclick}>&larr; previous</button>
                    <button disabled={this.state.page+1>Math.ceil(this.state.totalResults/this.props.pageSize)} type="button" className="btn btn-dark" onClick={this.handleNextclick}>next &rarr;</button>
                    </div>
                </div>
            </div>
        )
    }
}

export default News
