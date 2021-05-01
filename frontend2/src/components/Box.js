import { makeStyles } from '@material-ui/core'
import React from 'react'

function Box(props) {

    const styles = makeStyles(theme=>({
        container:{
           backgroundColor:theme.palette.secondary.main,
           height:'395px',
           width:'271px',
           borderRadius:'18px',
            display:'flex',
            justifyContent:'center',
            alignItems:'center',
            flexDirection:'column',
            marginTop:'50px'
        },
        content:{
            ...theme.typography.content2,
            fontSize:'34px'
        },
        image:{
            height:'166px',
            width:'166px'
        }
    }))

    const classes = styles()
    return (
        <div className={classes.container} >
                <img src={props.image} alt='truck' className={classes.image} ></img>
                <p className={classes.content} >
                    {props.content}
                </p>
        </div>
    )
}

export default Box
