import React, {useCallback, useEffect, useState} from 'react';
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
        const [firstName, setFirstName] = useState("")
        const [lastName, setLastName] = useState("")
        const [telephoneNumber, setTelephoneNumber] = useState("")
        const [cnp, setCnp] = useState("")
        const [profile, setProfile] = useState({})
        const [error, showError] = useState("");
        let history = useHistory();
        const username = localStorage.getItem("username");
        console.log("profile", profile);

        useEffect(() => {
            axios.get("http://localhost:8080/api/v1/user")
                .then(response => {
                    const users = response.data;
                    const profile = users.find(user => user.username === username);
                    console.log(profile)
                    localStorage.setItem("profile", JSON.stringify(profile))
                    setProfile(profile);
                    setFirstName(profile.firstName);
                    setLastName(profile.lastName);
                    setEmailAddress(profile.emailAddress);
                    setTelephoneNumber(profile.telephoneNumber);
                    setCnp(profile.cnp);
                })
                .catch(console.log);
        }, [])


        const handleSend = useCallback(() => {
                const newProfile = Object.assign({}, profile, {emailAddress, firstName, lastName, telephoneNumber, cnp})

                // showError("");

                axios.put("http://localhost:8080/api/v1/user", newProfile)
                    .then(function (response) {
                        // handle success
                        console.log(response.data);
                    })
                    .catch(console.log)
            }, [emailAddress, firstName, lastName, telephoneNumber, cnp, profile]
        )

        return (
            <div className={classes.root}>
                <Paper elevation={3} className={classes.paper}>
                    <form noValidate autoComplete="off" className={classes.form}>
                        <Typography variant="h6">Profile</Typography>

                        <TextField
                            id="first_name"
                            label="First Name"
                            value={firstName}
                            onChange={(event) => {
                                setFirstName(event.target.value)
                            }}
                        />

                        <TextField
                            id="last_name"
                            label="Last Name"
                            value={lastName}
                            onChange={(event) => {
                                setLastName(event.target.value)
                            }}
                        />

                        <TextField
                            id="email"
                            label="Adresa email"
                            value={emailAddress}
                            onChange={(event) => {
                                setEmailAddress(event.target.value)
                            }}
                        />

                        <TextField
                            id="telefon"
                            label="Telefon"
                            value={telephoneNumber}
                            onChange={(event) => {
                                setTelephoneNumber(event.target.value)
                            }}
                        />

                        <TextField
                            id="CNP"
                            label="CNP"
                            value={cnp}
                            onChange={(event) => {
                                setCnp(event.target.value)
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
