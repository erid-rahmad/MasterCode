import React, {useState} from "react";
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
    const [Products, setProduct] = useState(datas.data);


    async function addProduct() {
        var data = {
            cardTitle: '',
            body: '',
            footer: '',
            images: '',
            type: '',
            typeId: ''
        }
        await fetch(`/api/product/create`, {
            method: "POST", headers: {"Content-Type": "application/json"},
            body: JSON.stringify(data),
        })
            .then((response) => response.json())
            .then((data) => setProduct([...Products, data]));

    }

    function deleteProduct(product_) {

        const copy = [...Products];
        copy.splice(product_.id, 1)
        console.log(copy)
        setProduct(copy);

    }

    async function updateProduct(UpdateProduct_) {
        // const updatedProduct = Products.map((product) => {
        //     if (product.id == UpdateProduct_.id) {
        //         return {
        //             ...product,
        //             cardTitle: UpdateProduct_.cardTitle,
        //             body: UpdateProduct_.body,
        //             footer: UpdateProduct_.footer,
        //             images: UpdateProduct_.images,
        //             typeId: UpdateProduct_.typeId
        //         };
        //     }
        //     return Products;
        // });
        // setProduct(updatedProduct);

        const body = UpdateProduct_;
        console.log("body", body);
        let res = await fetch(`/api/product/update`, {
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify(body),
        });
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
                                                        onClick={() => addProduct()}>
                                                </Button>
                                            </TableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {Products.map((row, index) => (
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
                                                                onClick={() => updateProduct(row)}>
                                                        </Button>
                                                        <Button startIcon={<DeleteIcon/>}
                                                                onClick={() => deleteProduct(row)}>
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
    const result = await prisma.Product.findMany();
    let data = result

    ;
    return {
        props: {
            data
        },
    }
}







