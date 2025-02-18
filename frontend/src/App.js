import { BrowserRouter as Router } from "react-router-dom";
import { ThemeProvider } from "./context/ThemeContext";
import { SidebarProvider } from "./context/SidebarContext";
import Dashboard from "./pages/Dashboard";

function App() {
    return (
        <ThemeProvider> {/* Dark mode context */}
            <SidebarProvider> {/* Sidebar state context */}
                <Router>
                    <Dashboard />
                </Router>
            </SidebarProvider>
        </ThemeProvider>
    );
}

export default App;
