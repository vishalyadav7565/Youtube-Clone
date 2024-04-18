import React, { useEffect, useState } from 'react'
import './VideoPlay.css';
import video1 from '../../assets/video.mp4';
import like from '../../assets/like.png';
import dislike from '../../assets/dislike.png';
import share from '../../assets/share.png';
import save from '../../assets/save.png';
import jack from '../../assets/jack.png';
import user_profile from '../../assets/user_profile.jpg';
import { API_KEY } from '../../Data';
import moment from 'moment';
import { value_converter } from '../../Data';



export const VideoPlay = ({videoId}) => {
    const[datapi,setdataapi]=useState(0);
    const[channel,setchannel]=useState(0);
    const[comment,setcomment]=useState([]);


    const featchApiData = async()=>{
        const videoData_url =` https://youtube.googleapis.com/youtube/v3/videos?part=snippet%2CcontentDetails%2Cstatistics&id=${videoId}&key=${API_KEY}`
        await fetch(videoData_url).then(responsse=>responsse.json()).then(data=>setdataapi(data.items[0]))    }
        

          const channeldata = async()=>{
            const channeldetils_url=` https://youtube.googleapis.com/youtube/v3/channels?part=snippet%2CcontentDetails%2Cstatistics&id=${datapi.channel}&key=${API_KEY}`
            await fetch(channeldetils_url).then(res=>res.json()).then(data=>setchannel(data.items))
          }
          const commentdata = async()=>{
            const comment_url=` https://youtube.googleapis.com/youtube/v3/commentThreads?part=snippet%2Creplies&videoId=${videoId}&key=${API_KEY}`
            await fetch(comment_url).then(res=>res.json()).then(data=>setcomment(data.items))
          }
        useEffect(()=>{
            featchApiData();
            commentdata();
        },[videoId])

        useEffect(()=>{
            channeldata();
        },[datapi])
       
  return (
    <div className="play-video">
  {/* <video src={video1} controls autoPlay muted ></video> */}
  <iframe  src={`https://www.youtube.com/embed/${videoId}?autoplay=1`}  frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>
  <h3>{datapi ? datapi.snippet.title:"Title"}</h3>
  <div className='play-video-info'>
    <p>{datapi ? value_converter(datapi.statistics.viewCount):"16k"} Views &bull;{ moment (datapi?datapi.snippet.publishedAt:"2 day ago").fromNow()}</p>
    <div>
    <span><img src={like} alt=''/>{datapi? value_converter(datapi.statistics.likeCount):"10k"}</span>
    <span><img src={dislike} alt=''/>{datapi? value_converter(datapi.statistics.dislikeCount):"16k"}</span>
    <span><img src={share} alt=''/>Share</span>
    <span><img src={save} alt=''/>Save</span>
  </div>
  </div>
  <hr />
  <div className='publisher'>
    <img src={channel ? channel.snippet.thumbnails.default.url:"jack"} alt=''/>
    <div>
        <p>{datapi ? datapi.snippet.channelTitle:"Vishal"}</p>
        <span>{channel? value_converter(channel.statistics.subscriberCount):"1M"}</span>
    </div>
    <button>Subscribe</button>
  </div>
  <div className="vid-description">
    <p>{datapi ? datapi.snippet.description.slice(0,250):"Description Here"}</p>
    
    <hr />
    <h4>{datapi? value_converter(datapi.statistics.commentCount):"234"}Comments</h4>
    {
            comment.map((item,index)=>{
                return(
     <div key={index} className="comment">
        <img src={item.snippet.topLevelComment.snippet.authorProfileImageUrl} alt=''/>
        <div>
            <h3>{item.snippet.topLevelComment.snippet.authorDisplayName}<span>1 day ago</span></h3>
            <p>{item.snippet.topLevelComment.snippet.textDisplay.slice(0,250)}</p>
            <div className="comment-action">
                <img src={like} alt=''/>
                <span>{item.snippet.topLevelComment.snippet.likeCount}</span>
                <img src={dislike} alt=''/>
                <span>{item.snippet.topLevelComment.snippet.dislikeCount}</span>
            </div>
        </div>
    </div> 
                )
            })
        }
   
  </div>
    </div>
  )
}
