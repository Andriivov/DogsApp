import { useState } from "react";

import styles from "./SavedCards.module.scss";
import { useEffect } from "react";
import SavedCard from "./SavedCard";

const SavedCards = () => {
    const [savedBreeds, setSavedBreeds] = useState([]);

    useEffect(() => {
        // Зчитати дані з localStorage при завантаженні компонента
        const storedBreeds = JSON.parse(localStorage.getItem('selectedDogBreeds')) || [];
        setSavedBreeds(storedBreeds);
    }, []);

    const handleRemoveBreed = () => {
        // Оновити дані після видалення картки
        const storedBreeds = JSON.parse(localStorage.getItem('selectedDogBreeds')) || [];
        setSavedBreeds(storedBreeds);
    };

    return (
        <main className={styles.mainSaved}>
            <ul className={styles.dogs__cards} >

                {savedBreeds.map(breed => (
                    <SavedCard key={breed.id} breed={breed} onRemove={handleRemoveBreed} />
                ))}
            </ul>
        </main>
    );
}

export default SavedCards;