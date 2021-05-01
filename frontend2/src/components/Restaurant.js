import { Button, makeStyles, Typography } from '@material-ui/core'
import React from 'react'
import { Link } from 'react-router-dom'

function Restaurant(props) {
    console.log(props.image)
    const useStyles = makeStyles(theme => ({
        background: {
            // height: '320px',
            width: '29vw',
            minWidth:'180px',
            borderColor: theme.palette.primary.light,
            borderRadius: '10px',
            border: '3px solid',
            marginTop: '30px',
            backgroundColor: 'white',
            marginRight: 'auto',
            marginLeft: 'auto',
            textAlign: 'center',
            boxShadow: '0px 5px 5px grey'

        },
        title: {
            ...theme.typography.title,
            marginTop: '10px'
        },
        dummyImage: {
            height: '150px',
            width: '11vw',
            minWidth:'130px',
            backgroundColor: 'grey',
            marginRight: 'auto',
            marginLeft: 'auto',
            marginTop: '10px',
            borderRadius: '5px'
        },
        locationDiv: {
            wordBreak: 'break-all',
            paddingLeft: '30px',
            paddingRight: '30px'
        },
        button: {
            ...theme.buttonDef,
            position: 'relative',
            right: '-50px',
            backgroundColor: theme.palette.secondary.main,
            bottom: '0px',
            

        }
    }))
    const classes = useStyles()
    return (
        <div className={classes.background} >
            <div className={classes.dummyImage} ></div>
            <Typography variant='h5' noWrap className={classes.title} >{props.name}</Typography>
            <div className={classes.locationDiv} >
                <Typography variant='p' className={classes.title} >{props.address},</Typography>
                <Typography variant='p' className={classes.title} >{props.city},</Typography>
                <Typography variant='p' className={classes.title} >{props.state},</Typography>
                <Typography variant='p' noWrap className={classes.title} >{props.pincode}</Typography>
            </div>
            <Button component={Link} className={classes.button} to={`restaurants/${props.id}`} variant='contained' >Details</Button>
        </div>
    )
}

export default Restaurant
