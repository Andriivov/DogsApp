import { useState } from 'react';
import { Button } from 'antd';

import styles from './SavedCard.module.scss';

const SavedCard = ({ breed, onRemove }) => {
    const [isOpen, setIsOpen] = useState(false);
    const toggleOpen = () => {
        setIsOpen(!isOpen);
    };

    const removeFromLocalStorage = () => {
        // Отримати поточний масив обраних карток з localStorage
        const existingCards = JSON.parse(localStorage.getItem('selectedDogBreeds')) || [];

        // Видалити обрану картку з масиву
        const updatedCards = existingCards.filter(selectedCard => selectedCard.id !== breed.id);

        // Зберегти оновлений масив в localStorage
        localStorage.setItem('selectedDogBreeds', JSON.stringify(updatedCards));

        // Викликати функцію onRemove для оновлення інтерфейсу
        onRemove();
    };

    return (
        <li className={styles.dogs__card} key={breed.id}>
            <img src={breed.image.url} className={styles.dogs__card__image} alt="photo of breed" />
            <h3 className={styles.dogs__card__name}>{breed.name}</h3>
            <Button type="text"  className={styles.dogs__card__button} onClick={toggleOpen}><span>More info</span></Button>
            {isOpen && (
                <div className={styles.dogs__card__description}>
                    <p className={styles.dogs__card__description__temperament}><span>Temperament</span> {breed.temperament}</p>
                    <p className={styles.dogs__card__description__origin}>Origin: {breed.origin}</p>
                    <p className={styles.dogs__card__description__lifeSpan}>Lifetime: {breed.life_span}</p>
                    <p className={styles.dogs__card__description__weight}>Weight: {breed.weight.metric}</p>
                </div>
            )}
            <Button type="primary" danger onClick={removeFromLocalStorage} className={styles.dogs__card__buttonDelete}>Delete</Button>
        </li>
    );
};

export default SavedCard;