import React from "react";
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
import ProductSection2 from "/pages-sections/LandingPage-Sections/ProductSection2.js";
import ProductSection3 from "/pages-sections/LandingPage-Sections/ProductSection3.js";
import TeamSection from "/pages-sections/LandingPage-Sections/TeamSection.js";
import SectionPills from "../../pages-sections/LandingPage-Sections/SectionPills";
import Carousel from "react-slick";
import LocationOn from "@material-ui/icons/LocationOn";
import {Card} from "@mui/material";
import CardBody from "../../components/Card/CardBody";
import CardFooter from "../../components/Card/CardFooter";
import Grid from "@material-ui/core/Grid";
import Item from "@material-ui/core/";
import Small from "../../components/Typography/Small";

const dashboardRoutes = [];
const useStyles = makeStyles(styles);
export default function LandingPage({data}) {

    const classes = useStyles();
    const imageClasses = classNames(classes.imgRaised, classes.imgRoundedCircle, classes.imgFluid);
    const settings = {
        dots: true, infinite: true, speed: 500, slidesToShow: 1, slidesToScroll: 1, autoplay: true
    };
    return (<div>
        <Header
            color="transparent"
            routes={dashboardRoutes}
            brand="MASTER CODE"
            rightLinks={<HeaderLinks/>}
            fixed
            changeColorOnScroll={{
                height: 400, color: "white"
            }}

        />
        <Parallax filter responsive image="/img/bg1.jpeg">
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
               <ProductSection2/>
                <Grid container spacing={2}>

                    <Grid item xs={8}>
                        <Card carousel className={classes.cardbackgroud}>
                            <Carousel {...settings}>
                                {data.review.map(data => (
                                    <div  >
                                    <div align="center" className={classes.card}  >
                                        <CardBody><h4 className={classes.cardTitle}>" {data.comment} "</h4></CardBody>
                                        <CardFooter className={classes.justifyCenter}><h3>~ {data.name}</h3></CardFooter>
                                    </div>
                                </div>))}
                            </Carousel>
                        </Card>

                    </Grid>
                    <Grid align="center
                    " item xs={4}>
                        <ProductSection3  prop={data.review}/>
                    </Grid>

                    <TeamSection />


                </Grid>
            </div>
        </div>
        <Footer/>
    </div>);
}

export async function getServerSideProps() {
    let cards
    let review

    await fetch('http://localhost:3000/api/product/find')
        .then(res => res.json())
        .then(data => {
            cards = data
        })
        .catch(error => {
            console.log(error)
        })

    await fetch('http://localhost:3000/api/review/find')
        .then(res => res.json())
        .then(data => {
            review = data
        })
        .catch(error => {
            console.log(error)
        })

    let data = {
        "cardTitle": cards, "review": review
    };
    return {
        props: {
            data
        },
    }
}





