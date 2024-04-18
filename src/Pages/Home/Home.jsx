import React, { useState } from 'react'
import './Home.css';
import { Sidebar } from '../../Components/Sidebar/Sidebar';
import { Feed } from '../../Components/Feed/Feed';

export const Home = ({sidebar}) => {
    const[category,setcategory] = useState(0);
  return (
    <>
    <Sidebar sidebar={sidebar} category={category} setcategory={setcategory}/>
    <div className={`container ${sidebar?"":'larger-container'}`}>
        <Feed category={category}/>
    </div>
    </>
  )
}
