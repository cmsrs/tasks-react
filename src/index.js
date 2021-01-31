import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route } from 'react-router-dom';
import Root from './Root';


//import './index.css';
//import App from './App';
//import reportWebVitals from './reportWebVitals';

import App from './components/App';
// import Pages from './components/Pages';
// import Products from './components/Products';
// import Users from './components/Users';
// import Contacts from './components/Contacts';
import Signout from './components/auth/Signout';
import Signin from './components/auth/Signin';
import Projects from './components/Projects';


const ADMIN_URL_SECRET = '';

const urlAdmin = "/admin"+ADMIN_URL_SECRET;
const urlPages = "/admin"+ADMIN_URL_SECRET+"/pages";
const urlProducts = "/admin"+ADMIN_URL_SECRET+"/products";

const urlUsers = "/admin"+ADMIN_URL_SECRET+"/users";
const urlContacts = "/admin"+ADMIN_URL_SECRET+"/contacts";
const urlSignout = "/admin"+ADMIN_URL_SECRET+"/signout";
const urlSignin = "/admin"+ADMIN_URL_SECRET+"/signin";
const urlProjects = "/admin"+ADMIN_URL_SECRET+"/projects";



ReactDOM.render(
  <Root>
    <BrowserRouter>
      <App>
        <Route path={urlAdmin} exact component={Signin} />
        <Route path={urlSignout} component={Signout} />
        <Route path={urlSignin} component={Signin} />
        <Route path={urlProjects} component={Projects} />
      </App>
    </BrowserRouter>
  </Root>,
  document.querySelector('#root')
);
