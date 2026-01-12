import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import "./Harvest.css";
import TopBar from "../TopBar/TopBar.jsx";

export default function Harvest() {
    const navigate = useNavigate();
    const { apiaryId, hiveId } = useParams();
    const [records, setRecords] = useState([]);

    useEffect(() => {
        const storageKey = `harvest_${apiaryId}_${hiveId}`;
        const saved = JSON.parse(localStorage.getItem(storageKey)) || [];
        setRecords(saved);
    }, [apiaryId, hiveId]);

    const totalHoney = records.reduce((sum, r) => sum + Number(r.honey), 0);
    const totalWax = records.reduce((sum, r) => sum + Number(r.wax), 0);

    return (
        <div className="harvest-page">
            <TopBar title="Зібраний врожай" />
            
            <div className="harvest-header">
                <label
                    className="add-harvest"
                    onClick={() =>
                        navigate(`/harvest/add/${apiaryId}/${hiveId}`)
                    }
                >
                    +
                </label>
            </div>
            <div className="harvest-main">
                <div className="harvest-summary">
                    <div>Мед: <strong>{totalHoney} кг</strong></div>
                    <div>Віск: <strong>{totalWax} кг</strong></div>
                </div>

                {records.length > 0 ? (
                    <div className="harvest-list">
                        {records.map((r) => (
                            <div key={r.id} className="harvest-card">
                                <div className="harvest-card-header">
                                    <div>Мед: {r.honey} кг</div>
                                    <span className="harvest-date">{r.date}</span>
                                </div>
                                
                                <div>Віск: {r.wax} кг</div>
                            </div>

                        ))}
                    </div>
                ) : (
                    <p className="empty-text">Поки що немає записів</p>
                )}
            </div>
        </div>
    );
}
