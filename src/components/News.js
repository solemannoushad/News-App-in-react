import React, { useEffect, useState } from 'react'
import NewsItem from './NewsItem'
import Spinner from './Spinner'
import InfiniteScroll from "react-infinite-scroll-component";


export default function News(props){

    const [articles , setArticles] = useState([]);
    const [loading , setLoading] = useState(true);
    const [page , setPage] = useState(1);
    const [totalResults , setTotalResults] = useState(0);
    const [category , setCategory] = useState(props.category);
    const [show , setShow] = useState(false);
    

    const loadData  = async ()=>{
      props.setProgress(10);
      let url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${category}&apiKey=${props.apiKey}&pageSize=${props.pageSize}&page=${page}`;

      setLoading(true);
      setShow(false);
      
      props.setProgress(40);
      let data = await fetch(url);
      props.setProgress(70);
      let parsedData = await data.json();
      props.setProgress(90);
      
      setArticles(parsedData.articles);
      setLoading(false);
      setTotalResults(parsedData.totalResults);
      setShow(true);

      props.setProgress(100);
    }

    const nextClick = ()=>{
      setPage(page+1);
      if(page +1 > Math.ceil(totalResults/props.pageSize)){
      }
      loadData();
    }

    const prevClick =  ()=>{
      setPage(page-1);

      loadData();
    }

    const changeCategory = async (element)=>{
      setCategory(element.target.value);
      setPage(1);
      setShow(false);

      props.setProgress(10);
      let url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${element.target.value}&apiKey=${props.apiKey}&pageSize=${props.pageSize}&page=1`;

      setLoading(true);
      props.setProgress(40);
      let data = await fetch(url);
      props.setProgress(70);
      let parsedData = await data.json();
      props.setProgress(90);
      
      
      setArticles(parsedData.articles);
      setLoading(false);
      setTotalResults(parsedData.totalResults);
      setShow(true);
      props.setProgress(100);
    }

    const fetchMoreData = async () => {
      let url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${category}&apiKey=${props.apiKey}&pageSize=${props.pageSize}&page=${page + 1}`;
      let data = await fetch(url);
      let parsedData = await data.json();

      setArticles(articles.concat(parsedData.articles));
      setPage(page + 1);
      
    };

    
    useEffect(()=>{
      loadData();
    } , [])


    return (
      <>
          <h2 className='container text-center'>{`News App - Top ${category} Headlines`}</h2>
          <div className="container d-flex justify-content-between">
            <div></div>
            <div>
              <select className="form-select" aria-label="Default select example" onChange={changeCategory}>
                <option value="sports">Sports</option>
                <option value="business">Business</option>
                <option value="general">General</option>
                <option value="entertainment">Entertainment</option>
                <option value="health">Health</option>
                <option value="science">Science</option>
                <option value="technology">Technology</option>
              </select>
            </div>
          </div>

        <InfiniteScroll
          dataLength={articles.length}
          next={fetchMoreData}
          hasMore={articles.length < totalResults}
          loader={<Spinner/>}
        >

          {loading && <Spinner/>}

          <div className='container d-flex flex-row flex-wrap justify-content-center'>

              {show && articles.map((element)=>{
                  return <div key={element.url}>
                  <NewsItem title = {element.title} desc = {element.description} url = {element.url} imgUrl = {element.urlToImage} author={element.author} time={element.publishedAt}/>
                  </div>
              })}
          </div>

        </InfiniteScroll>

        {/* <div className="container d-flex justify-content-between my-4 btnsCtrl">
            <button type="button" disabled={this.state.page<=1} className="btn btn-primary" onClick={this.prevClick}>&larr; Previous</button>
            <button  type="button" className="btn btn-primary" onClick={this.nextClick}>Next &rarr;</button>
        </div> */}
      </>
    )
}
