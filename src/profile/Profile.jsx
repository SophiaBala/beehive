
import TopBar from "../TopBar/TopBar.jsx";
import React, { useState, useEffect } from "react";
import "./Profile.css";

export default function Profile() {
    const [user, setUser] = useState({
        firstName: "",
        lastName: "",
        email: "",
        experience: "beginner",
        notifications: false
    });

    useEffect(() => {
        const savedUser = JSON.parse(localStorage.getItem("userInfo"));
        if (savedUser) setUser(savedUser);
    }, []);

    const handleSave = () => {
        localStorage.setItem("userInfo", JSON.stringify(user));
        alert("Дані збережено!");
    };

    const toggleNotifications = () => {
        setUser(prev => ({ ...prev, notifications: !prev.notifications }));
    };

    return (
        <div className="profile-page">
             <TopBar title="Особистий кабінет" />

            <form className="profile-form" onSubmit={e => e.preventDefault()}>
                <label>
                    Ім’я:
                    <input
                        type="text"
                        value={user.firstName}
                        onChange={e => setUser({...user, firstName: e.target.value})}
                        placeholder="Введіть ім’я"
                    />
                </label>

                <label>
                    Прізвище:
                    <input
                        type="text"
                        value={user.lastName}
                        onChange={e => setUser({...user, lastName: e.target.value})}
                        placeholder="Введіть прізвище"
                    />
                </label>

                <label>
                    Email:
                    <input
                        type="email"
                        value={user.email}
                        onChange={e => setUser({...user, email: e.target.value})}
                        placeholder="Введіть email"
                    />
                </label>

                <label>
                    Рівень досвіду:
                    <select
                        value={user.experience}
                        onChange={e => setUser({...user, experience: e.target.value})}
                    >
                        <option value="beginner">Початківець</option>
                        <option value="intermediate">Середній</option>
                        <option value="advanced">Досвідчений</option>
                    </select>
                </label>

                <div className="notifications-block">
                    <p>Сповіщення:</p>
                    <button
                        type="button"
                        className={`notification-btn ${user.notifications ? "on" : "off"}`}
                        onClick={toggleNotifications}
                    >
                        {user.notifications ? "Ввімкнено" : "Вимкнено"}
                    </button>
                </div>

                <button className="save-btn" onClick={handleSave}>Зберегти</button>
            </form>
        </div>
    );
}