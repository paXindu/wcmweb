
import { firestore } from '../firebase';
import { useState, useEffect } from 'react';


const db = firestore();

function QrApp() {
    const [number, setNumber] = useState("");
    const [condition, setCondition] = useState("");

    const handleSubmit = (event) => {
        event.preventDefault();
        // update Firestore document with entered number and change "condition" to "normal"
        db.collection("locations").doc("locations").set({
            number: number,
            condition: "normal",
        });
    };

    // fetch "condition" value from Firestore document on component mount
    useEffect(() => {
        db.collection("yourCollection")
            .doc("yourDocument")
            .onSnapshot((doc) => {
                setCondition(doc.data().condition);
            });
    }, []);

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <label>
                    Enter a number:
                    <input
                        type="number"
                        value={number}
                        onChange={(event) => setNumber(event.target.value)}
                    />
                </label>
                <button type="submit">Submit</button>
            </form>
            <p>Condition: {condition}</p>
        </div>
    );
}

export default QrApp;
