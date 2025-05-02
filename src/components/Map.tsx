
import React, { useEffect, useRef, useState } from 'react';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';

const ASTANA_COORDS: [number, number] = [71.429865, 51.128236]; // Kuishi Dina 36a general coords

const Map: React.FC = () => {
  const mapContainer = useRef<HTMLDivElement>(null);
  const map = useRef<mapboxgl.Map | null>(null);
  const [token, setToken] = useState<string>(() => localStorage.getItem('mapbox_token') ?? '');
  const [mapError, setMapError] = useState<string | null>(null);

  useEffect(() => {
    if (!token || !mapContainer.current) return;
    
    try {
      mapboxgl.accessToken = token;

      map.current = new mapboxgl.Map({
        container: mapContainer.current,
        style: 'mapbox://styles/mapbox/light-v11',
        projection: 'globe',
        zoom: 15, // Increase zoom level for better visibility
        center: ASTANA_COORDS,
        pitch: 20,
      });

      map.current.addControl(
        new mapboxgl.NavigationControl({
          visualizePitch: true,
        }),
        'top-right'
      );

      map.current.scrollZoom.disable();

      // Add marker for Kuishi Dina 36a
      new mapboxgl.Marker()
        .setLngLat(ASTANA_COORDS)
        .addTo(map.current);

      // Add popup with address
      new mapboxgl.Popup({
        closeOnClick: false,
        closeButton: false
      })
        .setLngLat(ASTANA_COORDS)
        .setHTML('<strong>ГККП "Спортивный медицинский центр города Астаны"</strong><br>ул. Куйши Дина, 36А')
        .addTo(map.current);

      setMapError(null);
    } catch (error) {
      console.error('Error initializing map:', error);
      setMapError('Ошибка загрузки карты. Проверьте токен и попробуйте еще раз.');
    }

    return () => {
      map.current?.remove();
    };
  }, [token]);

  return (
    <div className="w-full h-64 bg-gray-200 rounded-lg relative">
      {!token ? (
        <div className="absolute inset-0 flex flex-col items-center justify-center z-10 bg-white/90 p-4 rounded-lg">
          <span className="font-semibold mb-2">Mapbox картасын көрсету үшін токен енгізіңіз / Введите публичный Mapbox токен для карты</span>
          <input
            className="border p-2 rounded mb-2 text-sm w-full max-w-md"
            type="text"
            placeholder="Mapbox public token"
            value={token}
            onChange={e => {
              setToken(e.target.value);
              localStorage.setItem('mapbox_token', e.target.value);
            }}
          />
          <span className="text-xs text-gray-500 text-center">Токенді https://mapbox.com/ сайтындағы аккаунтыңыздан таба аласыз.<br />Вы можете найти свой токен на сайте https://mapbox.com/ в разделе Tokens.</span>
        </div>
      ) : mapError ? (
        <div className="absolute inset-0 flex flex-col items-center justify-center z-10 bg-white/90 p-4 rounded-lg">
          <span className="text-red-500 font-semibold mb-2">{mapError}</span>
          <button 
            className="bg-gov-blue text-white px-4 py-2 rounded hover:bg-gov-dark-blue text-sm mt-2"
            onClick={() => {
              localStorage.removeItem('mapbox_token');
              setToken('');
              setMapError(null);
            }}
          >
            Сбросить токен
          </button>
        </div>
      ) : null}
      <div ref={mapContainer} className="absolute inset-0 rounded-lg z-0" />
      <div className="absolute inset-0 pointer-events-none bg-gradient-to-b from-transparent to-background/10 rounded-lg" />
    </div>
  );
};

export default Map;
