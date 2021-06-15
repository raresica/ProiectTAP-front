import logo from './logo.svg';
import './App.css';
import axios from "axios";
import {useEffect, useState} from "react";
import {GridList, GridListTile, GridListTileBar, IconButton, ListSubheader, makeStyles} from "@material-ui/core";
import StarBorderIcon from '@material-ui/icons/StarBorder';
import {groupBy } from "lodash";

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'space-around',
        overflow: 'hidden',
        backgroundColor: theme.palette.background.paper,
    },
    gridList: {
        width: 500,
        height: 450,
    },
    icon: {
        color: 'rgba(255, 255, 255, 0.54)',
    },
}));

function GenreList() {
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

    const booksByGenre  = groupBy(books, "genre");
    const genres = Object.keys(booksByGenre)
    console.log("booksByGenre", booksByGenre)
    console.log("genres", genres)
    console.log("photos", books)
    return (
        <div className="App">
            <GridList cellHeight={180} className={classes.gridList}>
                <GridListTile cols={2} style={{ height: 'auto' }}>
                    <ListSubheader component="div">Categorii</ListSubheader>
                </GridListTile>
                {genres.map((genre) => (
                    <GridListTile key={genre}>
                        <img src={booksByGenre[genre][0].photo_categories} alt={genre} />
                        <GridListTileBar
                            title={genre}

                        />
                    </GridListTile>
                ))}
            </GridList>
        </div>
    );
}

export default GenreList;
