import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import Header from './components/Header';
import Posts from './components/Posts';
import Login from './components/Login';
import Register from './components/Register';
import Createpost from './components/Createpost';
import PostPage from './components/PostPage';
import Userpage from './components/UserPage';
import './App.css';

function App() {
  return (
    <Router>
      <div className="App">
        <Header />
        <Routes>
          <Route path="/" element={<Posts />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/createpost" element={<Createpost />} />
          <Route path="/post/:postid" element={<PostPage />} />
          <Route path="/user/:userid" element={<Userpage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
