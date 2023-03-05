import React, {useState} from "react";
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
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import Email from "@material-ui/icons/Email";
import CustomDropdown from "../../components/CustomDropdown/CustomDropdown";
import SectionNavbarsAdmin from "../../pages-sections/Components-Sections/SectionNavbarsAdmin";


const useStyles = makeStyles(styles);
import {styled, useTheme} from '@mui/material/styles';
import Box from '@mui/material/Box';
import MuiDrawer from '@mui/material/Drawer';
import MuiAppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';

import CssBaseline from '@mui/material/CssBaseline';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';

import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import MailIcon from '@mui/icons-material/Mail';
import {drawerWidth} from "../../styles/jss/nextjs-material-kit";
import Tiptap from"../../components/tiptap/tiptap.js"
import prisma from "../../lib/prisma";
import {
    Container, FormHelperText, Modal, NativeSelect,

    Select,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow
} from "@mui/material";
import Paper from "@material-ui/core/Paper";
import AddIcon from "@material-ui/icons/Add";
import Input from "@material-ui/core/Input";
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";

import InputLabel from "@material-ui/core/InputLabel";
import FormControl from "@material-ui/core/FormControl";
import MenuItem from '@mui/material/MenuItem';
import Grid from "@material-ui/core/Grid";


const openedMixin = (theme) => ({
    width: drawerWidth,
    transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen,
    }),
    overflowX: 'hidden',
});

const closedMixin = (theme) => ({
    transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
    }),
    overflowX: 'hidden',
    width: `calc(${theme.spacing(7)} + 1px)`,
    [theme.breakpoints.up('sm')]: {
        width: `calc(${theme.spacing(8)} + 1px)`,
    },
});

const DrawerHeader = styled('div')(({theme}) => ({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
}));

const AppBar = styled(MuiAppBar, {
    shouldForwardProp: (prop) => prop !== 'open',
})(({theme, open}) => ({
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(['width', 'margin'], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
    }),
    ...(open && {
        marginLeft: drawerWidth,
        width: `calc(100% - ${drawerWidth}px)`,
        transition: theme.transitions.create(['width', 'margin'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
        }),
    }),
}));

const Drawer = styled(MuiDrawer, {shouldForwardProp: (prop) => prop !== 'open'})(
    ({theme, open}) => ({
        width: drawerWidth,
        flexShrink: 0,
        whiteSpace: 'nowrap',
        boxSizing: 'border-box',
        ...(open && {
            ...openedMixin(theme),
            '& .MuiDrawer-paper': openedMixin(theme),
        }),
        ...(!open && {
            ...closedMixin(theme),
            '& .MuiDrawer-paper': closedMixin(theme),
        }),
    }),
);


export default function LandingPage(prop) {
    const theme = useTheme();

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
    const [open, setOpen] = useState(false);

    const handleDrawerOpen = () => {
        console.log("this open drawer", open)
        open == true ? setOpen(false) : setOpen(true);
    };

    const [Products, setProduct] = useState(prop.data);

    const [modal, setModal] = React.useState(false);
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
        let res = await fetch(`/api/product/update`, {
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify(body),
        });
    }




    const classes = useStyles();
    return (
        <Box sx={{display: 'flex'}}>
            <Drawer variant="permanent" open={open}>
                <DrawerHeader>
                    <IconButton onClick={handleDrawerOpen}>{open == false ? <ChevronRightIcon/> : <ChevronLeftIcon/>}
                    </IconButton>
                </DrawerHeader>
                <Divider/>
                <List>
                    <ListItem disablePadding sx={{display: 'block'}}>
                        <ListItemButton
                            sx={{
                                minHeight: 48,
                                justifyContent: open ? 'initial' : 'center',
                                px: 2.5,
                            }}
                        >
                            <ListItemIcon
                                sx={{
                                    minWidth: 0,
                                    mr: open ? 3 : 'auto',
                                    justifyContent: 'center',
                                }}
                            >
                                <MenuIcon/>
                            </ListItemIcon>
                            <ListItemText primary="Config" sx={{opacity: open ? 1 : 0}}/>
                        </ListItemButton>
                    </ListItem>
                </List>
                <Divider/>
                <List>
                    {['All mail', 'Trash', 'Spam'].map((text, index) => (
                        <ListItem key={text} disablePadding sx={{display: 'block'}}>
                            <ListItemButton
                                sx={{
                                    minHeight: 48,
                                    justifyContent: open ? 'initial' : 'center',
                                    px: 2.5,
                                }}
                            >
                                <ListItemIcon
                                    sx={{
                                        minWidth: 0,
                                        mr: open ? 3 : 'auto',
                                        justifyContent: 'center',
                                    }}
                                >
                                    {index % 2 === 0 ? <InboxIcon/> : <MailIcon/>}
                                </ListItemIcon>
                                <ListItemText primary={text} sx={{opacity: open ? 1 : 0}}/>
                            </ListItemButton>
                        </ListItem>
                    ))}
                </List>
            </Drawer>
            <Box  component={Paper} fixed  >

                <SectionNavbarsAdmin/>

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
                                    <TableCell sx={{minWidth: 300}}>
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


                                        {/*<Input*/}
                                        {/*    defaultValue={row.typeId}*/}
                                        {/*    onChange={(e) => row.typeId = e.target.value}/>*/}
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
                <Button onClick={handleOpen}>Open modal</Button>
                <Modal
                    open={modal}

                    onClose={handleClose}
                    aria-labelledby="modal-modal-title"
                    aria-describedby="modal-modal-description"
                >
                    <Box  sx={style}>

                        <Tiptap/>

                    </Box>
                </Modal>




            </Box>
        </Box>
    );
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

