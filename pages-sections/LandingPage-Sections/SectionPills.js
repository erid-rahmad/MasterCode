import React from "react";
// @material-ui/core components
import {makeStyles} from "@material-ui/core/styles";

// @material-ui/icons
import Dashboard from "@material-ui/icons/Dashboard";
import Schedule from "@material-ui/icons/Schedule";
import List from "@material-ui/icons/List";
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';

// core components
import GridContainer from "/components/Grid/GridContainer.js";
import GridItem from "/components/Grid/GridItem.js";
import NavPills from "/components/NavPills/NavPills.js";
import Card from "./../../components/Card/Card.js";
import CardBody from "./../../components/Card/CardBody.js";
import Button from "./../../components/CustomButtons/Button.js";

import styles from "/styles/jss/nextjs-material-kit/pages/componentsSections/pillsStyle.js";

const useStyles = makeStyles(styles);

const data = [
    {
        "cardTitle": "sering",
        "body": "asdasd",
        "footer": "asdasda"
    },
    {
        "cardTitle": "asdasga",
        "body": "asdasd",
        "footer": "asdasda"
    },
    {
        "cardTitle": "asdasga",
        "body": "asdasd",
        "footer": "asdasda"
    },
    {
        "cardTitle": "asdasga",
        "body": "asdasd",
        "footer": "asdasda"
    },
    {
        "cardTitle": "asdasga",
        "body": "asdasd",
        "footer": "asdasda"
    },
    {
        "cardTitle": "asdasga",
        "body": "asdasd",
        "footer": "asdasda"
    },
    {
        "cardTitle": "asdasga",
        "body": "asdasd",
        "footer": "asdasda"
    }
]


export default function SectionPills() {

    const classes = useStyles();
    return (<div className={classes.section}>
        <div className={classes.container}>
            <div id="navigation-pills">
                <div className={classes.title}>
                    <h3>Navigation Pills</h3>
                </div>
                <div className={classes.title}>

                </div>
                <GridContainer>
                    <GridItem>
                        <NavPills
                            color="primary"
                            tabs={[{
                                tabButton: "Dashboard", tabIcon: Dashboard, tabContent: (

                                            <span>
                                        <Grid container spacing={3}>
                                            {data.map(event => (
                                            <Grid item xs={3}>
                                              <Card style={{width: "15rem"}}>
                                                  <img
                                                      style={{height: "180px", width: "100%", display: "block"}}
                                                      className={classes.imgCardTop}
                                                      src="..."
                                                      alt="Card-img-cap"
                                                  />
                                                  <CardBody>
                                                    <h4 className={classes.cardTitle}>{event.cardTitle}</h4>
                                                    <p>Some quick example text to build on the card title and make up the bulk of the card's content.</p>
                                                    <Button color="primary">Do something</Button>
                                                  </CardBody>
                                                </Card>
                                            </Grid>
                                               ))}
                                          </Grid>
                                      </span>
                                )
                            }, {
                                tabButton: "Schedule", tabIcon: Schedule, tabContent: (<span>
                        <p>
                          Efficiently unleash cross-media information without
                          cross-media value. Quickly maximize timely
                          deliverables for real-time schemas.
                        </p>
                        <br/>
                        <p>
                          Dramatically maintain clicks-and-mortar solutions
                          without functional solutions. Dramatically visualize
                          customer directed convergence without revolutionary
                          ROI. Collaboratively administrate empowered markets
                          via plug-and-play networks. Dynamically procrastinate
                          B2C users after installed base benefits.
                        </p>
                      </span>)
                            }, {
                                tabButton: "Tasks", tabIcon: List, tabContent: (<span>
                        <p>
                          Collaboratively administrate empowered markets via
                          plug-and-play networks. Dynamically procrastinate B2C
                          users after installed base benefits.
                        </p>
                        <br/>
                        <p>
                          Dramatically visualize customer directed convergence
                          without revolutionary ROI. Collaboratively
                          administrate empowered markets via plug-and-play
                          networks. Dynamically procrastinate B2C users after
                          installed base benefits.
                        </p>
                        <br/>
                        <p>
                          Dramatically visualize customer directed convergence
                          without revolutionary ROI. Collaboratively
                          administrate empowered markets via plug-and-play
                          networks. Dynamically procrastinate B2C users after
                          installed base benefits.
                        </p>
                      </span>)
                            }]}
                        />
                    </GridItem>

                </GridContainer>
            </div>
        </div>
    </div>);
}
