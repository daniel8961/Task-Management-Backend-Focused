import { useContext, useEffect, useState } from "react";
import { useSidebar } from "../context/SidebarContext";
import styles from "../styles/Sidebar.module.css";

const Sidebar = () => {
    const { isOpen, selectedItem, sidebarType, closeSidebar } = useSidebar();
    const [data, setData] = useState(selectedItem || {});

    useEffect(() => {
        setData(selectedItem || {}); // Reset data when a new item is selected
    }, [selectedItem]);

    // Auto-save for Task & Category (Not for User)
    useEffect(() => {
        if (sidebarType === "task" || sidebarType === "category") {
            localStorage.setItem(`sidebar-${sidebarType}-${data.id}`, JSON.stringify(data));
        }
    }, [data]);

    if (!isOpen) return null;

    return (
        <div className={styles.overlay} onClick={closeSidebar}>
            <div className={`${styles.sidebar} ${sidebarType === "user" ? styles.userSidebar : ""}`} onClick={(e) => e.stopPropagation()}>
                <button className={styles.closeButton} onClick={closeSidebar}>✖</button>

                {sidebarType === "task" && (
                    <>
                        <h2>Edit Task</h2>
                        <input type="text" value={data.title || ""} onChange={(e) => setData({ ...data, title: e.target.value })} />
                        <select value={data.status || "incomplete"} onChange={(e) => setData({ ...data, status: e.target.value })}>
                            <option value="incomplete">Incomplete</option>
                            <option value="complete">Complete</option>
                        </select>
                        <select value={data.priority || "low"} onChange={(e) => setData({ ...data, priority: e.target.value })}>
                            <option value="low">Low</option>
                            <option value="medium">Medium</option>
                            <option value="high">High</option>
                        </select>
                    </>
                )}

                {sidebarType === "category" && (
                    <>
                        <h2>Edit Category</h2>
                        <input type="text" value={data.name || ""} onChange={(e) => setData({ ...data, name: e.target.value })} />
                    </>
                )}

                {sidebarType === "user" && (
                    <>
                        <h2>Edit User</h2>
                        <input type="text" placeholder="Username" value={data.username || ""} onChange={(e) => setData({ ...data, username: e.target.value })} />
                        <input type="password" placeholder="Password" value={data.password || ""} onChange={(e) => setData({ ...data, password: e.target.value })} />
                        <button className={styles.submitButton} onClick={() => console.log("Saving User Data...", data)}>Submit</button>
                    </>
                )}
            </div>
        </div>
    );
};

export default Sidebar;
