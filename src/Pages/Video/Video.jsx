import React from 'react'
import './Video.css';
import { VideoPlay } from '../../Components/VideoPlay/VideoPlay';
import { Recommended } from '../../Components/Recommended/Recommended';
import { useParams } from 'react-router-dom';

export const Video = () => {
  const{videoId,categoryId} = useParams();
  return (
    <div className='Video-player'>
      <VideoPlay videoId={videoId}/>
      <Recommended categoryId={categoryId}/>
    </div>
  )
}
