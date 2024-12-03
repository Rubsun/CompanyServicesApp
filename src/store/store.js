import {configureStore} from '@reduxjs/toolkit'
import servicesReducer from '../../src/pages/service-page/ServiceSlice'
import newsReducer from '../../src/pages/main-page/NewsSlice'
import userReducer from '../../src/pages/profile-page/ProfileSlice'
export default configureStore({
    reducer: {
        services: servicesReducer,
        news: newsReducer,
        user: userReducer,
    }
})