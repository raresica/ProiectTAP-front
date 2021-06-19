import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import {IconButton, makeStyles} from "@material-ui/core";
import {Close} from "@material-ui/icons";
import Rating from "@material-ui/lab/Rating";

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
            color: "white"
        },
        actions: {
            display: "flex",
            justifyContent: "space-between",
        }
    }))
;

export default function BookModal(props) {
    const {selectedBook, handleClose} = props;

    const classes = useStyles();

    return (
        <div>
            {
                !!selectedBook && (
                    <Dialog
                        open={!!selectedBook}
                        onClose={handleClose}
                    >
                        <DialogTitle>{"Cartea " + selectedBook.name + " scris de " + selectedBook.publisherName}</DialogTitle>
                        <IconButton aria-label="close" className={classes.closeButton} onClick={handleClose}>
                            <Close/>
                        </IconButton>
                        <DialogContent>
                            <DialogContentText>
                                <p className={classes.genre}>{selectedBook.genre}</p>
                                <img src={selectedBook.photo_books} alt={selectedBook.name}/> <br/>
                            </DialogContentText>
                            <div style={{textAlign: "center", marginBottom: 24}}>
                                <Rating value={selectedBook.rating} precision={0.1} readOnly/>
                            </div>
                            <DialogActions className={classes.actions}>
                                <Button onClick={handleClose} variant="outlined">
                                    Recenzii
                                </Button>
                                <div>
                                    Stoc: {selectedBook.stock}
                                    <Button
                                        style={{marginLeft: 4}} autoFocus onClick={handleClose} color="primary"
                                        variant="outlined"
                                        disabled={selectedBook.stock === 0}
                                    >
                                        Rezerva
                                    </Button>
                                </div>
                            </DialogActions>
                        </DialogContent>
                    </Dialog>
                )
            }
        </div>
    );
}
