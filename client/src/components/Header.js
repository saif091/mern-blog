import React from 'react'
import styled from '@emotion/styled';
import { Link } from 'react-router-dom';
import { AppBar,Toolbar, Typography } from '@mui/material';
const Component = styled(AppBar)`
    background:#FFFFFF;
    color :#000;

`
const Container = styled(Toolbar)`
    justify-content:center;
    & > a {
        padding:20px;
        color:#000;
        text-decoration:none;
    }
`
const Header = () => {
  return (
    <>
    <Component>
        <Container>
            <Link to='/'>Home</Link>
            <Link to='/about'>ABOUT</Link>
            <Link to='/contact'>CONTACT</Link>
            <Link to='/login' >LOGOUT</Link>

        </Container>
    </Component>
    </>
  )
}

export default Header