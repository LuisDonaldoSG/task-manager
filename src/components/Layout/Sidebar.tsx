import styles from '@styles/Layout/Sidebar.module.scss';
import { paginatedPaths } from '@utils/paginatedPaths';
import LinkItem from '@components/Layout/LinkItem';
import { useAppDispatch, useAppSelector } from '@redux/hooks';
import { IconButton } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { setOpenSideBarInMobile } from '@reducers/layout.reducer';

export default function Sidebar() {

    const openInMobile = useAppSelector(state => state.layoutReducer.openSideBarInMobile)
    const dispatch = useAppDispatch()

    return (
        <aside className={styles.sidebar} data-open-in-mobile={openInMobile}>
            <span className={styles.title}>Task Manager</span>
            <div className={styles['links-container']}>
                {
                    Object.keys(paginatedPaths).map((link, index) => (
                        <LinkItem 
                            key={index}
                            dataLink={paginatedPaths[link]}
                            nameForSubPath={link}
                        />
                    ))
                }
            </div>
            <div className={styles['close-modal-in-mobile-button']}>
                <IconButton 
                    onClick={() => dispatch(setOpenSideBarInMobile(false))}
                >
                    <CloseIcon className={styles['close-icon']} />
                </IconButton>
            </div>
        </aside>
    );
}