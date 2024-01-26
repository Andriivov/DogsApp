import styles from './DogCardItem.module.scss';
import { useState } from 'react';
import { Button } from 'antd';

const DogCardItem = ({ breed }) => {
    const [isOpen, setOpen] = useState(false);

    
    const saveToLocalStorage = () => { 
        // Отримати поточний масив обраних карток з localStorage
        const existingCards = JSON.parse(localStorage.getItem('selectedDogBreeds')) || [];

        // Перевірка, чи обрана карта вже збережена
        const isCardAlreadySelected = existingCards.some(selectedCard => selectedCard.id === breed.id);

        if (!isCardAlreadySelected) {
            // Додати обрану картку до масиву
            const updatedCards = [...existingCards, breed];

            // Зберегти оновлений масив в localStorage
            localStorage.setItem('selectedDogBreeds', JSON.stringify(updatedCards));
        } else {
            alert('Ця карта вже обрана!');
        }
    }

    const toggleOpen = () => {
        setOpen(!isOpen); 
    }



    return (
        <li className={styles.dogs__card} key={breed.id}>
            <img src={breed.image.url} className={styles.dogs__card__image} alt="photo of breed" />
            <h3 className={styles.dogs__card__name}>{breed.name}</h3>
            <Button type="text" className={styles.dogs__card__button} onClick={toggleOpen}>More info</Button>
            {isOpen && (
                <div className={styles.dogs__card__description}>
                    <p className={styles.dogs__card__description__temperament}><span>Temperament</span> {breed.temperament}</p>
                    <p className={styles.dogs__card__description__origin}>Origin: {breed.origin}</p>
                    <p className={styles.dogs__card__description__lifeSpan}>Lifetime: {breed.life_span}</p>
                    <p className={styles.dogs__card__description__weight}>Weight: {breed.weight.metric}</p>
                </div>
            )}
            <Button type="primary" onClick={saveToLocalStorage} className={styles.dogs__card__buttonSave}>Save</Button>
        </li>

        
    );
};

export default DogCardItem;