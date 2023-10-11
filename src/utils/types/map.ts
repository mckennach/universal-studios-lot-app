export interface LocationProps {
  id: string | number;
  page_id: string | number;
  title: string;
  lat_lon: string[];
  lat: string;
  lon: string;
  num: string;
}

export interface Coordinates {
    latitude: number;
    longitude: number;
}

export interface Region extends Coordinates {
    latitudeDelta: number;
    longitudeDelta: number;
}


export interface UserLocationProps {
  coords: {
    speed: number;
    latitude: number;
    longitude: number;
    accuracy: number;
    heading: number;
    altitude: number;
    altitudeAccuracy: number;
  },
  timestamp: number;
}