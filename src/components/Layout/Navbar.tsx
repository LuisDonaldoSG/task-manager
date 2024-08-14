import styles from '@styles/Layout/Navbar.module.scss';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { useMemo } from 'react';
import { paginatedPaths } from '@utils/paginatedPaths';
import { usePathname } from 'next/navigation';

export default function Navbar() {
    
    const pathname = usePathname();
    const titlePage = useMemo(() => {
        for (const key of  Object.keys(paginatedPaths)) {
            const currentPage = paginatedPaths[key].pathData;
            if (Array.isArray(currentPage)) {
                const pageData = currentPage.find(page => page.route === pathname);
                if (pageData) return pageData?.alias;
            } else {
                if (currentPage.route === pathname) return currentPage.alias;
            }
        }
    },[pathname]);

    return (
        <nav className={styles.navbar}>
            <span className={styles['title-page']}>{titlePage}</span>
            <AccountCircleIcon className={styles['user-icon']} />
        </nav>
    );
}