
import { Routes, Route } from 'react-router-dom';
import Header from './components/Layout/Header';
import Footer from './components/Layout/Footer';
import Home from './pages/Home';
import Calculator from './pages/Calculator';
import Guide from './pages/Guide';
import Blog from './pages/Blog';
import Post from './pages/Post';
import { useEffect } from 'react';
import { analytics } from './firebase';
import { logEvent } from "firebase/analytics";

export default function App() {
  useEffect(() => {
    logEvent(analytics, 'app_session_start');
  }, []);

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/calculator" element={<Calculator />} />
          <Route path="/guide" element={<Guide />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/blog/:id" element={<Post />} />
        </Routes>
      </main>
      <Footer />
    </div>
  )
}
