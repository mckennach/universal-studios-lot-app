export const SET_LOCATION_PERMISSION = 'SET_LOCATION_PERMISSION';
export const SET_USER_LOCATION = 'SET_USER_LOCATION';
export const SET_USER_LOCATION_ERROR = 'SET_USER_LOCATION_ERROR';
export const SET_USER_DISTANCE = 'SET_USER_DISTANCE';

export const setLocationPermission = (permission: boolean) => ({
  type: SET_LOCATION_PERMISSION,
  payload: permission,
});

export const setUserLocation = (location: Location) => ({
  type: SET_USER_LOCATION,
  payload: location,
});

export const setUserLocationError = (error: string) => ({
    type: SET_USER_LOCATION_ERROR,
    payload: error,
});

export const setUserDistance = (distance: number) => ({
    type: SET_USER_DISTANCE,
    payload: distance,
});

