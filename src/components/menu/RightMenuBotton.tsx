import React, { useState } from "react";
import MenuIcon from "@mui/icons-material/Menu";
import RightMenu from "./RightMenu";

const RightMenuButton = () => {
    const [panelAnchor, setPanelAnchor] = useState<null | HTMLElement>(null);

    const handleClick = (event: any) => {
        panelAnchor ? setPanelAnchor(null) : setPanelAnchor(event.currentTarget);
    }


    return (
        <div>
            <MenuIcon onClick={handleClick} color="action" />
            <RightMenu panelAnchor={panelAnchor} onClickAway={handleClick} />
        </div>
    )
}

export default RightMenuButton;