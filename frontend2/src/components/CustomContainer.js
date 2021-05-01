import { makeStyles } from '@material-ui/styles'
import React from 'react'

function CustomContainer(props) {

    const useStyles = makeStyles(theme => ({
        background: {
            height: 'auto',
            borderColor: theme.palette.primary.light,
            borderRadius: '10px',
            border: '3px solid',
            marginTop: '30px',
            backgroundColor: 'white',
            textAlign: 'center',
            boxShadow: '0px 5px 5px grey',
            overflow:'hidden',
            ...props.style,
        },
        
    }))

        const classes = useStyles()

    return (
        <div className={classes.background} >
            {props.children}
        </div>
    )
}

export default CustomContainer
