import React, { useState } from "react";

function NewPlantForm({ handleNewPlant, url }) {
  const template = { name: "", image: "", price: 0 };
  const [form, setForm] = useState(template);

  function onChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  function handleSubmit(e) {
    e.preventDefault();
    fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(form),
    })
      .then((resp) => resp.json())
      .then((data) => handleNewPlant(data));
    setForm(template);
  }
  return (
    <div className="new-plant-form">
      <h2>New Plant</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="name"
          placeholder="Plant name"
          onChange={onChange}
          value={form.name}
        />
        <input
          type="text"
          name="image"
          placeholder="Image URL"
          onChange={onChange}
          value={form.image}
        />
        <input
          type="number"
          name="price"
          step="0.01"
          placeholder="Price"
          onChange={onChange}
          value={form.price}
        />
        <button type="submit">Add Plant</button>
      </form>
    </div>
  );
}

export default NewPlantForm;
