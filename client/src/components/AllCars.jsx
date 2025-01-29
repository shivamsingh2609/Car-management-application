
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Carousel } from 'react-responsive-carousel';
import { useNavigate } from 'react-router-dom';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import loadingif from './loading.gif';

const AllCars = () => {
    const [cars, setCars] = useState([]);
    const [carImages, setCarImages] = useState({});
    const [loading, setLoading] = useState(true);
    const [searchKeyword, setSearchKeyword] = useState("");
    const navigate = useNavigate();

    useEffect(() => {
        const fetchCars = async () => {
            try {
                const response = await axios.get(`${process.env.REACT_APP_API_URL}/cars`, {
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': localStorage.getItem('authToken')
                    },
                    params: { keyword: searchKeyword }
                });
                setCars(response.data);
                fetchCarImages(response.data);
            } catch (error) {
                console.error('Error fetching cars:', error);
            } finally {
                setLoading(false);
            }
        };

        const fetchCarImages = async (carsData) => {
            const imagesData = {};
            for (let car of carsData) {
                const carImagesForCar = await Promise.all(
                    car.images.map(async (imageId) => {
                        try {
                            const imageResponse = await axios.get(`${process.env.REACT_APP_API_URL}/get-image/${imageId}`, {
                                headers: {
                                    'Content-Type': 'application/json',
                                    'Authorization': localStorage.getItem('authToken')
                                },
                                responseType: 'blob'
                            });
                            return URL.createObjectURL(imageResponse.data);
                        } catch (err) {
                            console.error(`Error fetching image ${imageId}:`, err);
                            return null;
                        }
                    })
                );
                imagesData[car._id] = carImagesForCar.filter((url) => url !== null);
            }
            setCarImages(imagesData);
        };

        fetchCars();
    }, [searchKeyword]);

    if (loading) return (
        <div className="d-flex justify-content-center align-items-center mt-5">
            <img src={loadingif} style={{ height: '100px', width: '100px' }} alt="Loading" />
        </div>
    );

    const handleCarClick = (carId) => {
        navigate(`/product/${carId}`, {
            state: { carId }
        });
    };

    return (
        <div className="container mt-4 ">

           
            <div className="d-flex justify-content-between flex-wrap mb-4 ">
                <h3 className=' text-dark'>ALL CARS</h3>
                <div className="search-bar d-flex align-items-center">
    <i className="bi bi-search text-dark" style={{ marginRight: '8px' }}></i> 
    <input
        type="text "
        placeholder="Search for cars, description, tags"
        value={searchKeyword}
        onChange={(e) => setSearchKeyword(e.target.value)}
        className="form-control search-input"
    />
</div>

            </div>

            <div className="car-list d-flex flex-wrap justify-content-center">
                {cars.length === 0 ? (
                    <h2 className='text-dark'>No cars found</h2>
                ) : (
                    cars.map((car) => (
                        <div
                            key={car._id}
                            className="car-card"
                            style={{
                                marginBottom: '20px',
                                backgroundColor: '#fff',
                                borderRadius: '10px',
                                boxShadow: 'rgba(0, 0, 0, 0.1) 0px 4px 12px 0px',
                                cursor: 'pointer',
                                width: '300px',
                                transition: 'transform 0.3s ease',
                            }}
                            onClick={() => handleCarClick(car._id)}
                        >
                            <div className="car-images">
                                <Carousel showThumbs={false} dynamicHeight={false} showStatus={false}>
                                    {carImages[car._id]?.map((imageUrl, index) => (
                                        <div key={index}>
                                            <img
                                                src={imageUrl}
                                                alt={car.title}
                                                style={{
                                                    width: '100%',
                                                    height: '200px',
                                                    borderRadius: '10px',
                                                    objectFit: 'cover'
                                                }}
                                                loading="lazy"
                                            />
                                        </div>
                                    ))}
                                </Carousel>
                            </div>
                            <div className="car-info p-3">
                                <h5 className='car-title text-dark'>{car.title}</h5>
                                <p className="btn btn-dark view-more-btn mt-2" style={{ fontSize: '14px' }}>View More</p>
                            </div>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
};

export default AllCars;
