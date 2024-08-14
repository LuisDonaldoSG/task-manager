import { LayoutI } from "@interfaces/props";
import styles from '@styles/Layout/Layout.module.scss';
import { Inter } from "next/font/google";
import Navbar from "@components/Layout/Navbar";
import Sidebar from "./Sidebar";

const inter = Inter({ subsets: ["latin"] });

export default function Layout({ children }: LayoutI) {
    return (
        <div className={`${inter.className} ${styles.layout}`}>
            <Navbar />
            <Sidebar />
            <main className={styles.main}>
                {children}
            </main>
        </div>
    );
}