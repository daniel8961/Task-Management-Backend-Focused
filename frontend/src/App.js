import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Dashboard from './pages/Dashboard';
import TaskView from './pages/Task/TaskView';
import UserRegister from './pages/User/UserRegister';
import CategoryView from './pages/Category/CategoryView';
import './App.css';

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Dashboard />}>
          <Route path="/" element={<TaskView />} />
          <Route path="/category" element={<CategoryView />} />
          <Route path="/register" element={<UserRegister />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
