import { configureStore, createReducer } from 'redux-starter-kit';
import { updateStatus } from './actions';

const initialState = { initialized: false };

const userReducer = createReducer(initialState, {
  [updateStatus]: (state, action) => {
    return {
      initialized: true,
      ...action.payload,
    };
  },
});

const store = configureStore({
  reducer: {
    user: userReducer,
  },
});

export default store;
