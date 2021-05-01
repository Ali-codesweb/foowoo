import { Input, Radio, Typography } from '@material-ui/core';
import React from 'react';
function TextFieldComp(props) {
    return (
        <div style={{ display: 'flex', alignItems: 'center', marginBottom: '20px' }} >
            <Typography className={props.class} >{props.name}</Typography>
            {!props.radio ? (
                <Input disabled={props.textFieldDisable} style={{
                    paddingLeft: '20px',
                    color: 'black'
                }} type={props.type ? props.type : 'text'} accept='image/*' 
                    placeholder={props.placeholder} value={props.value} onChange={props.onChange}
                    inputComponent={props.inputComponent ? props.inputComponent : 'input'} />
            ) : (
                <Radio checked={props.value} onClick={props.onChange} color='secondary' />
            )}
        </div>
    )
}

export default TextFieldComp
