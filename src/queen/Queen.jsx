import React, { useState, useEffect, useMemo } from "react";
import { useNavigate, useParams } from "react-router-dom";
import "./Queen.css";
import TopBar from "../TopBar/TopBar.jsx";


export default function Queen() {
    const navigate = useNavigate();
    const { apiaryId, hiveId } = useParams();

    const [hasQueen, setHasQueen] = useState(true);
    const [day, setDay] = useState("");
    const [month, setMonth] = useState("");
    const [year, setYear] = useState("");
    const [marked, setMarked] = useState(false);
    const [color, setColor] = useState("");

    const storageKey = `queen_${apiaryId}_${hiveId}`;

    useEffect(() => {
        const saved = JSON.parse(localStorage.getItem(storageKey));
        if (!saved) return;

        setHasQueen(saved.hasQueen);

        if (saved.hasQueen && saved.birthDate) {
            const d = new Date(saved.birthDate);
            setDay(d.getDate());
            setMonth(d.getMonth() + 1);
            setYear(d.getFullYear());
        }

        setMarked(saved.marked || false);
        setColor(saved.color || "");
    }, [storageKey]);

    const age = useMemo(() => {
        if (!day || !month || !year) return null;

        const birth = new Date(year, month - 1, day);
        const now = new Date();

        if (birth > now) return null;

        let months =
            (now.getFullYear() - birth.getFullYear()) * 12 +
            (now.getMonth() - birth.getMonth());

        if (now.getDate() < birth.getDate()) months--;

        return {
            years: Math.floor(months / 12),
            months: months % 12,
        };
    }, [day, month, year]);

    const saveQueen = () => {
        const data = hasQueen
            ? {
                hasQueen: true,
                birthDate: new Date(year, month - 1, day),
                age,
                marked,
                color,
            }
            : { hasQueen: false };

        localStorage.setItem(storageKey, JSON.stringify(data));
        navigate(-1);
    };

    return (
        <div className="queen-page">
            <TopBar title="Королева" />

            <div className="queen-form">
                <label className="radio">
                    <input
                        type="radio"
                        checked={hasQueen}
                        onChange={() => setHasQueen(true)}
                    />
                    Є королева
                </label>

                <label className="radio">
                    <input
                        type="radio"
                        checked={!hasQueen}
                        onChange={() => setHasQueen(false)}
                    />
                    Немає королеви
                </label>

                {hasQueen && (
                    <>
                        <p className="label">Дата виведення</p>

                        <div className="date-selectors">
                            <select value={day} onChange={(e) => setDay(e.target.value)}>
                                <option value="">День</option>
                                {Array.from({ length: 31 }, (_, i) => i + 1).map((d) => (
                                    <option key={d} value={d}>{d}</option>
                                ))}
                            </select>

                            <select value={month} onChange={(e) => setMonth(e.target.value)}>
                                <option value="">Місяць</option>
                                {[
                                    "Січень","Лютий","Березень","Квітень","Травень","Червень",
                                    "Липень","Серпень","Вересень","Жовтень","Листопад","Грудень"
                                ].map((m, i) => (
                                    <option key={i} value={i + 1}>{m}</option>
                                ))}
                            </select>

                            <select value={year} onChange={(e) => setYear(e.target.value)}>
                                <option value="">Рік</option>
                                {Array.from({ length: 10 }, (_, i) => {
                                    const y = new Date().getFullYear() - i;
                                    return (
                                        <option key={y} value={y}>{y}</option>
                                    );
                                })}
                            </select>
                        </div>

                        {age && (
                            <div className="age-box">
                                Вік королеви:
                                <strong> {age.years} р. {age.months} міс.</strong>
                            </div>
                        )}

                        <label className="checkbox">
                            <input
                                type="checkbox"
                                checked={marked}
                                onChange={() => setMarked(!marked)}
                            />
                            Королева позначена
                        </label>

                        {marked && (
                            <label>
                                Колір мітки
                                <select
                                    value={color}
                                    onChange={(e) => setColor(e.target.value)}
                                >
                                    <option value="">Оберіть колір</option>
                                    <option value="white">Білий</option>
                                    <option value="yellow">Жовтий</option>
                                    <option value="red">Червоний</option>
                                    <option value="green">Зелений</option>
                                    <option value="blue">Синій</option>
                                </select>
                            </label>
                        )}
                    </>
                )}

                <button className="save-btn" onClick={saveQueen}>
                    Зберегти
                </button>
            </div>
        </div>
    );
}
