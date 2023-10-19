import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { getAddress } from '../../services/apiGeocoding';

function getPosition() {
  return new Promise(function (resolve, reject) {
    navigator.geolocation.getCurrentPosition(resolve, reject);
  });
}

export const fetchAddress = createAsyncThunk(
  'user/fetchAddress',
  async function () {
    // 1) We get the user's geolocation position
    const positionObj = await getPosition();
    const position = {
      latitude: positionObj.coords.latitude,
      longitude: positionObj.coords.longitude,
    };

    // 2) Then we use a reverse geocoding API to get a description of the user's address, so we can display it the order form, so that the user can correct it if wrong
    const addressObj = await getAddress(position);
    const address = `${addressObj?.locality}, ${addressObj?.city} ${addressObj?.postcode}, ${addressObj?.countryName}`;

    // 3) Then we return an object with the data that we are interested in.
    // Payload of the FULFILLED state
    return { position, address };
  }
);

// Define the initial state of the user slice
const initialState = {
  username: '', // The user's username
  status: 'idle', // The status of the async operation (idle, pending, fulfilled, rejected)
  position: {}, // The user's geolocation position
  address: '', // The user's address
  error: '', // The error message if the async operation fails
};

// Create a new user slice using the createSlice function from Redux Toolkit
const userSlice = createSlice({
  name: 'user', // Set the name of the slice
  initialState, // Set the initial state of the slice
  reducers: {
    // Define the reducers for the slice
    updateName(state, action) {
      // Update the user's username
      state.username = action.payload;
    },
  },
  extraReducers: (builder) =>
    builder
      .addCase(fetchAddress.pending, (state, action) => {
        // Set the status to 'loading' when the fetchAddress thunk is pending
        state.status = 'loading';
      })
      .addCase(fetchAddress.fulfilled, (state, action) => {
        // Set the position and address fields in the state to the payload of the FULFILLED state when the fetchAddress thunk is fulfilled
        state.position = action.payload.position;
        state.address = action.payload.address;
        // Set the status to 'idle' when the fetchAddress thunk is fulfilled
        state.status = 'idle';
      })
      .addCase(fetchAddress.rejected, (state, action) => {
        // Set the status to 'error' and set the error message when the fetchAddress thunk is rejected
        state.status = 'error';
        state.error =
          'There was a problem getting your address. Make sure to fill this field!';
      }),
});

export const { updateName } = userSlice.actions;

export default userSlice.reducer;
