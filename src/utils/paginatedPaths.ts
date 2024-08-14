import { PathsElementsI } from "@interfaces/paths";
import { CRATE_TASK_PATH, HOME_PATH } from "@utils/paths";
import HomeIcon from '@mui/icons-material/Home';
import PlaylistAddIcon from '@mui/icons-material/PlaylistAdd';

export const paginatedPaths: Record<string, PathsElementsI> = {
    [HOME_PATH]: {
        icon: HomeIcon,
        pathData: {
            alias: 'Home',
            route: HOME_PATH
        }
    },
    [CRATE_TASK_PATH]: {
        icon: PlaylistAddIcon,
        pathData: {
            alias: 'Create task',
            route: CRATE_TASK_PATH
        }
    }
};