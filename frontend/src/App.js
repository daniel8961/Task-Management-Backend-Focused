import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "./context/ThemeContext";
import { SidebarProvider } from "./context/SidebarContext";
import Dashboard from "./pages/Dashboard";
import TaskView from "./pages/Task/TaskView";
import CategoryView from "./pages/Category/CategoryView";
import Profile from "./pages/User/Profile";

function App() {
    return (
        <ThemeProvider> {/* Dark mode context */}
            <SidebarProvider> {/* Sidebar state context */}
                <Router>
                    <Dashboard /> {/* Navbar & Sidebar are inside Dashboard */}
                    <Routes>
                        <Route path="/" element={<TaskView />} /> {/* Default to Tasks */}
                        <Route path="/task" element={<TaskView />} />
                        <Route path="/category" element={<CategoryView />} />
                        <Route path="/profile" element={<Profile />} />
                    </Routes>
                </Router>
            </SidebarProvider>
        </ThemeProvider>
    );
}

export default App;
