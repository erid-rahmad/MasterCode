import React from "react";
// nodejs library that concatenates classes
import classNames from "classnames";
// @material-ui/core components
import {makeStyles} from "@material-ui/core/styles";

import Camera from "@material-ui/icons/Camera";
import Palette from "@material-ui/icons/Palette";
import Favorite from "@material-ui/icons/Favorite";

import Header from "/components/Header/Header.js";
import Footer from "/components/Footer/Footer.js";
// import Button from "/components/CustomButtons/Button.js";
import GridContainer from "/components/Grid/GridContainer.js";
import GridItem from "/components/Grid/GridItem.js";
import HeaderLinks from "/components/Header/HeaderLinks.js";
import NavPills from "/components/NavPills/NavPills.js";
import Parallax from "/components/Parallax/Parallax.js";

import styles from "/styles/jss/nextjs-material-kit/pages/profilePage.js";
import Grid from "@material-ui/core/Grid";
import Box from "@mui/material/Box";
import Button from '@mui/material/Button';

import TextField from '@mui/material/TextField';
import productStyle from "../../styles/jss/nextjs-material-kit/pages/landingPageSections/productStyle";
import prisma from "../../lib/prisma";
import {Table, TableBody, TableCell, TableContainer, TableHead, TableRow} from "@mui/material";
import SendIcon from '@mui/icons-material/Send';
import Paper from "@material-ui/core/Paper";
import {useFieldArray, useForm} from "react-hook-form";
import Input from "@material-ui/core/Input";
import DeleteIcon from "@material-ui/icons/Delete";
import EditIcon from "@material-ui/icons/Edit";
import AddIcon from "@material-ui/icons/Add";

const useStyles = makeStyles(styles);




const updateData = (data) => {
    console.log("data update" + JSON.stringify(data))
}

export default function ProfilePage(datas) {
    const classes = useStyles();
    // console.log(datas)



    const product = Array.from(datas.data);

    function refreshData() {

    }

    const AddData = (data) => {
        console.log("data ADD"+JSON.stringify(data))
        product.push(
            {
                'cardTitle': '',
                'id': null,
                'body': '',
                'footer': '',
                'images': '',
                'typeId': '',
            }
        )
        document.getElementById("table1").contentWindow.location.reload(true);
    }
    const {control, register} = useForm();
    const {fields, append, prepend, remove, swap, move, insert} = useFieldArray({
        control, // control props comes from useForm (optional: if you are using FormContext)
        name: "test", // unique name for your Field Array
    });

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
            <NavPills
                alignCenter
                color="primary"
                horizontal={{
                    tabsGrid: {xs: 2, sm: 4, md: 2}, contentGrid: {xs: 4, sm: 8, md: 8}
                }}
                tabs={[{
                    tabButton: "Product", tabIcon: Camera, tabContent: (
                        <GridContainer>
                            <TableContainer component={Paper}>
                                <Table sx={{minWidth: 650}} aria-label="simple table" id="table1">
                                    <TableHead>
                                        <TableRow>
                                            <TableCell align="center">Title</TableCell>
                                            <TableCell align="center">Body</TableCell>
                                            <TableCell align="center">Footer</TableCell>
                                            <TableCell align="center">Images</TableCell>
                                            <TableCell align="center">TypeId</TableCell>
                                            <TableCell align="center">
                                                <Button startIcon={<AddIcon/>}
                                                        onClick={() => AddData({product})}>
                                                </Button>
                                            </TableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {product.map((row, index) => (
                                            <TableRow
                                                key={row.id}
                                                sx={{'&:last-child td, &:last-child th': {border: 0}}}>

                                                <TableCell>
                                                    <Input
                                                        defaultValue={row.cardTitle}
                                                        onChange={(e) => row.cardTitle = e.target.value}/>
                                                </TableCell>
                                                <TableCell>
                                                    <Input
                                                        defaultValue={row.body}
                                                        onChange={(e) => row.body = e.target.value}/>
                                                </TableCell>
                                                <TableCell>
                                                    <Input
                                                        defaultValue={row.footer}
                                                        onChange={(e) => row.footer = e.target.value}/>
                                                </TableCell>
                                                <TableCell>
                                                    <Input
                                                        defaultValue={row.images}
                                                        onChange={(e) => row.images = e.target.value}/>
                                                </TableCell>
                                                <TableCell>
                                                    <Input
                                                        defaultValue={row.typeId}
                                                        onChange={(e) => row.typeId = e.target.value}/>
                                                </TableCell>
                                                <TableCell align="center">
                                                    <div>
                                                        <Button color="primary"
                                                                startIcon={<EditIcon/>}
                                                                onClick={() => updateData(row)}>
                                                        </Button>
                                                        <Button startIcon={<DeleteIcon/>}
                                                                onClick={() => updateData(row)}>
                                                        </Button>
                                                    </div>
                                                </TableCell>



                                            </TableRow>)
                                        )}
                                    </TableBody>
                                </Table>
                            </TableContainer>


                        </GridContainer>


                    )
                },
                    {
                        tabButton: "Work",
                        tabIcon: Palette,
                        tabContent: (<a></a>

                        )
                    },
                    {
                        tabButton: "Favorite",
                        tabIcon: Favorite,
                        tabContent: (
                            <div>
                                {fields.map((field, index) => (
                                    <input
                                        key={field.id} // important to include key with field's id
                                        {...register(`test.${index}.value`)}
                                    />
                                ))}
                                <div>
                                    <button onClick={() => append()}></button>
                                </div>
                            </div>

                        )
                    }
                ]}
            />


        </div>
        <Footer/>
    </div>);
}

export async function getServerSideProps() {
    const result = await prisma.category.findMany();
    let data = result

    ;
    return {
        props: {
            data
        },
    }
}




