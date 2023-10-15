import React, { useEffect, useState } from 'react';
import { Box, Grid } from '@mui/material';
import { useSearchParams,Link } from 'react-router-dom';
import axios from 'axios';
import Post from './Post';
const Posts = () => {
    const [posts,setPosts] = useState([]);
    const [searchParams] = useSearchParams();
    const category = searchParams.get('category')
    console.log()
    useEffect(()=>{

        const fetchData = async()=>{
            const result = await axios.get('http://localhost:4000/posts',{headers:{params:category || ''}})
            .then(res=>{
                setPosts(res.data)
            })
            .catch(err=>{
                console.log(err)
            })
            console.log(posts)
        }
        fetchData();
    },[category])
  return (
    <>
    {
        posts && posts.length > 0 ? posts.map(post=>{
            return(
                <Grid item lg={3} sm={4} xs={12}>
                    <Link to={`details/${post._id}`} style={{textDecoration:'none',color:"inherit"}}>
                    <Post post={post}/>

                    </Link>
                </Grid>
            )            
        }):<Box style={{color:'#878787',margin:'30px 80px',fontsize:18}}>No Data Available</Box>
            
        
    }
    </>
  )
}

export default Posts