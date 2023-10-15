import React, { useState,useContext,useEffect } from 'react'
import { DataContext } from '../context/DataProvider';
import { Box,TextareaAutosize,Button,styled } from '@mui/material';
import axios from 'axios';
import Comments from './Comments';
const Container = styled(Box)`
    margin-top:100px;
    display:flex;


`

const initialValues = {
    name:'',
    postId:'',
    comments:'',
    date: new Date()
}
const StyledTextArea = styled(TextareaAutosize)`
    height:100px;
    width: 100%;
    margin:0 20px;

`
const Image = styled('img')({
    width:50,
    height:50,
    borderRadius:'50%'
})
const Comment = ({post}) => {
    const [comment, setComment] = useState(initialValues); 
    const [comments,setComments] = useState([]);
    const [toggle,setToggle] = useState(false)
    const url = 'https://static.thenounproject.com/png/12017-200.png'
    const {account} = useContext(DataContext);
    const handleChange =(e)=>{
        setComment({
            ...comment,
            name:account.username,
            postId:post._id,
            comments:e.target.value

        })
    }
    useEffect(()=>{
        const getData = async()=>{
            await axios.get(`http://localhost:4000/comments/${post._id}`,{headers:{id:post._id}})
            .then(res=>{
                setComments(res.data);
            })
            .catch(err=>{
                console.log(err)
            })
        }
        getData()
    },[post,toggle])
    const addComment = async(e)=>{
        await axios.post('http://localhost:4000/comment/new',comment)
        .then(res=>{
            setComment(initialValues)

        })
        .catch(err=>{
            console.log(err)
        })
        setToggle(prevState =>!prevState);
    }

  return (
    <Box>
        <Container>
            <Image src={url} alt='dp' />
            <StyledTextArea
                minRows={5}
                placeholder='whats on your mind'
                value={comment.comments}
                onChange={(e)=>handleChange(e)}
            />
            <Button variant='contained' 
            color='primary' 
            style={{height:"40px"}}
            size="medium"
            onClick={(e)=>addComment(e)}
            >Post</Button>
        </Container>
        <Box>
            {
                comments&& comments.length > 0 && comments.map(comment=>{
                    return(
                        <Comments comment={comment} setToggle={setToggle} />

                    )
                })
            }
        </Box>
    </Box>
  )
}

export default Comment