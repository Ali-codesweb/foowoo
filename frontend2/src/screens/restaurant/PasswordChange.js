import { Button, makeStyles, TextField } from '@material-ui/core'
import React from 'react'
import TextFieldComp from '../../components/TextFieldComp'
import axios from 'axios'
import { useSelector } from 'react-redux'

function PasswordChange() {
    const [currentPassword, setCurrentPassword] = React.useState('')
    const [newPassword, setNewPassword] = React.useState('')
    const [newPasswordConfirm, setNewPasswordConfirm] = React.useState('')
    const user = useSelector(state => state.userReducer?.user ? state.userReducer?.user : state.userReducer?.user?.user)
    const URL = 'https://foowoo1.herokuapp.com'
    const currentPasswordHandler = (e) => {
        setCurrentPassword(e.target.value)
    }
    const newPasswordHandler = (e) => {
        setNewPassword(e.target.value)
    }
    const newPasswordConfirmHandler = (e) => {
        setNewPasswordConfirm(e.target.value)
    }

    const resetPass = async()=>{
        const config = {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${user?.token ? user?.token : user?.user?.token}`
            }
        }
        const { data } = await axios.put(`${URL}/api/restaurant/restaurant-password/update/`, {
            current_password: currentPassword,
            new_password: newPassword,

        }, config)
        window.alert(data.message)
    }

    const updatePassword = () => {
        if (newPassword != newPasswordConfirm) {
            window.alert('Please confirm passwords properly ')
            return
        }
        resetPass()

    }

    const useStyles = makeStyles(theme => ({
        main: {
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center'
        },
        title: {
            ...theme.typography.content,
            textAlign: 'center',
            fontSize: '2.5rem',
            marginTop: '1rem',
            marginBottom: '30px'
        },
        label: {
            ...theme.typography.title,
            fontSize: '1.5rem'
        },
        btn: {
            ...theme.buttonDef
        }
    }))
    const classes = useStyles()
    return (
        <div className={classes.main} >
            <h1 className={classes.title} >Reset Password</h1>
            <TextFieldComp
                class={classes.label}
                name='Current Password: '
                textFieldDisable={false}
                placeholder={'Current password'}
                value={currentPassword}
                onChange={currentPasswordHandler}
                type='password'
            />
            <TextFieldComp
                class={classes.label}
                name='New Password: '
                textFieldDisable={false}
                placeholder={'New password'}
                value={newPassword}
                onChange={newPasswordHandler}
                type='password'
            />
            <TextFieldComp
                class={classes.label}
                name='Confirm New Password: '
                textFieldDisable={false}
                placeholder={'Confirm new password'}
                value={newPasswordConfirm}
                onChange={newPasswordConfirmHandler}
                type='password'
            />
            <Button variant='contained' className={classes.btn} color='secondary'
                onClick={updatePassword} type='submit' > Update password </Button>
        </div>
    )
}

export default PasswordChange
