import React, { useState } from "react";

const API_URL = "http://localhost:6001/plants";

// Controlled form that creates a plant on the backend.
function NewPlantForm({ onAddPlant }) {
  const [formData, setFormData] = useState({ name: "", image: "", price: "" });

  // One handler for all inputs, keyed by each input's name attribute.
  function handleChange(e) {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  }

  function handleSubmit(e) {
    e.preventDefault();

    fetch(API_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    })
      .then((r) => r.json())
      .then((newPlant) => {
        onAddPlant(newPlant); // use the server's copy so it has an id
        setFormData({ name: "", image: "", price: "" }); // reset the form
      });
  }

  return (
    <div className="new-plant-form">
      <h2>New Plant</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="name"
          placeholder="Plant name"
          value={formData.name}
          onChange={handleChange}
        />
        <input
          type="text"
          name="image"
          placeholder="Image URL"
          value={formData.image}
          onChange={handleChange}
        />
        <input
          type="number"
          name="price"
          step="0.01"
          placeholder="Price"
          value={formData.price}
          onChange={handleChange}
        />
        <button type="submit">Add Plant</button>
      </form>
    </div>
  );
}

export default NewPlantForm;
