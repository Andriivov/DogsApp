import { useState } from 'react';
import axios from 'axios'
import { useEffect } from 'react';
import styles from './Home.module.scss';
import DogCardItem from './DogCardItem';
import { Input } from 'antd';
import { Button } from 'antd';

axios.defaults.baseURL = 'https://api.thedogapi.com/v1/';
// 

const Home = () => {
    const [breeds, setBreeds] = useState([]);
    const [limits, setLimits] = useState(10);
    const [searched, setSearched] = useState({
        query: '',
        list: []
    });

    useEffect(() => {
        const fetchBreeds = async () => {
            try {
                const response = await axios.get('https://api.thedogapi.com/v1/breeds', {
                    headers: {
                        'x-api-key': 'live_x97ioSoiFLp00Y3qHg9fnLSTzeGBqLe633GG3Z9dJHJtdl8TvSrNn3XISzzRwJ9m'
                    },

                    params: {
                        limit: limits
                    }
                });
                setBreeds(response.data);
                console.log(response.data);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };
        fetchBreeds();

    }, [limits]);

    const getMoreBreeds = () => {
        setLimits(limits + 10);
    }
    const showLessBreeds = () => {
        setLimits(limits - 10);
    }

    const handleChange = (e) => {
        const results = breeds.filter(breed => breed.name.toLowerCase().includes(e.target.value.toLowerCase()));
        setSearched({
            query: e.target.value,
            list: results
        })
    }

    return (
        <main className={styles.mainSection}>
            <h1 className={styles.mainSection__heroTitle} >Welcome to the dogs lover hub</h1>
            <div className={styles.searchContainer}>
                <p className={styles.mainSection__heroText}>Find your perfect dog here</p>
                <Input type="text" placeholder="Search..." className={styles.mainSection__search} value={searched.query} onChange={handleChange} />
            </div>   
            <ul className={styles.dogs__cards}>
                {searched.query === '' ? breeds.map(breed => (
                    <DogCardItem key={breed.id} breed={breed} />
                )) : searched.list.map(breed => (
                    <DogCardItem key={breed.id} breed={breed} />
                ))}
            </ul>
            <Button className={styles.mainSection__buttonGetMore} onClick={getMoreBreeds}>Get more breeds</Button>
            <Button className={styles.mainSection__buttonShowLess} onClick={showLessBreeds} disabled={limits <= 10}>Show less breeds</Button>
        </main>
    );
};

export default Home;