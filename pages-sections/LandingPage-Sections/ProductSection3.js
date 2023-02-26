import React from "react";

import { makeStyles } from "@material-ui/core/styles";
import InfoArea from "/components/InfoArea/InfoArea.js";
import EventAvailableIcon from '@mui/icons-material/EventAvailable';
import SendIcon from '@mui/icons-material/Send';
import styles from "/styles/jss/nextjs-material-kit/pages/landingPageSections/productStyle.js";
import Button from "../../components/CustomButtons/Button.js";
const useStyles = makeStyles(styles);

export default function ProductSection() {
    const classes = useStyles();
    return (
        <div>


                        <InfoArea
                            title="Daftar Sekarang"
                            description="Divide details about  Write a few lines about each one. A paragraph describing a feature will be enough."
                            icon={EventAvailableIcon}
                            iconColor="info"
                            vertical
                        >

                        </InfoArea>
            <Button variant="contained" color="success" endIcon={<SendIcon />} >
                Daftar
            </Button>
        </div>

    );
}
