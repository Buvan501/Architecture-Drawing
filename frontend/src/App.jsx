import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Hero from './components/Hero';
import Services from './components/Services';
import ImageGallery from './components/ImageGallery';
import PlansShowcase from './components/PlansShowcase';
import TrendingPlans from './components/TrendingPlans';
import Footer from './components/Footer';
import Admin from './components/Admin';
import AdminLogin from './components/Login';
import UserLogin from './components/UserLogin';
import UserDashboard from './components/UserDashboard';
import PlansPage from './components/PlansPage';
import Explore from './components/Explore';
import VRExperience from './components/VRExperience';
import Contact from './components/Contact';
import ErrorBoundary from './components/ErrorBoundary';

function App() {
  return (
    <ErrorBoundary>
      <Router>
        <div className="App">
          <Header />
          <Routes>
            <Route path="/" element={<><Hero /><Services /><PlansShowcase /><ImageGallery /><TrendingPlans /><Footer /></>} />
            <Route path="/plans/:type" element={<PlansPage />} />
            <Route path="/explore" element={<Explore />} />
            <Route path="/vr-experience" element={<VRExperience />} />
            <Route path="/admin-login" element={<AdminLogin />} />
            <Route path="/user-login" element={<UserLogin />} />
            <Route path="/admin" element={<Admin />} />
            <Route path="/user-dashboard" element={<UserDashboard />} />
            <Route path="/contact" element={<Contact />} />
            {/* Legacy route for backward compatibility */}
            <Route path="/login" element={<AdminLogin />} />
          </Routes>
        </div>
      </Router>
    </ErrorBoundary>
  );
}

export default App;
