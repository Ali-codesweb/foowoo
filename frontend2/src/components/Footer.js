import { makeStyles } from '@material-ui/core'
import React from 'react'
import theme from './theme'

function Footer() {

    const useStyles = makeStyles(theme=>({
        container:{
            backgroundColor:theme.palette.footer,
            height:'503px',
            width:'100%',
            marginTop:'100px'
        }
    }))

    const classes = useStyles()
    return (
        <div className={classes.container} >

        </div>
    )
}

export default Footer
