import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getCarById } from '../../services/api';
import { formatMileage } from '../../utils/formatMileage';
import Loader from '../../components/Loader/Loader';
import FavoriteButton from '../../components/FavoriteButton/FavoriteButton';
import toast from 'react-hot-toast';
import styles from './CarDetailsPage.module.css';

const CarDetailsPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [car, setCar] = useState(null);
  const [loading, setLoading] = useState(true);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    startDate: '',
    endDate: '',
    message: ''
  });

  useEffect(() => {
    loadCarDetails();
  }, [id]);

  const loadCarDetails = async () => {
    try {
      setLoading(true);
      const data = await getCarById(id);
      setCar(data);
    } catch (error) {
      console.error('Error loading car details:', error);
      toast.error('Failed to load car details');
      navigate('/catalog');
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Валідація
    if (!formData.name || !formData.email || !formData.phone || !formData.startDate || !formData.endDate) {
      toast.error('Please fill in all required fields');
      return;
    }
    
    // Успішне бронювання
    toast.success(`Successfully booked ${car.brand} ${car.model}!`);
    
    // Очищення форми
    setFormData({
      name: '',
      email: '',
      phone: '',
      startDate: '',
      endDate: '',
      message: ''
    });
  };

  if (loading) return <Loader />;
  if (!car) return null;

  const addressParts = car.address.split(', ');
  const city = addressParts[1];
  const country = addressParts[2];

  return (
    <div className={styles.container}>
      <button onClick={() => navigate('/catalog')} className={styles.backBtn}>
        ← Back to Catalog
      </button>

      <div className={styles.content}>
        <div className={styles.imageSection}>
          <div className={styles.imageWrapper}>
            <img src={car.img} alt={`${car.brand} ${car.model}`} className={styles.image} />
            <FavoriteButton carId={car.id} />
          </div>
          
          <div className={styles.info}>
            <h1 className={styles.title}>
              {car.brand} <span className={styles.model}>{car.model}</span>, {car.year}
            </h1>
            
            <div className={styles.price}>
              <span className={styles.priceLabel}>Price:</span>
              <span className={styles.priceValue}>${car.rentalPrice}/hour</span>
            </div>

            <div className={styles.details}>
              <div className={styles.detailItem}>
                <span className={styles.detailLabel}>Location:</span>
                <span>{city}, {country}</span>
              </div>
              <div className={styles.detailItem}>
                <span className={styles.detailLabel}>Type:</span>
                <span>{car.type}</span>
              </div>
              <div className={styles.detailItem}>
                <span className={styles.detailLabel}>Mileage:</span>
                <span>{formatMileage(car.mileage)} km</span>
              </div>
              <div className={styles.detailItem}>
                <span className={styles.detailLabel}>Fuel Consumption:</span>
                <span>{car.fuelConsumption}</span>
              </div>
              <div className={styles.detailItem}>
                <span className={styles.detailLabel}>Engine Size:</span>
                <span>{car.engineSize}</span>
              </div>
            </div>

            <div className={styles.section}>
              <h2 className={styles.sectionTitle}>Description</h2>
              <p className={styles.description}>{car.description}</p>
            </div>

            <div className={styles.section}>
              <h2 className={styles.sectionTitle}>Accessories and functionalities</h2>
              <div className={styles.tags}>
                {[...car.accessories, ...car.functionalities].map((item, index) => (
                  <span key={index} className={styles.tag}>{item}</span>
                ))}
              </div>
            </div>

            <div className={styles.section}>
              <h2 className={styles.sectionTitle}>Rental Conditions</h2>
              <div className={styles.conditions}>
                {car.rentalConditions.map((condition, index) => (
                  <span key={index} className={styles.condition}>{condition}</span>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className={styles.bookingSection}>
          <h2 className={styles.bookingTitle}>Book this car</h2>
          <form className={styles.form} onSubmit={handleSubmit}>
            <div className={styles.formRow}>
              <div className={styles.formGroup}>
                <label className={styles.label}>Name *</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  className={styles.input}
                  placeholder="Your name"
                  required
                />
              </div>
              <div className={styles.formGroup}>
                <label className={styles.label}>Email *</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className={styles.input}
                  placeholder="your@email.com"
                  required
                />
              </div>
            </div>

            <div className={styles.formRow}>
              <div className={styles.formGroup}>
                <label className={styles.label}>Phone *</label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  className={styles.input}
                  placeholder="+380 XX XXX XX XX"
                  required
                />
              </div>
              <div className={styles.formGroup}>
                <label className={styles.label}>Start Date *</label>
                <input
                  type="date"
                  name="startDate"
                  value={formData.startDate}
                  onChange={handleInputChange}
                  className={styles.input}
                  required
                />
              </div>
            </div>

            <div className={styles.formRow}>
              <div className={styles.formGroup}>
                <label className={styles.label}>End Date *</label>
                <input
                  type="date"
                  name="endDate"
                  value={formData.endDate}
                  onChange={handleInputChange}
                  className={styles.input}
                  required
                />
              </div>
            </div>

            <div className={styles.formGroup}>
              <label className={styles.label}>Additional Message</label>
              <textarea
                name="message"
                value={formData.message}
                onChange={handleInputChange}
                className={styles.textarea}
                placeholder="Any special requests..."
                rows="4"
              />
            </div>

            <button type="submit" className={styles.submitBtn}>
              Book Now
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CarDetailsPage;
