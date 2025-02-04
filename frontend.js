// Connect to Backend server
document.addEventListener("DOMContentLoaded", async () => {
    const taskList = document.getElementById("task-list");

    try {
        const response = await fetch("http://localhost:5000/api/tasks");
        const tasks = await response.json();

        tasks.forEach(task => {
            const li = document.createElement("li");
            li.textContent = `${task.title} - ${task.status}`;
            taskList.appendChild(li);
        });
    } catch (error) {
        console.error("Error fetching tasks:", error);
    }
});


// Verify User Auth Form Data
const usernameField = document.getElementById('username');
const usernameMsgField = document.getElementById('username-error');
usernameField.addEventListener('input', (e) => {
    const username = usernameField.value.trim(); 
    const regexPattern = /^[a-zA-Z0-9_]{3,16}$/;

    if (regexPattern.test(username)) {
        usernameMsgField.textContent = 'Valid Username';
        usernameMsgField.style.color = 'green';
    } else {
        usernameMsgField.textContent = 'Invalid Username';
        usernameMsgField.style.color = 'red';
    }
});
const passwordField = document.getElementById('password');
const passwordMsgField = document.getElementById('password-error'); 
passwordField.addEventListener('input', e => {
    const password = passwordField.value.trim();
    const regexPattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^a-zA-Z0-9]).{6,16}$/;

    if (regexPattern.test(password)) {
        passwordMsgField.textContent = 'Valid Password';
        passwordMsgField.style.color = 'green';
    } else {
        passwordMsgField.textContent = 'Invalid Password';
        passwordMsgField.style.color = 'red';
    }
});