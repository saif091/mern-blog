import React, { useState,useContext } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { DataContext } from "../context/DataProvider";
import { Box, TextField, Button, styled, Typography } from "@mui/material";
const Components = styled(Box)`
  width: 400px;
  margin: auto;
  box-shadow: 5px 2px 5px 2px rgba(0 0 0/0.6);
`;
const Error = styled(Typography)`
  font-size:10px;
  color:#ff6161;
  line-height:0;
  margin-top:10px;
  font-weight:600;
`
const Image = styled("img")({
  width: 100,
  margin: "auto",
  display: "flex",
  padding: "50px 0 0",
});
const Wrapper = styled(Box)`
  padding: 25px 35px;
  display: flex;
  flex: 1;
  flex-direction: column;
  & > div,
  & > button,
  & > p {
    margin-top: 20px;
  }
`;

const LoginButton = styled(Button)`
  text-transform: none;
  background: #fb641b;
  color: #fff;
  height: 48px;
  border-radius: 2px;
`;

const SignupButton = styled(Button)`
  text-transform: none;
  background: #fff;
  color: #2874f0;
  height: 48px;
  border-radius: 2px;
  box-shadow: 0 2px 4px 0 rgb(0 0 0/20%);
`;
const Text = styled(Typography)`
  color: #878787;
  font-size: 16px;
`;
const Login = ({setIsAuthenticated}) => {
  const [account, toggleAccount] = useState("login");
  const [username,setUsername] = useState('');
  const [name,setName] = useState('');
  const [password,setPassword] = useState('');
  const navigate = useNavigate();
  const [error,setError] = useState("");
  const {setAccount} = useContext(DataContext)


  const SingUpUser =async(e)=>{
    const datas = {name,username,password}
    await axios.post('http://localhost:4000/signup',datas)
    .then(res => {
      console.log(res);
      setError("")
      setName("");
      setUsername("");
      setPassword("");
      toggleAccount("login");
  })
  .catch(err => {

    setError("Something went wrong! , Please try again later")
    console.log(err)
  })
  }
  const loginUser =async(e)=>{
    e.preventDefault();
    const datas = {username,password}
    await axios.post('http://localhost:4000/login',datas)
    .then(res => {
      setError("")
     console.log(res);
      sessionStorage.setItem('accessToken',`Bearer ${res.data.accessToken}`)
      sessionStorage.setItem('refreshToken',`Bearer ${res.data.refreshToken}`)
      setAccount({username:res.data.username,name:res.data.name});
      setIsAuthenticated(true)
      navigate('/')

  }) 
  .catch(err => {
    setError("Something went wrong! , Please try again later")
    console.log(err)
  })
  }
  const ImageUrl =
    "https://www.sesta.it/wp-content/uploads/2021/03/logo-blog-sesta-trasparente.png";
  return (
    <Components>
      <Box>
        <Image src={ImageUrl} alt="imagge Header" />
      </Box>
      {account === "login" ? 
        <Wrapper>
          <TextField variant="standard" value={username} onChange={(e)=>{setUsername(e.target.value)}} name="username" label="Enter username" />
          <TextField variant="standard" value={password} onChange={(e)=>{setPassword(e.target.value)}} name="password" label="Enter password" />
          {error && <Error>{error}</Error>}

          <LoginButton onClick={loginUser} variant="contained">Login</LoginButton>
          <Text style={{ textAlign: "center" }}>OR</Text>

          <SignupButton onClick={()=>toggleAccount('signup')} >Create An account</SignupButton>
        </Wrapper>
       : 
        <Wrapper>
          <TextField variant="standard" value={name} onChange={(e)=>{
            setName(e.target.value)
          }} name="name"label="Enter name" />
          <TextField variant="standard" value={username} onChange={(e)=>{
            setUsername(e.target.value)
          }} name="username"label="Enter username" />
          <TextField value={password} variant="standard" onChange={(e)=>{
            setPassword(e.target.value)
          }} name="password" label="Enter password" />
          {error && <Error>{error}</Error>}
          <SignupButton onClick={SingUpUser}  >Signup</SignupButton>
          <Text style={{ textAlign: "center" }}>OR</Text>

          <LoginButton onClick={()=>toggleAccount('login')} variant="contained">Already have an account</LoginButton>
        </Wrapper>
      }
    </Components>
  );
};

export default Login;
