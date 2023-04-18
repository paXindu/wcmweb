import { collection, getDocs } from "firebase/firestore";
import { firestore } from '../firebase';
import { useState, useEffect } from 'react';


export default function Home() {
    const [locations, setLocations] = useState([]);

    const fetchLocations = async () => {
        const querySnapshot = await getDocs(collection(firestore, "locations"));
        const locationsData = querySnapshot.docs.map(doc => ({ ...doc.data(), id: doc.id }));
        setLocations(locationsData);
        console.log(locationsData);
    };

    useEffect(() => {
        fetchLocations();
    }, []);

    return (
        <div>
            <h1>Locations:</h1>
            <ul>
                {locations.map(location => (
                    <li key={location.id}>{location.name} {location.lola} {location.percentage}</li>
                ))}
            </ul>
        </div>
    );
}


