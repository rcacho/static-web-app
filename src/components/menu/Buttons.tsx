import React from "react";
import {ListItemButton, ListItemIcon, ListItemText} from "@mui/material";

const Buttons = (props: any) => {
    const handleClick = (event: any) => {
        props.parentProp.updateState(props.state);
        console.log("pepe")
    }

        return(
        < >
                <ListItemButton onClick={handleClick}>
                    <ListItemIcon>
                        <props.icon/>
                    </ListItemIcon>
                    <ListItemText primary={props.text}/>
                </ListItemButton>
            </>
        )
}

export default Buttons;