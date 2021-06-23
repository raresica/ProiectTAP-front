import React, {useEffect, useState} from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import {Avatar, IconButton, InputAdornment, makeStyles, Tab, Tabs, TextField, Typography} from "@material-ui/core";
import {AccountCircle, Close, Send} from "@material-ui/icons";
import Rating from "@material-ui/lab/Rating";
import {useHistory} from "react-router-dom";
import axios from "axios";

function TabPanel(props) {
    const {children, value, index, ...other} = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`simple-tabpanel-${index}`}
            aria-labelledby={`simple-tab-${index}`}
            {...other}
        >
            {value === index && (
                children
            )}
        </div>
    );
}

const useStyles = makeStyles((theme) => ({
    root: {
        margin: 0,
        padding: theme.spacing(2),
    },
    closeButton: {
        position: 'absolute',
        right: theme.spacing(1),
        top: theme.spacing(1),
        color: theme.palette.grey[500],
    },
    genre: {
        background: "#ff000094",
        padding: 4,
        position: "absolute",
        borderRadius: 4,
        color: "white",
        left: -8,
        cursor: "pointer"
    },
    actions: {
        display: "flex",
        justifyContent: "space-between",
    },
    imgcover: {
        width: 350,
        height: 600,
        objectFit: "contain",
        borderRadius: 8,
        background: "#f5f5f5"
    },
    tabContents: {
        display: "flex",
        flexDirection: "column",
        alignItems: "center"
    },
    reviewContainer: {
        display: "flex",
        // justifyContent: "center",
        alignItems: "center",
        gap: 40,
        padding: "8px 20px"
    },
    reviewProfile: {
        display: "flex",
        flexDirection: "column",
        // justifyContent: "center",
        alignItems: "center",
    },
    reviewTextAndRating: {
        // display: "flex",
        // flexDirection: "column",
        // gap: 4
        // alignItems: "center"
    }
}));

export default function BookModal(props) {
    const {selectedBook, handleClose} = props;
    const [activeTab, setActiveTab] = useState(0);
    const classes = useStyles();
    let history = useHistory();

    const [reviews, setReviews] = useState([])

    useEffect(() => {
        axios.get("http://localhost:8080/api/v1/review")
            .then(function (response) {
                // handle success
                console.log(response.data);
                setReviews(response.data);
            })
    }, [])

    const bookReviews = reviews.filter(review => review.bookDto.id === (selectedBook ? selectedBook.id : 0))
    const profile = JSON.parse(localStorage.getItem("profile"));
    const name = profile.firstName || "Anonim";

    const [reviewText, setReviewText] = useState("")
    const [rating, setRating] = useState(0)

    const handleSubmitReview = () => {
        const review = {
            reviewText,
            bookRating: rating,
            bookDto: selectedBook,
            userDto: profile
        };

        axios.post("http://localhost:8080/api/v1/review", review)
            .then(function (response) {
                console.log(response.data);
                setRating(null)
                setReviewText("")
                setReviews([...reviews, review])
            })
            .catch(console.log)
    }

    return (
        <div>
            {
                !!selectedBook && (
                    <Dialog
                        open={!!selectedBook}
                        onClose={handleClose}
                    >
                        <DialogTitle
                            style={{marginRight: 40}}>{"Cartea " + selectedBook.name + " scris de " + selectedBook.publisherName}</DialogTitle>
                        <IconButton aria-label="close" className={classes.closeButton} onClick={handleClose}>
                            <Close/>
                        </IconButton>

                        <Tabs centered value={activeTab} onChange={(event, nextValue) => {
                            setActiveTab(nextValue);
                        }}>
                            <Tab label="Detalii"/>
                            <Tab label="Recenzii"/>
                        </Tabs>

                        <DialogContent>
                            <TabPanel value={activeTab} index={0}>
                                <div className={classes.tabContents}>
                                    <div style={{position: "relative"}}>
                                        <p className={classes.genre} onClick={() => {
                                            history.push(`/carti?categorie=${selectedBook.genre}`);
                                        }}>{selectedBook.genre}</p>
                                        <img className={classes.imgcover} src={selectedBook.photo_books}
                                             alt={selectedBook.name}/> <br/>
                                    </div>
                                    <div style={{textAlign: "center", marginBottom: 24}}>
                                        <Rating value={selectedBook.rating} precision={0.1} readOnly/>
                                    </div>
                                </div>
                                <DialogActions className={classes.actions}>
                                    Stoc: {selectedBook.stock}
                                    <Button
                                        style={{marginLeft: 4}} autoFocus onClick={handleClose} color="primary"
                                        variant="outlined"
                                        disabled={selectedBook.stock === 0}
                                    >
                                        Rezerva
                                    </Button>
                                </DialogActions>
                            </TabPanel>
                            <TabPanel value={activeTab} index={1}>
                                {
                                    profile && (
                                        <div className={classes.reviewContainer}
                                             style={{background: "#f5f5f5", marginBottom: 24, borderRadius: 8}}>
                                            <div className={classes.reviewProfile}>
                                                <Avatar>{name[0]}</Avatar>
                                                <Typography variant="subtitle2">{name}</Typography>
                                            </div>
                                            <div>
                                                <Rating name="rating" value={rating} precision={0.1} onChange={(event, value) => {
                                                    setRating(value);
                                                }}/>
                                                <TextField
                                                    style={{width: "100%"}}
                                                    id="outlined-multiline-static"
                                                    label="Lasa o recenzie"
                                                    multiline
                                                    value={reviewText}
                                                    onChange={(event) => {
                                                        setReviewText(event.target.value)
                                                    }}
                                                    InputProps={{
                                                        endAdornment: (
                                                            <InputAdornment position="end">
                                                                <IconButton
                                                                    aria-label="toggle password visibility"
                                                                    onClick={handleSubmitReview}
                                                                >
                                                                    <Send/>
                                                                </IconButton>
                                                            </InputAdornment>
                                                        )

                                                    }}
                                                />
                                            </div>
                                        </div>

                                    )
                                }

                                {bookReviews.map(review => {
                                        const reviewerName = review.userDto.firstName || "Anonim";

                                        return (
                                            <div key={review.reviewText} className={classes.reviewContainer}>
                                                <div className={classes.reviewProfile}>
                                                    <Avatar>{reviewerName[0]}</Avatar>
                                                    <Typography variant="subtitle2">{reviewerName}</Typography>
                                                </div>
                                                <div className={classes.reviewTextAndRating}>
                                                    <Rating value={review.bookRating} precision={0.1} readOnly/>
                                                    <Typography variant="body1">{review.reviewText}</Typography>
                                                </div>
                                            </div>
                                        )
                                    }
                                )}
                            </TabPanel>
                        </DialogContent>

                    </Dialog>
                )
            }
        </div>
    );
}
