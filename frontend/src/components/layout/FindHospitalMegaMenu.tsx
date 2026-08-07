import React, { useState, useEffect } from 'react';
import styles from './FindHospitalMegaMenu.module.css';

interface Location {
  id: string;
  name: string;
  mapUrl: string;
}

interface City {
  id: string;
  name: string;
  imageUrl: string;
  locations: Location[];
}

interface Props {
  onClose?: () => void;
}

export default function FindHospitalMegaMenu({ onClose }: Props) {
  const [cities, setCities] = useState<City[]>([]);
  const [loading, setLoading] = useState(true);
  const [hoveredCityId, setHoveredCityId] = useState<string | null>(null);

  useEffect(() => {
    fetch('http://localhost:5000/api/cities')
      .then(res => res.json())
      .then(data => {
        setCities(data);
        setLoading(false);
      })
      .catch(err => {
        console.error("Error fetching cities:", err);
        setLoading(false);
      });
  }, []);

  return (
    <div className={styles.wrapper}>
      <div className={styles.container}>
        <div className={styles.header}>
          <div className={styles.headerText}>
            <h2>Midtown Hospitals Network: Delivering Advanced Healthcare</h2>
            <p>
              With a nationwide presence spanning numerous hospitals and clinics, Midtown Hospitals ensures advanced healthcare access across major cities and regional centres in India. Designed to support both routine and complex medical needs, the Midtown Hospitals network enables patients to access multispeciality and super-speciality care through a seamlessly connected healthcare ecosystem.
            </p>
          </div>
          <button className={styles.exploreBtn}>EXPLORE ALL LOCATIONS &rarr;</button>
        </div>

        {loading ? (
          <div className={styles.loading}>Loading locations...</div>
        ) : (
          <div className={styles.grid}>
            {cities.map(city => (
              <div 
                key={city.id} 
                className={styles.card}
                onMouseEnter={() => setHoveredCityId(city.id)}
                onMouseLeave={() => setHoveredCityId(null)}
              >
                <div className={styles.cardContent}>
                  <div 
                    className={styles.cityImage} 
                    style={{ backgroundImage: `url(${city.imageUrl})` }}
                  />
                  <div className={styles.cityInfo}>
                    <span className={styles.cityLabel}>Midtown Hospitals In {city.name}</span>
                    <h3 className={styles.cityName}>{city.name}</h3>
                    <span className={styles.locationCount}>{city.locations.length} Location{city.locations.length !== 1 ? 's' : ''}</span>
                  </div>
                </div>

                {hoveredCityId === city.id && (
                  <div className={styles.locationsOverlay}>
                    <h4>{city.name} Locations</h4>
                    <ul className={styles.locationsList}>
                      {city.locations.map(loc => (
                        <li key={loc.id}>
                          <a href={loc.mapUrl} target="_blank" rel="noopener noreferrer">
                            <div className={styles.locationInfo}>
                              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={styles.locationIcon}>
                                <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
                                <circle cx="12" cy="10" r="3"></circle>
                              </svg>
                              <span className={styles.locationName}>{loc.name}</span>
                            </div>
                            <span className={styles.directionIcon}>&#8599;</span>
                          </a>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
