import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route } from 'react-router-dom';
import Root from './Root';

import App from './components/App';
import Signout from './components/auth/Signout';
import Signin from './components/auth/Signin';
import Projects from './components/Projects';


const ADMIN_URL_SECRET = '';

const urlAdmin = "/admin"+ADMIN_URL_SECRET;
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
