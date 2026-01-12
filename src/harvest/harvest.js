export const addHarvestRecord = (record) => {
    const saved = JSON.parse(localStorage.getItem("harvest")) || [];
    localStorage.setItem("harvest", JSON.stringify([record, ...saved]));
};

export const getAllHarvest = () => {
    return JSON.parse(localStorage.getItem("harvest")) || [];
};
