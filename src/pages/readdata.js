import { collection, getDocs, updateDoc, doc } from "firebase/firestore";
import { firestore } from '../firebase';
import { useState, useEffect } from 'react';

export default function Mapdata() {
    const [locations, setLocations] = useState([]);
    const [inputValue, setInputValue] = useState("");

    const fetchLocations = async () => {
        const querySnapshot = await getDocs(collection(firestore, "locations"));
        const locationsData = querySnapshot.docs.map(doc => ({ ...doc.data(), id: doc.id }));
        setLocations(locationsData);
        console.log(locationsData);
    };

    useEffect(() => {
        fetchLocations();
    }, []);

    const handleClick = (location) => {
        window.location.href = location.lola;
    };

    const handleButtonClick = async () => {
        const locationRef = doc(firestore, "locations", inputValue);
        await updateDoc(locationRef, {
            condition: "normal"
        });
        const querySnapshot = await getDocs(collection(firestore, "locations"));
        const locationsData = querySnapshot.docs.map(doc => ({ ...doc.data(), id: doc.id }));
        setLocations(locationsData);
    };

    return (
        <div>
            <h1>Locations:</h1>
            <input type="text" value={inputValue} onChange={(e) => setInputValue(e.target.value)} />
            <button onClick={handleButtonClick}>Update condition to collected</button>
            <ul>
                {locations.map(location => (
                    <li key={location.id} onClick={() => handleClick(location)}>
                        {location.name} {location.condition}
                    </li>
                ))}
            </ul>
        </div>
    );
}

