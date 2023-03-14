import React, {useState} from "react";

import Config from "components/config/config"

import prisma from "../../lib/prisma";
import SectionNavbarsAdmin from "../../pages-sections/Components-Sections/SectionNavbarsAdmin";
import {Modal, NativeSelect, Table, TableBody, TableCell, TableContainer, TableHead, TableRow} from "@mui/material";
import AddIcon from "@material-ui/icons/Add";
import Input from "@material-ui/core/Input";
import EditIcon from "@material-ui/icons/Edit";
import FormControl from "@material-ui/core/FormControl";
import DeleteIcon from "@material-ui/icons/Delete";
import Box from "@mui/material/Box";
import Tiptap from "../../components/tiptap/tiptap";
import Footer from "../../components/Footer/Footer";
import Button from "@mui/material/Button";

export default function LandingPage(prop) {

    const [Products, setProduct] = useState(prop.data);
    const [open, setOpen] = useState(false);
    const [content, setContent] = useState({
        body: "",
        cardTitle: "",
        footer: "",
        id: "",
        images: "",
        type: "",
        typeId: ""
    });
    const [modal, setModal] = React.useState(false);

    const style = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 900,

        bgcolor: 'background.paper',
        border: '2px solid #000',
        boxShadow: 24,
        pt: 2,
        px: 4,
        pb: 3,
    };

    const handleDrawerOpen = () => {
        console.log("this open drawer", open)
        open == true ? setOpen(false) : setOpen(true);
    };

    async function saveBody(data) {
        console.log("datasss", data)
        console.log("1", content)
        await setContent({...content, body: data}
        )


        await console.log("2", content)
        await updateProduct(content)
    }

    const handleOpen = () => {
        setModal(true);
    };
    const handleClose = () => {
        setModal(false);
    };

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
        const body = UpdateProduct_;
        console.log("body", body);
        await fetch(`/api/product/update`, {
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify(body),
        })
            .then((response) => response.json())
            .then((data) => console.log("this data ", data));
    }

    return (<Config html={
            <div>
                <SectionNavbarsAdmin></SectionNavbarsAdmin>
                <TableContainer>
                    <Table sx={{minWidth: 100}} aria-label="simple table" id="table1">
                        <TableHead>
                            <TableRow>
                                <TableCell align="center">Title</TableCell>
                                <TableCell align="center">Body</TableCell>
                                <TableCell align="center">Footer</TableCell>
                                <TableCell align="center">Images</TableCell>
                                <TableCell align="center">TypeId</TableCell>
                                <TableCell align="center">
                                    <Button color="warning" startIcon={<AddIcon/>}
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
                                        <Button color="primary" startIcon={<EditIcon/>} onClick={() => {
                                            setModal(true);
                                            setContent(row)
                                        }}></Button>
                                        {/*<Input*/}
                                        {/*    defaultValue={row.body}*/}
                                        {/*    onChange={(e) => row.body = e.target.value}/>*/}
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
                                    <TableCell width="90px">
                                        <FormControl fullWidth>
                                            <NativeSelect
                                                defaultValue={row.typeId}
                                                onChange={(e) => row.typeId = e.target.value}
                                            >
                                                <option value="{10}">Ten</option>
                                                <option value="{20}">Twenty</option>
                                                <option value="{30}">Thirty</option>
                                            </NativeSelect>
                                        </FormControl>
                                    </TableCell>
                                    <TableCell align="center">
                                        <div>
                                            <Button color="primary"
                                                    startIcon={<EditIcon/>}
                                                    onClick={() => updateProduct(row)}>
                                            </Button>
                                            <Button color="warning" startIcon={<DeleteIcon/>}
                                                    onClick={() => deleteProduct(row)}>
                                            </Button>
                                        </div>
                                    </TableCell>
                                </TableRow>)
                            )}
                        </TableBody>
                    </Table>
                </TableContainer>
                <Modal
                    open={modal}
                    onClose={handleClose}
                    aria-labelledby="modal-modal-title"
                    aria-describedby="modal-modal-description"
                >
                    <Box sx={style}>
                        <Tiptap content={content.body} saveBody={(data) => saveBody(data)}/>
                    </Box>
                </Modal>
                <Footer/>
            </div>
        }>
        </Config>
    )
}


export async function getServerSideProps() {
    const result = await prisma.Product.findMany();
    let data = result
    return {
        props: {
            data
        },
    }
}
