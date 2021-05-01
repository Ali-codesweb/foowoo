import { Container, Typography } from '@material-ui/core'
import React from 'react'
import { makeStyles } from '@material-ui/styles'
function HomeScreen__Section(props) {
    const useStyles = makeStyles(theme => ({
        sectionDiv: {
            textAlign: 'center',
            flexDirection:'column',
            display:'flex',
            marginBottom:'150px'

        },
        title:{
            ...theme.typography.content,
            fontSize:'59px',
            
        },
        content:{
            ...theme.typography.title,
            fontSize:'34px'
        }
    }))

    const classes = useStyles()
    return (
        <div>
            <Container className={classes.sectionDiv} >
                <Typography variant='p' className={classes.title}  >
                        {props.title}                    
                </Typography>
                <Typography variant='p' className={classes.content} >
                    {props.content}
                </Typography>
            </Container>
        </div>
    )
}

export default HomeScreen__Section
