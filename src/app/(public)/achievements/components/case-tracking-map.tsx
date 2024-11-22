'use client';

import React, { useState, useCallback, useMemo } from 'react';
import {
  GoogleMap,
  useLoadScript,
  Marker,
  InfoWindow,
  MarkerClusterer,
} from '@react-google-maps/api';
import { Button } from '@/components/ui/button';
import mockData from './case_data.json';
import { Library } from '@googlemaps/js-api-loader';

// 定義 Google Maps API 所需的庫
const libraries: Library[] = ['places'];

// 地圖容器樣式
const mapContainerStyle = {
  width: '100%',
  height: '100%',
};

// 地圖中心點（台南市政府）
const center = {
  lat: 22.9908,
  lng: 120.2133,
};

// 自定義 InfoWindow 樣式
const infoWindowStyle = {
  background: `linear-gradient(to bottom, #2a9d8f, #264653)`,
  border: 'none',
  borderRadius: '8px',
  padding: '12px',
  boxShadow: '0 2px 7px 1px rgba(0, 0, 0, 0.3)',
};

const contentStyle = {
  color: 'white',
  maxWidth: '200px',
};

// 根據案件狀態獲取標記顏色
const getMarkerOptions = (state: string) => {
  const colorMap = {
    // 待處理: '#4CAF50', // 綠色
    // 進行中: '#FFC107', // 黃色
    // 已完成: '#2196F3', // 藍色
    // 已媒合: '#9E9E9E', // 灰色
  };

  return {
    // path: window.google.maps.SymbolPath.MARKER,
    fillColor: /* colorMap[state] || */ '#FF0000', // 默認紅色
    fillOpacity: 1,
    strokeWeight: 1,
    strokeColor: '#FFFFFF',
    scale: 1.5,
  };
};

const CaseTrackingMap = ({ locations: propLocations }) => {
  // 使用傳入的 locations 或默認的 mockData
  const locations = propLocations || mockData;
  // 狀態管理
  const [selectedLocation, setSelectedLocation] = useState(null);
  const [searchInput, setSearchInput] = useState('');
  const [searchResults, setSearchResults] = useState([]);

  // 載入 Google Maps API
  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || '',
    libraries,
  });

  // 處理搜尋輸入
  const handleSearchInput = (value) => {
    setSearchInput(value);
    if (!value.trim()) {
      setSearchResults([]);
      return;
    }

    // 過濾符合的位置
    const filteredLocations = locations.filter((location) =>
      location.caseName.toLowerCase().includes(value.toLowerCase())
    );
    setSearchResults(filteredLocations);
  };

  // 處理搜尋結果選擇
  const handlePlaceSelect = async (location) => {
    try {
      const geocoder = new window.google.maps.Geocoder();
      const response = await geocoder.geocode({
        location: { lat: location.lat, lng: location.lng },
      });

      setSelectedLocation({
        type: 'marker',
        ...location,
        address: response.results?.[0]?.formatted_address || '無法取得地址',
      });

      setSearchInput('');
      setSearchResults([]);
    } catch (error) {
      console.error('Geocoding error:', error);
      setSelectedLocation({
        type: 'marker',
        ...location,
        address: '無法取得地址',
      });
    }
  };

  // 處理標記點擊
  const handleMarkerClick = useCallback((caseItem) => {
    setSelectedLocation(caseItem);
  }, []);

  // 處理信息窗口關閉
  const handleInfoWindowClose = useCallback(() => {
    setSelectedLocation(null);
  }, []);

  // 生成標記選項
  const markerOptions = useMemo(() => {
    return locations.reduce((acc, location) => {
      acc[location.id] = getMarkerOptions(location.state);
      return acc;
    }, {});
  }, [locations]);

  // 聚類選項
  const clusterOptions = {
    imagePath:
      'https://developers.google.com/maps/documentation/javascript/examples/markerclusterer/m',
    gridSize: 50,
    zoomOnClick: true,
    maxZoom: 15,
    minimumClusterSize: 2,
    styles: [
      {
        textColor: 'white',
        url: 'https://developers.google.com/maps/documentation/javascript/examples/markerclusterer/m1.png',
        height: 52,
        width: 53,
      },
      {
        textColor: 'white',
        url: 'https://developers.google.com/maps/documentation/javascript/examples/markerclusterer/m2.png',
        height: 56,
        width: 55,
      },
      {
        textColor: 'white',
        url: 'https://developers.google.com/maps/documentation/javascript/examples/markerclusterer/m3.png',
        height: 66,
        width: 65,
      },
    ],
  };

  if (loadError) return <div>無法載入地圖</div>;
  if (!isLoaded) return <div>正在載入地圖...</div>;

  return (
    <GoogleMap mapContainerStyle={mapContainerStyle} zoom={13} center={center}>
      <MarkerClusterer options={clusterOptions}>
        {(clusterer) =>
          locations.map((location) => (
            <Marker
              key={location.id}
              position={location}
              title={location.name}
              onClick={() => handleMarkerClick(location)}
              clusterer={clusterer}
              icon={{
                url: `data:image/svg+xml;charset=UTF-8,${encodeURIComponent(`
                          <svg xmlns="http://www.w3.org/2000/svg" width="36" height="36" viewBox="0 0 24 24">
                            <path fill="${markerOptions[location.id].fillColor}" d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z"/>
                            <path fill="rgba(0,0,0,0.2)" d="M12 1C7.58 1 4 4.58 4 9c0 5.75 8 14 8 14s8-8.25 8-14c0-4.42-3.58-8-8-8zm0 1c3.87 0 7 3.13 7 7 0 5.25-7 13-7 13S5 14.25 5 9c0-3.87 3.13-7 7-7z"/>
                            <circle fill="rgba(0,0,0,0.2)" cx="12" cy="9" r="3.5"/>
                          </svg>
                        `)}`,
                scaledSize: new window.google.maps.Size(36, 36),
                anchor: new window.google.maps.Point(18, 36),
              }}
            />
          ))
        }
      </MarkerClusterer>
      {selectedLocation && (
        <InfoWindow
          position={selectedLocation}
          onCloseClick={handleInfoWindowClose}
          options={{
            pixelOffset: new window.google.maps.Size(0, -30),
            maxWidth: 320,
            minWidth: 160,
          }}
        >
          <div style={infoWindowStyle}>
            <div style={contentStyle}>
              <h3 className="font-bold mb-2">{selectedLocation.caseName}</h3>
              <p className="mb-2">狀態: {selectedLocation.state}</p>
              <Button
                size="sm"
                className="w-full gap-2 bg-white text-gray-800 hover:bg-gray-200"
              >
                詳細資訊
              </Button>
            </div>
          </div>
        </InfoWindow>
      )}
    </GoogleMap>
  );
};

export default CaseTrackingMap;
