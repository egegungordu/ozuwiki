import 'bootstrap/dist/css/bootstrap.min.css';
import { Routes, Route, Navigate } from 'react-router-dom';
import './App.css'
import Article from './pages/Article/Article';
import Home from './pages/Home/Home';
import Contribute from './pages/Contribute/Contribute';
import Search from './pages/Search/Search';
import Login from './pages/Login/Login';
import Settings from './pages/Settings/Settings';

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/search:query" element={<Search />} />
      <Route path="/login" element={<Login />} />
      <Route path="/search" element={<Search />} />
      <Route path="/settings" element={<Settings />} />
      <Route path="/article/:articleName" element={<Article />} />
      <Route path="/article/:articleName/contribute" element={<Contribute />} />
      <Route
        path="/article"
        element={<Navigate to="/" replace />}
      />
    </Routes>
  )
}