import React from "react";
import { GenderParams } from "../types";
import { Icon } from 'semantic-ui-react';

const GenderIcon = ({ gender }: GenderParams) => {

    if(gender === 'male') {
        return(
            <Icon name="mars" />
        );
    } else if(gender === "female") {
        return(
            <Icon name="venus" />
        );
    }

    return (
        <div>
            {gender}
        </div>
    );
};

export default GenderIcon;