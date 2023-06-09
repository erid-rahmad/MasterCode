import React from "react";
import {makeStyles} from "@material-ui/core/styles";
import Schedule from "@material-ui/icons/Schedule";
import List from "@material-ui/icons/List";
import Grid from '@material-ui/core/Grid';
import GridItem from "/components/Grid/GridItem.js";
import NavPills from "/components/NavPills/NavPills.js";
import Card from "./../../components/Card/Card.js";
import CardBody from "./../../components/Card/CardBody.js";
import Button from "./../../components/CustomButtons/Button.js";
import styles from "/styles/jss/nextjs-material-kit/pages/componentsSections/pillsStyle.js";
import {useRouter} from "next/router";
const useStyles = makeStyles(styles);

export default function ninjas({datas}) {

    const classes = useStyles();
    const router = useRouter()
    return (
        <div id="navigation-pills">

            <GridItem>
                <NavPills
                    color="primary"
                    tabs={[{
                        tabButton: "All", tabIcon: List, tabContent: (
                            <span>
                                        <Grid container spacing={3}>
                                            {datas.map(event => (
                                                <Grid item xs={3}>
                                                    <Card style={{width: "15rem"}}>
                                                        <img
                                                            style={{height: "180px", width: "100%", display: "block"}}
                                                            className={classes.imgCardTop}
                                                            src={event.images}
                                                            alt="Card-img-cap"
                                                        />
                                                        <CardBody>
                                                            <h4 className={classes.cardTitle}>{event.cardTitle}</h4>
                                                            <p>{event.footer}</p>
                                                            <Button color="primary" onClick={() => {
                                                                router.push({
                                                                    pathname: `/home/details`, query: {id: event.id}

                                                                })
                                                            }
                                                            }>View</Button>
                                                        </CardBody>
                                                    </Card>
                                                </Grid>
                                            ))}
                                          </Grid>
                                      </span>
                        )
                    }, {
                        tabButton: "Java", tabIcon: Schedule, tabContent: (<div/>)
                    }, {
                        tabButton: "React", tabIcon: List, tabContent: (<div/>)
                    }]}
                />
            </GridItem>
        </div>);
}







