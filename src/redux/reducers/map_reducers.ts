import { SET_LOCATION_PERMISSION, SET_USER_DISTANCE, SET_USER_LOCATION, SET_USER_LOCATION_ERROR } from "../actions/map_actions";

const initialState = {
  locationPermission: false,
  userLocation: null,
  userLocationError: null,
  userDistance: 0,
};

const mapReducer = (state = initialState, action: any) => {
  switch (action.type) {
    case SET_LOCATION_PERMISSION:
      return {
        ...state,
        locationPermission: action.payload,
      };
    case SET_USER_LOCATION:
      return {
        ...state,
        userLocation: action.payload,
      };
    case SET_USER_LOCATION_ERROR:
      return {
        ...state,
        userLocationError: action.payload,
      };
    case SET_USER_DISTANCE:
      return {
        ...state,
        userDistance: action.payload,
      };
    default:
      return state;
  }
}

export default mapReducer;