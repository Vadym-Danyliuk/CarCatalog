import { useState, useEffect, useContext, createContext } from "react";
import { getFavorites, saveFavorites } from "../utils/localStorage";

const FavoritesContext = createContext();

export const FavoritesProvider = ({ children }) => {
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    const saved = getFavorites();
    setFavorites(saved);
  }, []);

  const toggleFavorite = (carId) => {
    setFavorites((prev) => {
      const updated = prev.includes(carId)
        ? prev.filter((id) => id !== carId)
        : [...prev, carId];

      saveFavorites(updated);
      return updated;
    });
  };

  return (
    <FavoritesContext.Provider value={{ favorites, toggleFavorite }}>
      {children}
    </FavoritesContext.Provider>
  );
};

export const useFavorites = () => {
  const context = useContext(FavoritesContext);
  if (!context) {
    throw new Error("useFavorites must be used within FavoritesProvider");
  }
  return context;
};
