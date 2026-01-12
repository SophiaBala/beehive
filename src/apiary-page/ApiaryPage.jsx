import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import "./ApiaryPage.css";
import backarrow from "../assets/back-arrow.png";
import edit from "../assets/edit.png";
import hiveImg from "../assets/hive.png";
import TopBar from "../TopBar/TopBar.jsx";

export default function ApiaryPage() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [apiary, setApiary] = useState(null);
    const [hives, setHives] = useState([]);

    useEffect(() => {
        const apiaries = JSON.parse(localStorage.getItem("apiaries")) || [];
        const current = apiaries.find(a => a.id === Number(id));
        setApiary(current);

        const savedHives = JSON.parse(localStorage.getItem(`hives_${id}`)) || [];
        setHives(savedHives);
    }, [id]);

    if (!apiary) return <p>Пасіка не знайдена</p>;

    return (
        <div className="apiary-page">
            <TopBar title={apiary.name} />

            <section className="notes">
                <h2>Нотатки</h2>
                <textarea placeholder="Записати спостереження..." />
            </section>

            <section className="hives">
                <div className="hives-header">
                    <h2>Вулики ({hives.length})</h2>
                    <label
                        className="add-hive-btn"
                        onClick={() => navigate(`/new-hive/${id}`)}
                        >+
                    </label>
                </div>

                <div className="hives-list">
                    {hives.map(hive => (
                        <div key={hive.id} className="hive-card"
                                onClick={() => navigate(`/hive/${id}/${hive.id}`)}>
                            <div>
                                <p className="hive-name">{hive.hiveName}</p>
                                <p className="hive-rating">{hive.breed}</p>
                            </div>

                            <img
                                src={hive.photo || hiveImg}
                                className="hive-img"
                            />
                        </div>
                    ))}
                </div>



            </section>
        </div>
    );
}
