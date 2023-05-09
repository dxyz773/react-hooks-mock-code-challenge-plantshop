import React, { useEffect, useState } from "react";
import NewPlantForm from "./NewPlantForm";
import PlantList from "./PlantList";
import Search from "./Search";

function PlantPage() {
  const url = "http://localhost:6001/plants";
  const [plants, setPlants] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    fetch(url)
      .then((resp) => resp.json())
      .then((data) => setPlants(data));
  }, []);

  function handleNewPlant(plant) {
    setPlants([...plants, plant]);
  }

  function onSearch(e) {
    setSearch(e.target.value);
  }

  function handleDelete(deleted) {
    const deletedPlant = [...plants].filter((plant) => plant.id !== deleted.id);
    setPlants(deletedPlant);
  }

  function handleUpdate(updated) {
    const updatedPlants = [...plants].map((p) => {
      if (p.id === updated.id) {
        return { ...p, price: updated.price };
      } else return p;
    });
    setPlants(updatedPlants);
  }

  let searchedPlant = [...plants].filter((plant) =>
    plant.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <main>
      <NewPlantForm handleNewPlant={handleNewPlant} url={url} />
      <Search onSearch={onSearch} />
      <PlantList
        update={handleUpdate}
        url={url}
        onDelete={handleDelete}
        plants={searchedPlant}
      />
    </main>
  );
}

export default PlantPage;
