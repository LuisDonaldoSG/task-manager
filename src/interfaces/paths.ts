import { SvgIconTypeMap } from "@mui/material";
import { OverridableComponent } from "@mui/material/OverridableComponent";

export interface PathDataI {
    alias: string
    route: string
}

export interface PathsElementsI {
    pathData: PathDataI | PathDataI[]
    icon: OverridableComponent<SvgIconTypeMap<{}, "svg">> & { muiName: string; }
}