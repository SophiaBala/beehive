import { useNavigate } from "react-router-dom";
import backarrow from "../assets/back-arrow.png";
import "./TopBar.css";

export default function TopBar({ title, rightElement }) {
    const navigate = useNavigate();
    return (
        <header className="top-bar">
            <button onClick={() => navigate(-1)} className="back-btn">
                <img src={backarrow} alt="Назад" />
            </button>
            <h1 className="title">{title}</h1>
            <div className="top-bar-right">{rightElement}</div>
        </header>
    );
}