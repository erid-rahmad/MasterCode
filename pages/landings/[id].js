import React, {useState} from "react";
// nodejs library that concatenates classes
import classNames from "classnames";
// @material-ui/core components
import {makeStyles} from "@material-ui/core/styles";
// @material-ui/icons
import Camera from "@material-ui/icons/Camera";
import Palette from "@material-ui/icons/Palette";
import Favorite from "@material-ui/icons/Favorite";
// core components
import Header from "/components/Header/Header.js";
import Footer from "/components/Footer/Footer.js";
import Button from "/components/CustomButtons/Button.js";
import GridContainer from "/components/Grid/GridContainer.js";
import GridItem from "/components/Grid/GridItem.js";
import Item from "/components/Grid/GridItem.js";
import HeaderLinks from "/components/Header/HeaderLinks.js";
import NavPills from "/components/NavPills/NavPills.js";
import Parallax from "/components/Parallax/Parallax.js";


import styles from "/styles/jss/nextjs-material-kit/pages/profilePage.js";
import Grid from "@material-ui/core/Grid";
import InputAdornment from "@material-ui/core/InputAdornment";
import People from "@material-ui/icons/People";
import Email from "@material-ui/icons/Email";
import Icon from "@material-ui/core/Icon";
import CardBody from "../../components/Card/CardBody";
import CustomInput from "../../components/CustomInput/CustomInput";
import {router} from "next/client";

const useStyles = makeStyles(styles);

export default function ProfilePage() {
    const classes = useStyles();

    const imageClasses = classNames(
        classes.imgRaised,
        classes.imgRoundedCircle,
        classes.imgFluid
    );
    const {id} = router.query;

    const [content, setContent] = useState("tes");
    const data = "data";

    const click = () =>{
        console.log("this data"+data)
    }



    return (
        <div>

            <Header
                color="transparent"
                brand="NextJS Material Kit"
                rightLinks={<HeaderLinks/>}
                fixed
                changeColorOnScroll={{
                    height: 200,
                    color: "white"
                }}

            />
            <Parallax small filter image="/img/profile-bg.jpg"/>
            <div className={classNames(classes.main, classes.mainRaised)}>
                <div>
                    <div className={classes.container}>
                        <GridContainer justify="center">
                            <GridItem xs={12} sm={12} md={6}>
                                <div className={classes.profile}>
                                    <div>
                                        <img
                                            src="/img/faces/christian.jpg"
                                            alt="..."
                                            className={imageClasses}
                                        />
                                    </div>
                                    <div className={classes.name}>
                                        <h3 className={classes.title}>NAMED</h3>
                                        <h6>CLASIFIKASI {id}</h6>

                                    </div>
                                </div>
                            </GridItem>
                        </GridContainer>

                        <GridContainer justify="center">

                            <Grid container spacing={2}>
                                <Grid item xs={8}>
                                    <Item>
                                        <p>
                                            An artist of considerable range, Chet Faker — the name taken by
                                            Melbourne-raised, Brooklyn-based Nick Murphy — writes, performs
                                            and records all of his own music, giving it a warm, intimate
                                            feel with a solid groove structure
                                        </p>
                                        <p>
                                            An artist of considerable range, Chet Faker — the name taken by
                                            Melbourne-raised, Brooklyn-based Nick Murphy — writes, performs
                                            and records all of his own music, giving it a warm, intimate
                                            feel with a solid groove structure

                                        </p>
                                    </Item>
                                </Grid>
                                <Grid item xs={4}>
                                    <form className={classes.form}>
                                        <CardBody>
                                            <CustomInput
                                                labelText=" Name..."
                                                id="name"
                                                onChange={(e) => setContent(e.target.value)}
                                                value={data}

                                                formControlProps={{
                                                    fullWidth: true
                                                }}
                                                inputProps={{
                                                    type: "text",


                                                    endAdornment: (
                                                        <InputAdornment position="end">
                                                            <People className={classes.inputIconsColor}/>
                                                        </InputAdornment>
                                                    )
                                                }}
                                            />
                                            <CustomInput
                                                labelText="Email..."
                                                id="email"

                                                formControlProps={{
                                                    fullWidth: true
                                                }}
                                                inputProps={{
                                                    type: "email",
                                                    endAdornment: (
                                                        <InputAdornment position="end">
                                                            <Email className={classes.inputIconsColor}/>
                                                        </InputAdornment>
                                                    )
                                                }}
                                            />
                                            <CustomInput
                                                labelText="Hand-pone..."
                                                id="hp"
                                                formControlProps={{
                                                    fullWidth: true
                                                }}
                                                inputProps={{
                                                    type: "text",
                                                    endAdornment: (
                                                        <InputAdornment position="end">
                                                            <People className={classes.inputIconsColor}/>
                                                        </InputAdornment>
                                                    )
                                                }}
                                            />
                                            <CustomInput
                                                labelText="Instance..."
                                                id="instance"
                                                formControlProps={{
                                                    fullWidth: true
                                                }}
                                                inputProps={{
                                                    type: "text",
                                                    endAdornment: (
                                                        <InputAdornment position="end">
                                                            <People className={classes.inputIconsColor}/>
                                                        </InputAdornment>
                                                    )
                                                }}
                                            />
                                            <Button color="primary"  onClick={click()} >View</Button>
                                        </CardBody>
                                    </form>
                                </Grid>
                            </Grid>
                        </GridContainer>
                    </div>
                </div>
            </div>
            <Footer/>
        </div>
    );
}


