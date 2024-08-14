import { LayoutI } from "@interfaces/props";
import styles from '@styles/Layout/Layout.module.scss';
import { Inter } from "next/font/google";
import Navbar from "@components/Layout/Navbar";
import Sidebar from "./Sidebar";
import { useAppSelector } from "@redux/hooks";

const inter = Inter({ subsets: ["latin"] });

export default function Layout({ children }: LayoutI) {

    const openSidebarInMobile = useAppSelector(state => state.layoutReducer.openSideBarInMobile)

    return (
        <div className={`${inter.className} ${styles.layout}`} data-sidebar-open-in-mobile={openSidebarInMobile}>
            <Navbar />
            <Sidebar />
            <main className={styles.main}>
                {children}
            </main>
        </div>
    );
}