import React from "react";
import classNames from "classnames";
import {makeStyles} from "@material-ui/core/styles";
import Header from "/components/Header/Header.js";
import Footer from "/components/Footer/Footer.js";
import Button from "/components/CustomButtons/Button.js";
import GridContainer from "/components/Grid/GridContainer.js";
import GridItem from "/components/Grid/GridItem.js";
import Item from "/components/Grid/GridItem.js";
import HeaderLinks from "/components/Header/HeaderLinks.js";
import Parallax from "/components/Parallax/Parallax.js";
import {useForm} from 'react-hook-form'
import styles from "/styles/jss/nextjs-material-kit/pages/profilePage.js";
import Grid from "@material-ui/core/Grid";
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import prisma from "../../lib/prisma";
import {useRouter} from "next/router";
const useStyles = makeStyles(styles);

export default function ProfilePage(prop) {
    const router = useRouter();
    const classes = useStyles();
    const imageClasses = classNames(classes.imgRaised, classes.imgRoundedCircle, classes.imgFluid);
    const {register, handleSubmit, control} = useForm();

    async function onformSubmit(data) {
        try {
            const body = {
                name: data.name,
                email: data.email,
                instance: data.instance,
                phone: data.phone
            };
            console.log("this body", body)
            console.log("this body sad", JSON.stringify(body))
            await fetch(`/api/post/registerProduct`, {
                method: "POST", headers: {"Content-Type": "application/json"}, body: JSON.stringify(data),
            });
            await router.push("/");
        } catch (error) {
            console.error(error);
        }
    }

    return (<div>

        <Header
            color="transparent"
            brand="NextJS Material Kit"
            rightLinks={<HeaderLinks/>}
            fixed
            changeColorOnScroll={{
                height: 200, color: "white"
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
                                    <h3 className={classes.title}>{prop.result.cardTitle}</h3>
                                    <h6></h6>

                                </div>
                            </div>
                        </GridItem>
                    </GridContainer>

                    <GridContainer justify="center">

                        <Grid container spacing={2}>
                            <Grid item xs={8}>
                                <Item>
                                    <p>
                                        {prop.result.body}

                                    </p>
                                </Item>
                            </Grid>
                            <Grid item xs={4}>

                                <Box onSubmit={handleSubmit(onformSubmit)}
                                     component="form"
                                     sx={{
                                         '& > :not(style)': {m: 1, width: '25ch'},
                                     }}
                                     noValidate
                                     autoComplete="off"

                                >
                                    <TextField
                                        id="standard-multiline-flexible"
                                        label="Name"
                                        multiline
                                        color="secondary"
                                        maxRows={7}
                                        variant="standard"
                                        size="small"
                                        {...register('name')}
                                    />
                                    <TextField
                                        id="standard-multiline-flexible"
                                        label="Email"
                                        multiline
                                        color="secondary"
                                        maxRows={7}
                                        variant="standard"
                                        size="small"
                                        {...register('email')}
                                    />
                                    <TextField
                                        id="standard-multiline-flexible"
                                        label="Instance"
                                        multiline
                                        color="secondary"
                                        maxRows={7}
                                        variant="standard"
                                        size="small"
                                        {...register('instance')}
                                    />
                                    <TextField
                                        id="standard-multiline-flexible"
                                        label="Phone"
                                        multiline
                                        color="secondary"
                                        maxRows={7}
                                        variant="standard"
                                        size="small"
                                        {...register('phone')}
                                    />

                                    <Button color="primary" type="submit">View</Button>
                                </Box>

                            </Grid>
                        </Grid>
                    </GridContainer>
                </div>
            </div>
        </div>
        <Footer/>
    </div>);
}


export async function getServerSideProps(context) {

    const {id} = context.query;
    var req = {
        id: id
    }

    const result = await prisma.Product.findUnique({
        where: {
            id: id,
        },
    });

    return {
        props: {
            result
        },
    }
}




