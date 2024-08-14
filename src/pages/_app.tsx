import "@styles/globals.css";
import Layout from "@components/Layout/Layout";
import type { AppProps } from "next/app";
import { Provider } from 'react-redux';
import { store } from '@redux/store';
import LocalStorageProvider from "@providers/LocalStorageProvider";

export default function App({ Component, pageProps }: AppProps) {
    return (
        <Provider store={store}>
            <LocalStorageProvider>
                <Layout>
                    <Component
                        {...pageProps} 
                    />
                </Layout>
            </LocalStorageProvider>
        </Provider>
    );
}
