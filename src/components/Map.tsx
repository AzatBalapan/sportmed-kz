
import React, { useEffect, useRef, useState } from 'react';
// @ts-ignore
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';

const ASTANA_COORDS = [71.429865, 51.128236]; // Kuishi Dina 36a general coords; can be adjusted more precisely

const Map: React.FC = () => {
  const mapContainer = useRef<HTMLDivElement>(null);
  const map = useRef<any>(null);
  const [token, setToken] = useState<string>(() => localStorage.getItem('mapbox_token') ?? '');

  useEffect(() => {
    if (!token || !mapContainer.current) return;
    // @ts-ignore
    mapboxgl.accessToken = token;

    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: 'mapbox://styles/mapbox/light-v11',
      projection: 'globe',
      zoom: 13,
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

    return () => {
      map.current && map.current.remove();
    };
  }, [token]);

  return (
    <div className="w-full h-64 bg-gray-200 rounded-lg relative">
      {!token ? (
        <div className="absolute inset-0 flex flex-col items-center justify-center z-10 bg-white/90 p-4 rounded-lg">
          <span className="font-semibold mb-2">Mapbox картасын көрсету үшін токен енгізіңіз / Введите публичный Mapbox токен для карты</span>
          <input
            className="border p-2 rounded mb-2 text-sm"
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
      ) : null}
      <div ref={mapContainer} className="absolute inset-0 rounded-lg z-0" />
      <div className="absolute inset-0 pointer-events-none bg-gradient-to-b from-transparent to-background/10 rounded-lg" />
    </div>
  );
};

export default Map;
