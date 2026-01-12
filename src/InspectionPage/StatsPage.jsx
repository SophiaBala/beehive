import React, { useState, useEffect } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import "./StatsPage.css";

const StatsPage = () => {
    const [searchParams] = useSearchParams();
    const navigate = useNavigate();

    const [step, setStep] = useState(1);
    const [allApiaries, setAllApiaries] = useState([]);
    const [hivesForApiary, setHivesForApiary] = useState([]);
    const [openDropdown, setOpenDropdown] = useState(null);
    const [showSuccess, setShowSuccess] = useState(false);

    const healthOptions = ["Без зауважень", "Потребує уваги", "Слабка сім'я"];
    const queenOptions = ["Є (мічена)", "Є (немічена)", "Відсутня", "Маточник"];
    const feedingOptions = ["Не проводилось", "Цукровий сироп", "Канді", "Білкове"];

    const [formData, setFormData] = useState({
        apiaryId: searchParams.get("apiary") || "",
        hiveId: searchParams.get("hive") || "",
        date: new Date().toISOString().split("T")[0],
        health: "Без зауважень",
        honeyCollected: 0,
        queen: "Є (мічена)",
        feeding: "Не проводилось",
        notes: ""
    });

    useEffect(() => {
        const savedApiaries = JSON.parse(localStorage.getItem("apiaries")) || [];
        setAllApiaries(savedApiaries);
    }, []);

    useEffect(() => {
        if (formData.apiaryId) {
            const savedHives =
                JSON.parse(localStorage.getItem(`hives_${formData.apiaryId}`)) || [];
            setHivesForApiary(savedHives);
        }
    }, [formData.apiaryId]);

    const handleSelect = (name, value) => {
        setFormData(prev => ({
            ...prev,
            [name]: value,
            ...(name === "apiaryId" ? { hiveId: "" } : {})
        }));
        setOpenDropdown(null);
    };

    const saveHarvestFromInspection = () => {
        if (!formData.honeyCollected || Number(formData.honeyCollected) <= 0) return;

        const harvestKey = `harvest_${formData.apiaryId}_${formData.hiveId}`;
        const existingHarvest =
            JSON.parse(localStorage.getItem(harvestKey)) || [];

        const newHarvest = {
            id: Date.now(),
            honey: Number(formData.honeyCollected),
            wax: 0,
            note: "Автоматично додано з інспекції",
            date: formData.date
        };

        localStorage.setItem(
            harvestKey,
            JSON.stringify([newHarvest, ...existingHarvest])
        );
    };

    const handleSave = () => {
        const inspectionKey = `inspections_${formData.apiaryId}_${formData.hiveId}`;
        const existingInspections =
            JSON.parse(localStorage.getItem(inspectionKey)) || [];

        const newInspection = {
            ...formData,
            id: Date.now()
        };

        localStorage.setItem(
            inspectionKey,
            JSON.stringify([...existingInspections, newInspection])
        );

        const hivesKey = `hives_${formData.apiaryId}`;
        const hives = JSON.parse(localStorage.getItem(hivesKey)) || [];

        const updatedHives = hives.map(hive => {
            if (hive.id === Number(formData.hiveId)) {
                return {
                    ...hive,
                    lastInspection: {
                        honey: formData.honeyCollected,
                        queen: formData.queen,
                        feeding: formData.feeding,
                        health: formData.health,
                        date: formData.date
                    }
                };
            }
            return hive;
        });

        localStorage.setItem(hivesKey, JSON.stringify(updatedHives));

        saveHarvestFromInspection();

        setShowSuccess(true);
        setTimeout(() => navigate("/"), 1500);
    };

    return (
        <div className="stats-page">
            {showSuccess && (
                <div className="success-overlay">
                    <div className="success-modal">
                        <div className="success-icon">✅</div>
                        <p>Зміни збережено!</p>
                    </div>
                </div>
            )}

            <div className="step-indicator">
                <div className={`dot ${step >= 1 ? "active" : ""}`} />
                <div className={`dot ${step >= 2 ? "active" : ""}`} />
            </div>

            <div className="inspection-card">
                {step === 1 ? (
                    <div className="form-step">
                        <h2 className="step-title">Виконати огляд</h2>

                        <label className="field-label">Дата огляду</label>
                        <input
                            type="date"
                            value={formData.date}
                            onChange={e =>
                                setFormData({ ...formData, date: e.target.value })
                            }
                            className="styled-input"
                        />

                        <label className="field-label">Пасіка</label>
                        <div className="custom-select-container">
                            <div
                                className="custom-select-header"
                                onClick={() =>
                                    setOpenDropdown(openDropdown === "apiary" ? null : "apiary")
                                }
                            >
                                {allApiaries.find(a => String(a.id) === String(formData.apiaryId))
                                    ?.name || "Виберіть пасіку"}
                            </div>
                            {openDropdown === "apiary" && (
                                <div className="custom-select-list">
                                    {allApiaries.map(a => (
                                        <div
                                            key={a.id}
                                            className="custom-select-item"
                                            onClick={() => handleSelect("apiaryId", a.id)}
                                        >
                                            {a.name}
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>

                        <label className="field-label">Вулик</label>
                        <div className="custom-select-container">
                            <div
                                className="custom-select-header"
                                onClick={() =>
                                    formData.apiaryId &&
                                    setOpenDropdown(openDropdown === "hive" ? null : "hive")
                                }
                            >
                                {hivesForApiary.find(h => String(h.id) === String(formData.hiveId))
                                    ?.hiveName || "Виберіть вулик"}
                            </div>
                            {openDropdown === "hive" && (
                                <div className="custom-select-list">
                                    {hivesForApiary.map(h => (
                                        <div
                                            key={h.id}
                                            className="custom-select-item"
                                            onClick={() => handleSelect("hiveId", h.id)}
                                        >
                                            {h.hiveName}
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>

                        <button
                            className="next-btn"
                            onClick={() =>
                                formData.hiveId ? setStep(2) : alert("Виберіть вулик")
                            }
                        >
                            Далі
                        </button>
                    </div>
                ) : (
                    <div className="form-step">
                        <h2 className="step-title">Деталі огляду</h2>

                        <label className="field-label">Стан здоровʼя</label>
                        <div className="custom-select-container">
                            <div
                                className="custom-select-header"
                                onClick={() =>
                                    setOpenDropdown(openDropdown === "health" ? null : "health")
                                }
                            >
                                {formData.health}
                            </div>
                            {openDropdown === "health" && (
                                <div className="custom-select-list">
                                    {healthOptions.map(opt => (
                                        <div
                                            key={opt}
                                            className="custom-select-item"
                                            onClick={() => handleSelect("health", opt)}
                                        >
                                            {opt}
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>

                        {/* <label className="field-label">Королева</label>
                        <div className="custom-select-container">
                            <div
                                className="custom-select-header"
                                onClick={() =>
                                    setOpenDropdown(openDropdown === "queen" ? null : "queen")
                                }
                            >
                                {formData.queen}
                            </div>
                            {openDropdown === "queen" && (
                                <div className="custom-select-list">
                                    {queenOptions.map(opt => (
                                        <div
                                            key={opt}
                                            className="custom-select-item"
                                            onClick={() => handleSelect("queen", opt)}
                                        >
                                            {opt}
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div> */}

                        <label className="field-label">Годування</label>
                        <div className="custom-select-container">
                            <div
                                className="custom-select-header"
                                onClick={() =>
                                    setOpenDropdown(openDropdown === "feeding" ? null : "feeding")
                                }
                            >
                                {formData.feeding}
                            </div>
                            {openDropdown === "feeding" && (
                                <div className="custom-select-list">
                                    {feedingOptions.map(opt => (
                                        <div
                                            key={opt}
                                            className="custom-select-item"
                                            onClick={() => handleSelect("feeding", opt)}
                                        >
                                            {opt}
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>

                        <label className="field-label">Меду зібрано (кг)</label>
                        <input
                            type="number"
                            value={formData.honeyCollected}
                            onChange={e =>
                                setFormData({
                                    ...formData,
                                    honeyCollected: e.target.value
                                })
                            }
                            className="styled-input"
                        />

                        <label className="field-label">Нотатки</label>
                        <textarea
                            value={formData.notes}
                            onChange={e =>
                                setFormData({ ...formData, notes: e.target.value })
                            }
                            className="styled-textarea"
                        />

                        <div className="form-buttons-row">
                            <button className="back-btn" onClick={() => setStep(1)}>
                                Назад
                            </button>
                            <button className="save-btn" onClick={handleSave}>
                                Зберегти
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default StatsPage;
