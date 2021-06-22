import React, {useState} from 'react';
import {makeStyles} from '@material-ui/core/styles';


const useStyles = makeStyles(theme => ({
    root: {
        backgroundColor: 'white',
        textDecoration: "none",
        color: props => props.color,
    },

}));

const Boilerplate = () => {
    const classes = useStyles();

    return null;
};

export default Boilerplate;
