import React, { useState } from "react";

function PlantCard({ plant, onDelete, url, update }) {
  const [inStock, setInStock] = useState(true);

  function stock() {
    setInStock((prevInStock) => !prevInStock);
  }

  function deletePlant() {
    fetch(`${url}/${plant.id}`, {
      method: "DELETE",
    }).then(onDelete(plant));
  }

  function updatePrice() {
    const updated = { ...plant, price: plant.price + 1 };

    fetch(`${url}/${plant.id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updated),
    })
      .then((resp) => resp.json())
      .then((data) => update(data));
  }

  return (
    <li className="card">
      <img src={plant.image} alt={plant.name} />
      <h4>{plant.name}</h4>
      <p>Price: {plant.price}</p>

      <button onClick={stock} className={inStock ? "primary" : ""}>
        {inStock ? "In Stock" : "Out Of Stock"}
      </button>
      <button
        onClick={deletePlant}
        style={{ backgroundColor: "red", color: "white" }}
      >
        Delete
      </button>
      <button
        onClick={updatePrice}
        style={{ backgroundColor: "beige", color: "black" }}
      >
        Update
      </button>
    </li>
  );
}

export default PlantCard;
