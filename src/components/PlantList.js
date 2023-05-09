import React from "react";
import PlantCard from "./PlantCard";

function PlantList({ plants, onDelete, url, update }) {
  const plantCards = plants.map((plant) => (
    <PlantCard
      key={plant.id}
      plant={plant}
      onDelete={onDelete}
      url={url}
      update={update}
    />
  ));
  return <ul className="cards">{plantCards}</ul>;
}

export default PlantList;
