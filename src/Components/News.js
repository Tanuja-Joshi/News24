import React, { useState, useEffect } from 'react'
import NewsItem from './NewsItem'
import Spinner from './Spinner';
import PropTypes from 'prop-types'
import InfiniteScroll from 'react-infinite-scroll-component'

const News = (props) => {
    const[articles, setArticles] = useState([])
    const[loading, setLoading] = useState(true)
    const[page, setPage] = useState(1)
    const[totalResults, setTotalResults] = useState(0)

    const capitalizeFirstLetter = (string) => {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }

    const updateNews = async () => {
        props.setProgress(10)
        const url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${props.apiKey}&page=${page + 1}&pageSize=${props.pageSize}`
        setLoading(true)
        let data = await fetch(url)
        props.setProgress(30)
        let parsedData = await data.json();
        props.setProgress(70)
        setArticles(parsedData.articles)
        setTotalResults(parsedData.totalResults)
        setLoading(false)
        props.setProgress(100)
    }
    useEffect(() => {
        document.title = `${capitalizeFirstLetter(props.category)} - News App`
        updateNews();
       // eslint-disable-next-line
    }, [])
    const fetchData = async () => {
        const url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${props.apiKey}&page=${page + 1}&pageSize=${props.pageSize}`
        setPage(page + 1 )
        let data = await fetch(url)
        let parsedData = await data.json();
        setArticles(articles.concat(parsedData.articles))
            setTotalResults(parsedData.totalResults)
    }
    return (
        <>
            <div className="conatiner my-3">
                <h1 className="text-center" style={{ margin: '35px', marginTop:'90px' }}>News App- Top {capitalizeFirstLetter(props.category)} Headlines </h1>
                {loading && <Spinner />}
                <InfiniteScroll
                    dataLength={articles.length}
                    next={fetchData}
                    hasMore={articles.length !== totalResults}
                    loader={<Spinner />}
                >
                    <div className="container">
                        <div className="row">
                            {articles.map((element, index) => {
                                return <div className="col md-3" key={index}>
                                    <NewsItem title={element.title ? element.title.slice(0, 30) : ""}
                                        description={element.description ? element.description.slice(0, 80) : ""}
                                        imageUrl={element.urlToImage}
                                        url={element.url} author={element.author ? element.author : "Unknown"}
                                        publishedAt={element.publishedAt}
                                        source={element.source.name} />
                                </div>
                            })}
                        </div>
                    </div>
                </InfiniteScroll>
            </div>
        </>
    )
            }

News.defaultProps = {
    country: "in",
    pageSize: 5,
    category: 'general',
}
News.propTypes = {
    country: PropTypes.string,
    pageSize: PropTypes.number,
    category: PropTypes.string,
}
export default News
