import React from "react";
// nodejs library that concatenates classes
import classNames from "classnames";

import {makeStyles} from "@material-ui/core/styles";

import Header from "/components/Header/Header.js";
import Footer from "/components/Footer/Footer.js";
import GridContainer from "/components/Grid/GridContainer.js";
import GridItem from "/components/Grid/GridItem.js";
import Button from "/components/CustomButtons/Button.js";
import HeaderLinks from "/components/Header/HeaderLinks.js";
import Parallax from "/components/Parallax/Parallax.js";
import styles from "/styles/jss/nextjs-material-kit/pages/landingPage.js";
import ProductSection from "/pages-sections/LandingPage-Sections/ProductSection.js";
import TeamSection from "/pages-sections/LandingPage-Sections/TeamSection.js";
import SectionPills from "../../pages-sections/LandingPage-Sections/SectionPills";
const dashboardRoutes = [];
const useStyles = makeStyles(styles);
export default function LandingPage({data}) {


    const classes = useStyles();
    return (
        <div>
            <Header
                color="transparent"
                routes={dashboardRoutes}
                brand="NextJS Material Kit"
                rightLinks={<HeaderLinks/>}
                fixed
                changeColorOnScroll={{
                    height: 400,
                    color: "white"
                }}

            />
            <Parallax filter responsive image="/img/landing-bg.jpg">
                <div className={classes.container}>
                    <GridContainer>
                        <GridItem xs={12} sm={12} md={6}>
                            <h1 className={classes.title}>Your Story Starts With Us.</h1>
                            <h4>
                                Every landing page needs a small description after the big bold
                                title, that{"'"}s why we added this text here. Add here all the
                                information that can make you or your product create the first
                                impression.
                            </h4>
                            <br/>
                            <Button
                                color="danger"
                                size="lg"
                                href="https://www.youtube.com/watch?v=dQw4w9WgXcQ&ref=creativetim"
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                <i className="fas fa-play"/>
                                Watch video
                            </Button>
                        </GridItem>
                    </GridContainer>
                </div>
            </Parallax>
            <div className={classNames(classes.main, classes.mainRaised)}>
                <div className={classes.container}>
                    <ProductSection/>
                    <SectionPills datas={data.cardTitle}/>
                    <TeamSection/>

                    {/*<WorkSection/>*/}

                </div>
            </div>

            <Footer/>
        </div>
    );
}

export async function getServerSideProps() {

    const res = await fetch('http://localhost:3000/api/post/category-get')
    const cards =await res.json()

    let data =
        {
            "cardTitle": cards,
            "body": "asdasd",
            "footer": "asdasda",
            "images": "/img/Images/card-default.jpeg",
            "type": ""
        };




    return {
        props: {
            data
        },
    }
}
