import React ,{useState,useEffect,useContext} from 'react'
import { Box,styled,FormControl,InputBase, Button,TextareaAutosize } from '@mui/material';
import {AddCircle as Add, TokenRounded} from '@mui/icons-material';
import { useLocation, useParams } from 'react-router-dom';
import {DataContext} from '../../context/DataProvider'
import axios from 'axios'
import {getAccessToken} from '../../utils/common-utils';
import { API } from '../../service/api';

import { useNavigate } from 'react-router-dom';
const Container = styled(Box)(({theme})=>({
    margin: '50px 100px',
    [theme.breakpoints.down('md')]:{
        margin:0
    }

}))

const Image = styled('img')({
    width:'100%',
    height:'50vh',
    objectFit:'cover',
});
const StyledFormControl = styled(FormControl)`
    margin-top:10px;
    display:flex;
    flex-direction:row;
`
const InputTextField= styled(InputBase)`
    flex:1;
    margin:0 30px;
    font-size:25px;
`

const TextArea = styled(TextareaAutosize)`
    width:100%;
    margin-top:50px;
    font-size:18px;
    border:none;
    &:focus-visible{
        outline:none;
    }
`

const initialPost = {
    title:'',
    description:'',
    picture:'',
    username:'',
    categories:'',
    createDate:new Date(),
}
const UpdatePost = () => {
    const {id} = useParams()
    const token = getAccessToken()
    const headers = {"Authorization":`${token}`}
    const navigate = useNavigate()
    const [post,setPost] = useState(initialPost);
    const [file,setFile] = useState('');
    const location = useLocation();
    const {account} = useContext(DataContext);
    useEffect(()=>{
        const fetchData = async()=>{
            const result = await axios.get(`http://localhost:4000/post`,
            {headers:{id:id}})
            .then(res=>{
                setPost(res.data);

            })
            .catch(err=>{
                console.log(err)
            })
        }
        fetchData();
    },[])
    useEffect(()=>{
        const getImage =async()=>{
            if (file){
                const data = new FormData();
                data.append("name",file.name);
                data.append("file",file);
                //Api Clall
                const res = await axios.post('http://localhost:4000/file/upload',data)
                .then(res=>{
                    post.picture = res.data
                }).catch(err=>{
                    console.log(err)
                })
            }
        }
        getImage();
        post.categories = location.search?.split('=')[1]  || 'All';
        post.username = account.username;

    },[file])
    const handleChange=(e)=>{
        setPost({...post,[e.target.name]:e.target.value})
    }
    const url= post.picture ? post.picture : 'https://images.unsplash.com/photo-1543128639-4cb7e6eeef1b?ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8bGFwdG9wJTIwc2V0dXB8ZW58MHx8MHx8&ixlib=rb-1.2.1&w=1000&q=80';
    const updatePost =async()=>{
 
        const result = await axios.put('http://localhost:4000/updatepost',post,{headers:{
            id:id

        }})
        .then(res=>{
            navigate(`/details/${id}`)
        })
        .catch(err=>{
            console.log(err)
        })
    }
  return (
    <Container>
        <Image src={url} alt='banner'/>
        <StyledFormControl>
            <label htmlFor='fileInput'>
                <Add fontSize='large' color='action'/>
            </label>
            <input name="picture" type='file' id='fileInput'
            style={{display:'none'}}
            onChange={(e)=>setFile(e.target.files[0])}/>
            <InputTextField placeholder='Title' value={post.title} onChange={(e)=>handleChange(e)} name='title' />
            <Button onClick={updatePost}variant='contained' >Update</Button>
        </StyledFormControl>
        <TextArea
            minRows={5}
            placeholder='Tell your story...'
            onChange={(e)=>handleChange(e)}
            name='description'
            value={post.description}
        />
    </Container>
  )
}

export default UpdatePost