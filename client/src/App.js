import './App.css';
import { useState } from 'react';
import Login from './components/Login';
import {BrowserRouter,Routes,Route, Navigate, Outlet} from 'react-router-dom'
import DataProvider from './context/DataProvider';
import Home from './components/Home';
import Header from './components/Header';
import About from './components/About';
import Contact from './components/Contact';
import DetailsView from './components/DetailsView';
import CreatePost from './components/create/CreatePost';
import UpdatePost from './components/create/UpdatePost';
const  PrivateRoute = ({isAuthenticated,...props})=>{
  return isAuthenticated ? <>
          <Header/>

  <Outlet/>
  </>:<Navigate replace to='/login'/>
}
function App() {
  const [isAuthenticated,setIsAuthenticated] = useState(false)
  return (
      <DataProvider>
        <BrowserRouter>
          <div style={{marginTop:64}}>
            <Routes>
              <Route path='/login' element={<Login setIsAuthenticated={setIsAuthenticated}/>}/>

              <Route path='/' element={<PrivateRoute isAuthenticated={isAuthenticated}  />}  >
                <Route path='/' element={<Home/>}/>
              </Route>

              <Route path='/create' element={<PrivateRoute isAuthenticated={isAuthenticated}  />}  >
                <Route path='/create' element={<CreatePost/>}/>
              </Route>

              <Route path='/details/:id' element={<PrivateRoute isAuthenticated={isAuthenticated}  />}  >
                <Route path='/details/:id' element={<DetailsView/>}/>
              </Route>
              <Route path='/update/:id' element={<PrivateRoute isAuthenticated={isAuthenticated}  />}  >
                <Route path='/update/:id' element={<UpdatePost/>}/>
              </Route>
              <Route path='/about' element={<PrivateRoute isAuthenticated={isAuthenticated}  />}  >
                <Route path='/about' element={<About/>}/>
              </Route>
              <Route path='/Contact' element={<PrivateRoute isAuthenticated={isAuthenticated}  />}  >
                <Route path='/Contact' element={<Contact/>}/>
              </Route>

            </Routes>
          </div>
        </BrowserRouter>
      </DataProvider>
  );
}

export default App;
