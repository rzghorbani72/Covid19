import {makeStyles} from "@material-ui/core/styles";

export const useStyles = makeStyles({
    root: {
        width: '100%',
        height: 100,
        color:'#FFF',
        background: 'linear-gradient(to right, #EC6EAD, #3494E6)',
        display:'flex',
        alignItems:'center',
        justifyContent:'center',
        flexDirection:'column',
    },
    name:{
        fontSize:17,
        margin:'0px 3px',
        '& a':{
            cursor:'pointer',
            color:'#FFF',
            textDecoration:'none !important'
        }
    },
    email:{
        color:'#FFF',
        fontSize:14
    },
    wrapFooterText:{
        display:'flex',
        flexDirection:'row',
        marginTop:10
    }
});