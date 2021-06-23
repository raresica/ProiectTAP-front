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

const SignUpPage = () => {
        const classes = useStyles();
        const [username, setUsername] = useState("")
        const [password, setPassword] = useState("")
        const [error, showError] = useState("");
        let history = useHistory();

        const handleSend = useCallback(() => {
                if (!username.trim()) {
                    showError("Numele de utilizator trebuie completat");
                    return;
                }
                if (username.trim().length < 4) {
                    showError("Numele de utilizator trebuie sa aiba macar 4 caractere");
                    return;
                }

                if (!password.trim()) {
                    showError("Parola trebuie completata");
                    return;
                }

                if (password.trim().length <= 6) {
                    showError("Parola trebuie sa aiba macar 6 caractere");
                    return;
                }

                showError("");

                axios.post("http://localhost:8080/api/v2/signUp", {
                    "username": username,
                    "password": password,
                })
                    .then(function (response) {
                        // handle success
                        console.log(response.data);
                        localStorage.setItem("username", username)
                        history.push(`/profile`);
                    })
                    .catch(() => {
                        showError("Utilizatorul este deja luat")
                    })
            }, [username, password, history]
        )


        return (
            <div className={classes.root}>
                <Paper elevation={3} className={classes.paper}>
                    <form noValidate autoComplete="off" className={classes.form}>
                        <Typography variant="h6">Inregistreaza-te</Typography>
                        <TextField
                            id="username"
                            label="Nume utilizator"
                            value={username}
                            onChange={(event) => {
                                setUsername(event.target.value)
                            }}
                        />
                        <TextField
                            id="password"
                            label="Parola"
                            type="password"
                            value={password}
                            onChange={(event) => {
                                setPassword(event.target.value)
                            }}
                        />
                        <FormHelperText error>{error}</FormHelperText>

                        <Button variant="outlined" color="primary" onClick={handleSend}>
                            Trimite
                        </Button>
                    </form>
                </Paper>
            </div>
        );
    }
;

export default SignUpPage;
