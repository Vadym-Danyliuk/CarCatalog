import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getCarById } from "../../services/api";
import EmailForm from "./components/EmailForm/EmailForm";
import Loader from "../../components/Loader/Loader";
import Container from "../../components/Container/Container";
import CarHeadingSection from "./components/CarHeadingSection/CarHeadingSection";
import CarCharacteristicList from "./components/CarCharacteristicList/CarCharacteristicList";
import { capitalizeFirstLetter } from "../../utils/formatters";
import styles from "./CarDetailsPage.module.css";

const CarDetailsPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [car, setCar] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    loadCar();
  }, [id]);

  const loadCar = async () => {
    if (!id) {
      setError("Car ID not provided");
      setLoading(false);
      return;
    }

    try {
      setLoading(true);
      setError("");
      const carData = await getCarById(id);
      setCar(carData);
    } catch (error) {
      console.error("Error loading car:", error);
      if (error.message === "Failed to fetch car details") {
        navigate("/catalog");
      } else {
        setError("Failed to load car details. Please try again later.");
      }
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <Container>
        <Loader />
      </Container>
    );
  }

  if (error || !car) {
    return (
      <Container className={styles.waiter}>
        <p>Failed to load car details. Please try again later.</p>
      </Container>
    );
  }

  const carSpecifications = [
    { icon: "icon-calendar", text: `Year: ${car.year}` },
    { icon: "icon-car", text: `Type: ${capitalizeFirstLetter(car.type)}` },
    {
      icon: "icon-fuel-pump",
      text: `Fuel Consumption: ${car.fuelConsumption}`,
    },
    { icon: "icon-gear", text: `Engine Size: ${car.engineSize}` },
  ];

  return (
    <Container className={styles.carWrapper}>
      <div className={styles.leftColumn}>
        <div className={styles.carImageWrapper}>
          <img
            src={car.img}
            alt={`${car.brand} ${car.model}`}
            className={styles.carImage}
            loading="eager"
          />
        </div>
        
        <div className={styles.formSection}>
          <EmailForm carId={car.id} />
        </div>
      </div>
      
      <div className={styles.rightColumn}>
        <CarHeadingSection car={car} />
        <CarCharacteristicList
          title="Rental Conditions:"
          items={car.rentalConditions.map((condition) => ({
            icon: "icon-check-circle",
            text: condition,
          }))}
        />
        <CarCharacteristicList
          title="Car Specifications:"
          items={carSpecifications}
        />
        <CarCharacteristicList
          title="Accessories and functionalities:"
          items={[...car.accessories, ...car.functionalities].map((item) => ({
            icon: "icon-check-circle",
            text: item,
          }))}
        />
      </div>
    </Container>
  );
};

export default CarDetailsPage;