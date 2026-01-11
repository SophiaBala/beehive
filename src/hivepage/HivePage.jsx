import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import "./HivePage.css";
import backarrow from "../assets/back-arrow.png";
import hiveImg from "../assets/hive.png";

export default function HivePage() {
    const { apiaryId, hiveId } = useParams();
    const navigate = useNavigate();
    const [hive, setHive] = useState(null);
    const [inspections, setInspections] = useState([]);

    useEffect(() => {
        const hives = JSON.parse(localStorage.getItem(`hives_${apiaryId}`)) || [];
        const currentHive = hives.find(h => h.id === Number(hiveId));
        setHive(currentHive);

        const historyKey = `inspections_${apiaryId}_${hiveId}`;
        const history = JSON.parse(localStorage.getItem(historyKey)) || [];
        
        const sortedHistory = history.sort((a, b) => new Date(b.date) - new Date(a.date));
        setInspections(sortedHistory);
    }, [apiaryId, hiveId]);

    if (!hive) return <p className="not-found">Вулик не знайдено</p>;

    const lastData = hive.lastInspection || {};

    return (
        <div className="hive-page">
            <header className="top-bar">
                <button onClick={() => navigate(-1)} className="back-btn">
                    <img src={backarrow} alt="Назад" />
                </button>
                <h1>{hive.hiveName}</h1>
                
            </header>

            <section className="hive-hero">
                <img src={hive.photo || hiveImg} alt="Вулик" />
                <div className="hero-info">
                    <span className="badge">{hive.breed}</span>
                    <span className="badge">{hive.hiveType}</span>
                </div>
            </section>

            <section className="info-grid">
                <div className="info-card">
                    <b className="stat-label">Зібраний мед</b>
                    <p className="stat-value">🍯 {lastData.honey || 0} кг</p>
                </div>

                <div className="info-card">
                    <b className="stat-label">Королева</b>
                    <p className="stat-value">{lastData.queen || "Немає даних"}</p>
                </div>

                <div className="info-card">
                    <b className="stat-label">Годування</b>
                    <p className="stat-value">{lastData.feeding || "Не проводилось"}</p>
                </div>

                <div className="info-card">
                    <b className="stat-label">Здоровʼя</b>
                    <p className="stat-value">{lastData.health || "Без зауважень"}</p>
                </div>
            <button onClick={() => navigate(-1)} className="back-btn">
                <img src={backarrow} className="button-img" />
            </button>
            <h1>{hive.hiveName}</h1>
            </header>

        <section className="hive-hero">
            <img src={hive.photo || hiveImg} alt="Вулик" />
            <div className="hero-info">
            <span>{hive.breed}</span>
            <span>{hive.hiveType}</span>
            </div>
        </section>

        <section className="info-grid">

            <div className="info-card wide soft" onClick={() => navigate("/harvest")}>
            <b>Зібраний мед</b>
            <p className="honey">🍯 {hive.honeyCollected || 0} кг</p>
            </div>

            <div className="info-card wide soft" onClick={() => navigate("/queen")}>
            <b>Королева</b>
            <p className="muted">{hive.queen || "Немає даних"}</p>
            </div>

            {/* <div className="info-card">
            <b>Годування</b>
            <p className="muted">{hive.feeding || "Не проводилось"}</p>
            </div>

            <div className="info-card">
            <b>Здоровʼя</b>
            <p className="muted">{hive.health || "Без зауважень"}</p>
            </div> */}

                <div className="info-card wide soft">
                    <b className="stat-label">Інспекції</b>
                    <div className="inspections-container">
                        {inspections.length > 0 ? (
                            inspections.map((insp) => (
                                <div key={insp.id} className="inspection-history-item">
                                    <div className="insp-main">
                                        <span className="insp-date">{insp.date}</span>
                                        <span className="insp-honey">+{insp.honeyCollected} кг</span>
                                    </div>
                                    <div className="insp-sub">
                                        <span>👑 {insp.queen}</span>
                                        <span>🏥 {insp.health}</span>
                                    </div>
                                    {insp.notes && <p className="insp-comment">“{insp.notes}”</p>}
                                </div>
                            ))
                        ) : (
                            <p className="muted">Поки що немає інспекцій</p>
                        )}
                    </div>
                </div>
            </section>
        </div>
    );
}