import React from 'react'

const NewsItem =(props)=> {
    let { title, description, imageUrl, url, author, publishedAt, source } = props
    return (
      <>
        <div className="my-3 mx-5">
          <div className="card" style={{ width: '18rem'}} >
            <div style={{
              display: "flex",
              justifyContent: "flex-end",
              position: "absolute",
              right: "0"
            }}>
              {/* <span  style={{zIndex:'1', left:"90%"}} className="position-absolute top-0 translate-middle badge rounded-pill bg-danger"> */}
              <span className=" badge rounded-pill bg-danger">
                {source}</span>
            </div>
            <img src={imageUrl ? imageUrl : "https://content.api.news/v3/images/bin/618be687f9026b84c39b2fdeeaecec41"} className="card-img-top" alt="..." />
            <div className="card-body">
              <h5 className="card-title">{title}...

              </h5>
              <p className="card-text">{description}...</p>
              <p className="card-text"><small className="text-body-secondary">By {author} on {new Date(publishedAt).toGMTString()}</small></p>
              <a rel="noreferrer" href={url} target='_blank' className="btn btn-sm btn-primary">Read more</a>
            </div>
          </div>
        </div>
      </>
    )
  }

export default NewsItem
