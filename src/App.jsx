import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './components/auth/Login';
import UserProfile from './components/Users/UserProfile';
import Home from './components/Home';
import DiscussionForm from './components/Discussions/DiscussionForm';
import Signup from './components/auth/Signup';
import './App.css'
import UpdateUser from './components/Users/UpdateUser';
import UpdateDiscusssion from './components/Discussions/UpdateDiscussion';
import MyDiscussions from './components/Discussions/MyDiscussions';
import CommentsForm from './components/comments/CommentsForm';
import UpdateComments from './components/comments/UpdateComments';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/profile" element={<UserProfile />} />
        <Route path = "/updateuser" element = {<UpdateUser />} />
        <Route path = "/myposts" element = {<MyDiscussions />} />
        <Route path="/newpost" element={<DiscussionForm />} />
        <Route path = "/update-discussion/:id" element = {<UpdateDiscusssion />} />
        <Route path = "/comments/:id" element = {<CommentsForm/>} />
        <Route path = "/update-comments/:id" element = {<UpdateComments />} />
        <Route path="/" element={<Home />} exact />
      </Routes>
    </Router>
  );
}

export default App;
