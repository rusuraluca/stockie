import React, { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AppMenu } from "./components/AppMenu";
import { AppHome } from "./components/AppHome";
import {UserDetails} from "./components/users/UserDetails";
import {UserDelete} from "./components/users/UserDelete";
import {UserAdd} from "./components/users/UserAdd";
import {UserShowAll} from "./components/users/UserShowAll";
import {UserUpdate} from "./components/users/UserUpdate";
import {Dashboard} from "./components/Dashboard";

function App() {
  return (
      <React.Fragment>
          <Router>
              <AppMenu />
              <Routes>
                  <Route path="/" element={<AppHome />} />
                  <Route path="/users" element={<UserShowAll />}/>
                  <Route path="/users/:userId/details" element={<UserDetails />} />
                  <Route path="/users/:userId/edit" element={<UserUpdate />} />
                  <Route path="/users/:userId/delete" element={<UserDelete />} />
                  <Route path="/users/add" element={<UserAdd />} />
                  <Route path="/dashboard" element={<Dashboard />} />
              </Routes>
          </Router>
      </React.Fragment>
  )
}

export default App
