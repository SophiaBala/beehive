import React, { useState, useEffect } from "react";
import "./HomePage.css";
import { useNavigate } from "react-router-dom";
import defaultHiveImg from "../assets/hive.png"; 
import apiaryImg from "../assets/apiary.png";

export default function HomePage() {
    const navigate = useNavigate();
    const [search, setSearch] = useState("");
    const [apiaries, setApiaries] = useState([]);

    useEffect(() => {
        const saved = JSON.parse(localStorage.getItem("apiaries"));
        if (saved && saved.length) {
            setApiaries(saved);
        }
    }, []);

    const filtered = apiaries.filter((a) =>
        a.name.toLowerCase().includes(search.toLowerCase())
    );

    const addHive = () => {
        const newHive = {
            id: Date.now(),
            name: `Пасіка ${apiaries.length + 1}`,
            status: "Нова",
            honey: 0,
            date: new Date().toLocaleDateString("en-GB"),
            statusColor: "status-new",
        };

        const updated = [newHive, ...apiaries];
        setApiaries(updated);
        localStorage.setItem("apiaries", JSON.stringify(updated));
    };

    return (
        <div className="homepage">
            <div className="search-add">
                <input
                    placeholder="Пошук пасік..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                />
                <button onClick={addHive}>+</button>
            </div>

            <div className="hive-grid">
                {filtered.length > 0 ? (
                    filtered.map((apiary) => {
                        const hives = JSON.parse(localStorage.getItem(`hives_${apiary.id}`)) || [];
                        
                        const totalHoney = hives.reduce((sum, hive) => {
                            const honeyAmount = hive.lastInspection?.honey || 0;
                            return sum + Number(honeyAmount);
                        }, 0);

                        return (
                            <div
                                key={apiary.id}
                                className="apiary-card"
                                onClick={() => navigate(`/apiary/${apiary.id}`)}
                            >
                                <div className="apiary-top">
                                    <img src={apiary.photo || defaultHiveImg} alt="Hive" className="apiary-img" />
                                    <span className={`hive-status ${apiary.statusColor}`}>
                                        {apiary.status}
                                    </span>
                                </div>

                                <h2>{apiary.name}</h2>

                                <div className="hive-info">
                                    <span>🍯 {totalHoney} кг</span>
                                    <span>{apiary.date}</span>
                                </div>
                            </div>
                        );
                    })
                ) : (
                    <p className="empty-text">Поки що немає пасік. Додайте нову!</p>
                )}
            </div>
        </div>
    );
}
    <div className="homepage">
        <div className="search-add">
            <input
                placeholder="Пошук пасік..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
            />
            <button onClick={addHive}>+</button>
        </div>

        <div className="hive-grid">
            {filtered.length > 0 ? (
                filtered.map((apiary) => (
                    <div
                        key={apiary.id}
                        className="apiary-card"
                        onClick={() => navigate(`/apiary/${apiary.id}`)}
                    >
                        <img
                            src={apiaryImg}
                            alt="Hive"
                            className="apiary-bg"
                        />

                        <div className="apiary-overlay">
                            <div className="apiary-top">
                                <span
                                    className={`hive-status ${apiary.statusColor}`}
                                >
                                    {apiary.status}
                                </span>
                            </div>

                            <h2>{apiary.name}</h2>

                            <div className="hive-info">
                                <span>🍯 {apiary.honey} кг</span>
                                <span>{apiary.date}</span>
                            </div>
                        </div>
                    </div>
                ))
            ) : (
                <p className="empty-text">
                    Поки що немає пасік. Додайте нову!
                </p>
            )}
        </div>
    </div>
);

}
