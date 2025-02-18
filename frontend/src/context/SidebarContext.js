import { createContext, useState, useContext } from "react";

const SidebarContext = createContext();

const SidebarProvider = ({ children }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [selectedItem, setSelectedItem] = useState(null);
    const [sidebarType, setSidebarType] = useState("");

    const openSidebar = (type, item) => {
        setSidebarType(type);
        setSelectedItem(item);
        setIsOpen(true);
    };

    const closeSidebar = () => {
        setIsOpen(false);
        setSelectedItem(null);
    };

    return (
        <SidebarContext.Provider value={{ isOpen, selectedItem, sidebarType, openSidebar, closeSidebar}}>
            {children}
        </SidebarContext.Provider>
    );
};

const useSidebar = () => useContext(SidebarContext);
export { SidebarProvider, useSidebar };