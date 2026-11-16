import React, { useState, useEffect } from "react";
import NewPlantForm from "./NewPlantForm";
import PlantList from "./PlantList";
import Search from "./Search";

const API_URL = "http://localhost:6001/plants";

// Parent component: owns the plant list and search text so that
// the form, search bar and list can all share them.
function PlantPage() {
  const [plants, setPlants] = useState([]);
  const [search, setSearch] = useState("");

  // Fetch all plants once on first render (empty dependency array).
  useEffect(() => {
    fetch(API_URL)
      .then((r) => r.json())
      .then(setPlants);
  }, []);

  // Called by NewPlantForm after the backend confirms the new plant.
  function handleAddPlant(newPlant) {
    setPlants((plants) => [...plants, newPlant]);
  }

  // Derived from state rather than stored, so clearing the search
  // brings every plant back ("" is included in every string).
  const plantsToDisplay = plants.filter((plant) =>
    plant.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <main>
      <NewPlantForm onAddPlant={handleAddPlant} />
      <Search search={search} onSearchChange={setSearch} />
      <PlantList plants={plantsToDisplay} />
    </main>
  );
}

export default PlantPage;
