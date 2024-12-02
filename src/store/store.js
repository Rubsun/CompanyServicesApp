import { configureStore } from '@reduxjs/toolkit'
import servicesReducer from '../../src/pages/service-page/ServiceSlice'
import newsReducer from '../../src/pages/main-page/NewsSlice'

export default configureStore({
  reducer: {
    services: servicesReducer,
    news: newsReducer,
  }
})