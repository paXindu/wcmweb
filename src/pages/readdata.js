import { collection, getDocs, updateDoc, doc } from "firebase/firestore";
import { firestore } from "../firebase";
import { useState, useEffect } from "react";

export default function Mapdata() {
  const [locations, setLocations] = useState([]);

  const fetchLocations = async () => {
    const querySnapshot = await getDocs(collection(firestore, "locations"));
    const locationsData = querySnapshot.docs.map((doc) => ({
      ...doc.data(),
      id: doc.id,
    }));
    setLocations(locationsData);
    console.log(locationsData);
  };

  useEffect(() => {
    fetchLocations();
  }, []);

  const handleClick = (location) => {
    window.open(location.lola, "_blank");
  };

  const handleFullButtonClick = async (event, locationId) => {
    event.stopPropagation();
    const locationRef = doc(firestore, "locations", locationId);
    await updateDoc(locationRef, {
      condition: "full",
    });
    const updatedLocations = locations.map((location) => {
      if (location.id === locationId) {
        return { ...location, condition: "full" };
      }
      return location;
    });
    setLocations(updatedLocations);
  };

  const handleCollectedButtonClick = async (event, locationId) => {
    event.stopPropagation();
    const locationRef = doc(firestore, "locations", locationId);
    await updateDoc(locationRef, {
      condition: "normal",
    });
    const updatedLocations = locations.map((location) => {
      if (location.id === locationId) {
        return { ...location, condition: "normal" };
      }
      return location;
    });
    setLocations(updatedLocations);
  };

  return (
    <div className="max-w-3xl mx-auto">
      <h1 className="text-3xl font-bold mb-4">Waste Collection Management</h1>
      <ul className="relative">
        {locations.map((location) => (
          <li
            key={location.id}
            onClick={() => handleClick(location)}
            className="py-2 px-4 rounded-lg shadow-md border border-gray-300 hover:bg-gray-100 cursor-pointer relative"
          >
            <span className="font-bold">{location.name}</span>{" "}
            {location.condition}
            {location.condition === "normal" && (
              <button
                onClick={(event) => handleFullButtonClick(event, location.id)}
                className="py-1 px-2 bg-green-500 hover:bg-green-600 text-white rounded-lg shadow-md absolute right-4 top-1/2 transform -translate-y-1/2"
              >
                Full
              </button>
            )}
            {location.condition === "full" && (
              <button
                onClick={(event) =>
                  handleCollectedButtonClick(event, location.id)
                }
                className="py-1 px-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg shadow-md absolute right-4 top-1/2 transform -translate-y-1/2"
              >
                Collected
              </button>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}
