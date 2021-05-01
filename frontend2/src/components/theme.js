import { createMuiTheme } from '@material-ui/core/styles';


const theme = createMuiTheme({

    palette: {
        primary: {
            main: '#DD7F2F',
            light:'#FFBB82'
        },
        secondary: {
            main: '#9DCCAC'
        },
        footer: '#FFCB9F',
        thirdary:{
            main:'#1ee24e'
        }
    },
    buttonDef: {
        borderRadius: '50px',
        fontFamily: 'Lato',
        height: '40px',
    },
    importantHeader:{
        fontFamily:'Oswald'
    },
    typography:{
        h2:{
            fontSize:'4rem'
        },
        content:{
            fontFamily:'Oswald',
            color:'#646262'
        },
        title:{
            fontFamily:'Lato',
            color:'#646262'
        },
        content2:{
            color:'#2F2E2E',
            fontFamily:'Lato'
        }
    }

});

export default theme