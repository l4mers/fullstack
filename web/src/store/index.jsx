import { configureStore, combineReducers } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import headerImageSlice from "./modules/headerImageSlice";
import displayedHomepageViewSlice from "./modules/displayedHomepageViewSlice";
import displayedVenueStageSlice from "./modules/displayedVenueStageSlice";
import displayedDashboardViewSlice from "./modules/displayedDashboardViewSlice";
import carouselIndexSlice from "./modules/carouselIndexSlice";
import authenticationSlice from "./modules/authenticationSlice";
import loaderSlice from "./modules/loaderSlice";
import userMenuInfoSlice from "./modules/userMenuInfoSlice";
import notificationSlice from "./modules/notificationSlice";
import venuesSlice from "./modules/venuesSlice";

const reducer = combineReducers({
  headerImage: headerImageSlice,
  displayedHomepageView: displayedHomepageViewSlice,
  displayedVenueStage: displayedVenueStageSlice,
  displayedDashboardView: displayedDashboardViewSlice,
  carouselIndex: carouselIndexSlice,
  authentication: authenticationSlice,
  loader: loaderSlice,
  userMenuInfo: userMenuInfoSlice,
  notification: notificationSlice,
  venues: venuesSlice,
});

const persistConfig = {
  key: "root",
  storage,
  whitelist: ["displayedVenueStage", "authentication", "venues"], // Only persist displayedVenueStage slice
};

const persistedReducer = persistReducer(persistConfig, reducer);

const index = configureStore({
  reducer: persistedReducer,
});

export const persistor = persistStore(index);
export default index;
