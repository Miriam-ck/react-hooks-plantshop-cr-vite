import React from "react";
import PlantCard from "./PlantCard";

// Renders one card per plant. The key lets React track each card
// (and its inStock state) correctly when the list is filtered.
function PlantList({ plants }) {
  return (
    <ul className="cards">
      {plants.map((plant) => (
        <PlantCard key={plant.id} plant={plant} />
      ))}
    </ul>
  );
}

export default PlantList;
