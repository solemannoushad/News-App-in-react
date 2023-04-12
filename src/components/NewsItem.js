import React from 'react'

export default function NewsItem(props){
    let {title , desc , url , imgUrl , author , time} = props;
    return (
      <div>
        <div className="card my-4 mx-4" style={{width: "18rem"}}>
            <img src={imgUrl?imgUrl:"https://img.freepik.com/free-vector/404-error-template-flat-style_23-2147757130.jpg?w=1380&t=st=1675600130~exp=1675600730~hmac=42f430ea0897910470c356f3a0b525383db89267bda6a8adcea84b898f635597"} className="card-img-top" alt="..."/>
            <div className="card-body">
                <h5 className="card-title">{title}</h5>
                <p>{`By ${author?author:"Unknown"} at ${new Date(time).toUTCString()}`}</p>
                <hr/>
                <p className="card-text">{desc}</p>
                <a href={url} target="_blank" rel="noreferrer" className="btn btn-primary">Read More</a>
            </div>
        </div>
      </div>
    )
}
