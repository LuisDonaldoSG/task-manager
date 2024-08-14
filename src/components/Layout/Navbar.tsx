import styles from '@styles/Layout/Navbar.module.scss';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { useMemo } from 'react';
import { paginatedPaths } from '@utils/paginatedPaths';
import { usePathname } from 'next/navigation';
import { IconButton } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import { useAppDispatch } from '@redux/hooks';
import { setOpenSideBarInMobile } from '@reducers/layout.reducer';

export default function Navbar() {
    
    const pathname = usePathname();
    const dispatch = useAppDispatch()
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
            <div className={styles['button-hamburger-container']}>
                <IconButton onClick={() => dispatch(setOpenSideBarInMobile(true))}>
                    <MenuIcon />
                </IconButton>
            </div>
            <span className={styles['title-page']}>{titlePage}</span>
            <AccountCircleIcon className={styles['user-icon']} />
        </nav>
    );
}