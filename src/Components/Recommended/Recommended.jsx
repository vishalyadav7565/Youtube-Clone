import React, { useEffect, useState } from 'react';
import './Recommended.css';
import { Await, Link } from 'react-router-dom';
import { API_KEY } from '../../Data';

export const Recommended = ({ categoryId }) => {
    const [dataId, setDataApi] = useState([]);

    const fetchData = async () => {
        console.log(categoryId,'line number 10');
        const url = `https://youtube.googleapis.com/youtube/v3/videos?part=snippet%2CcontentDetails%2Cstatistics&chart=mostPopular&maxResults=50&regionCode=IN&videoCategoryId=${categoryId}&key=${API_KEY}`;
        await fetch(url).then(res=>res.json()).then(data=>setDataApi(data.items))
        console.log(dataId,"line 11");
    };

    useEffect(() => {
        fetchData();
    },[]);

    return (
        <div className="recommended">
            {dataId.map((item, index) => (
                <Link to={`video/${item.snippet.categoryId}/${item.id}`} key={index} className="side-video-list">
                    <img src={item.snippet.thumbnails.default.url} alt='' />
                    <div className="vid-info">
                        <h4>{item.snippet.title}</h4>
                        <p>{item.snippet.channelTitle}</p>
                        <p>{item.statistics.viewCount} views</p>
                    </div>
                </Link>
            ))}
        </div>
    );
};
