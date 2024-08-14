import styles from '@styles/Layout/Sidebar.module.scss';
import { paginatedPaths } from '@utils/paginatedPaths';
import LinkItem from '@components/Layout/LinkItem';

export default function Sidebar() {
    return (
        <aside className={styles.sidebar}>
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
        </aside>
    );
}