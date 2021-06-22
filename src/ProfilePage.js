import React, {useCallback, useState} from 'react';
import {makeStyles} from '@material-ui/core/styles';
import {Button, FormHelperText, Paper, TextField, Typography} from "@material-ui/core";
import axios from "axios";
import {useHistory} from "react-router-dom";


const useStyles = makeStyles(theme => ({
    root: {
        marginTop: 12,
        display: "flex",
        justifyContent: "center"
    },
    paper: {
        width: 240,
    },
    form: {
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        padding: 12,
        gap: 12,
    },
}));

const ProfilePage = () => {
        const classes = useStyles();
        const [emailAddress, setEmailAddress] = useState("")
        const [password, setPassword] = useState("")
        const [error, showError] = useState("");
        let history = useHistory();
        const profile = JSON.parse(localStorage.getItem("profile"));

        const handleSend = useCallback(() => {
                showError("");

                axios.get("http://localhost:8080/api/v2/login", {
                    params: {
                        // "username": username,
                        // "password": password,
                    }
                })
                    .then(function (response) {
                        // handle success
                        console.log(response.data);
                        if (!response.data) {
                            showError("Parola e gresita")
                        } else {
                            localStorage.setItem("username", response.data.username)
                            history.push(`/profile`);
                        }
                    })
                    .catch(() => {
                        showError("Utilizatorul este deja inregistrat")
                    })
            }, [emailAddress, password, history]
        )

        return (
            <div className={classes.root}>
                <Paper elevation={3} className={classes.paper}>
                    <form noValidate autoComplete="off" className={classes.form}>
                        <Typography variant="h6">Profile</Typography>
                        <TextField
                            id="email"
                            label="Adresa email"
                            value={emailAddress}
                            placeholder={profile.emailAddress}
                            onChange={(event) => {
                                setEmailAddress(event.target.value)
                            }}
                        />

                        <Button variant="outlined" color="primary" onClick={handleSend}>
                            Salveaza
                        </Button>
                    </form>
                </Paper>
            </div>
        );
    }
;

export default ProfilePage;
