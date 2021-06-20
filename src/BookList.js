import axios from "axios";
import React, {useEffect, useState} from "react";
import {
    AppBar, Button,
    GridList,
    GridListTile,
    GridListTileBar,
    IconButton, InputBase,
    ListSubheader,
    fade, makeStyles, Toolbar, Typography
} from "@material-ui/core";
import StarBorderIcon from '@material-ui/icons/StarBorder';
import {groupBy} from "lodash";
import {
    useLocation
} from "react-router-dom";
import BookModal from "./BookModal";
import {Search} from "@material-ui/icons";
import Rating from '@material-ui/lab/Rating';
import {Alert} from "@material-ui/lab";
import filteredBook from "lodash/collection";

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
        flexDirection: "column",
        gap: 12,
        alignItems: "center",
        backgroundColor: theme.palette.background.paper,
    },
    gridList: {
        width: 1300,
        height: 1000,
    },
    icon: {
        color: 'rgba(255, 255, 255, 0.54)',
    },
    search: {
        position: 'relative',
        borderRadius: theme.shape.borderRadius,
        backgroundColor: fade("#efefefa3", 1),
        '&:hover': {
            backgroundColor: fade("#efefefa3", 0.8),
        },
        marginRight: theme.spacing(2),
        marginLeft: 0,
        width: '100%',
        [theme.breakpoints.up('sm')]: {
            marginLeft: theme.spacing(3),
            width: 'auto',
        },
    },
    searchIcon: {
        padding: theme.spacing(0, 2),
        height: '100%',
        position: 'absolute',
        pointerEvents: 'none',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    inputRoot: {
        color: 'inherit',
    },
    inputInput: {
        padding: theme.spacing(1, 1, 1, 0),
        // vertical padding + font size from searchIcon
        paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
        transition: theme.transitions.create('width'),
        width: '100%',
        [theme.breakpoints.up('md')]: {
            width: '20ch',
        },
    },
}));


function BookList() {
    const [books, setBooks] = useState([]);

    useEffect(() => {
        axios.get("http://localhost:8080/api/v1/book")
            .then(function (response) {
                // handle success
                console.log(response.data);
                setBooks(response.data);
            })
    }, [])

    const classes = useStyles();

    const booksByGenre = groupBy(books, "genre");
    const genres = Object.keys(booksByGenre)


    let location = useLocation();
    let query = new URLSearchParams(location.search);
    let categorie = query.get("categorie")
    const [searchValue, setSearchValue] = useState("");

    let filteredBooks = [];
    filteredBooks = books.filter(book => {
        if (categorie && book.genre !== categorie) {
            return false;
        }
        if (searchValue && !book.name.toLowerCase().includes(searchValue.toLowerCase())) {
            return false;
        }

        return true;
    });

    const [selectedBook, setSelectedBook] = React.useState(false);

    return (
        <div className={classes.root}>
            <Typography variant="h6">Carti</Typography>
            <div>
                <div className={classes.search}>
                    <div className={classes.searchIcon}>
                        <Search/>
                    </div>
                    <InputBase
                        placeholder="Search…"
                        value={searchValue}
                        onChange={(event) => setSearchValue(event.target.value)}
                        classes={{
                            root: classes.inputRoot,
                            input: classes.inputInput,
                        }}
                        inputProps={{'aria-label': 'search'}}
                    />
                </div>
            </div>
            <GridList cellHeight={250} className={classes.gridList}>
            /* {filteredBooks.map((book) => (
                 <GridListTile key={book.name} onClick={() => {
                     setSelectedBook(book);
                 }}>
                     <img src={book.photo_books} alt={book.name}/>
                     <GridListTileBar
                         title={book.name}
                         actionIcon={<Rating value={book.rating} precision={0.1} readOnly/>}

                        />
                    </GridListTile>
                ))}
            </GridList>}


            <BookModal
                handleClose={() => {
                    setSelectedBook(null);
                }}
                selectedBook={selectedBook}
            />
        </div>
    );
}

export default BookList;

// 1. Recenzii (adauga)
// 2. Rezerva
// 3. Sign up
// 4. Sign in
// 5. Register
// 6. de adaugat recenzii
