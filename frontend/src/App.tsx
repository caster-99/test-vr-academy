import { RouterProvider } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from './store';

// project imports
import router from './routes';
import NavigationScroll from './layout/NavigationScroll';
import ThemeCustomization from './themes';

// ==============================|| APP ||============================== //

export default function App() {
    return (
        <Provider store={store}>
            <ThemeCustomization>
                <NavigationScroll>
                    <RouterProvider router={router} />
                </NavigationScroll>
            </ThemeCustomization>
        </Provider>
    );
}