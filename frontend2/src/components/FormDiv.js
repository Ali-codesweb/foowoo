import { Button, makeStyles } from '@material-ui/core'
import React from 'react'
import TextFieldComp from './TextFieldComp'

function FormDiv(props) {
    const useStyles = makeStyles(theme => ({
        formDiv: {
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            height: 'auto',
            width: '400px',
            backgroundColor: theme.palette.secondary.light,
            marginTop: '30px',
            marginBottom: '30px',
            borderRadius: '15px',
            flexDirection: 'column',
            paddingTop: '50px',
            paddingBottom: '50px',
        },

        btn: {
            ...theme.buttonDef
        },
        label: {
            ...theme.typography.title,
            fontSize: '1.5rem'
        },

    }))
    const classes = useStyles()

    return (
        <div className={classes.formDiv} >
            {props.data.map(item => {
                return (
                    <TextFieldComp
                        class={classes.label}
                        value={item.value}      
                        onChange={(e) => item.onChange(e)}
                        name={item.name}
                        placeholder={item.placeholder}
                        textFieldDisable={item.textFieldDisable ? item.textFieldDisable : false}
                        type={item.type ? item.type : null}
                        radio={item.radio}
                    />
                )
            })}
            {props.children}
            <Button variant='contained' color='primary'
                className={classes.btn} onClick={props.actionTaken} >{props.actionName}</Button>

        </div>
    )
}

export default FormDiv
