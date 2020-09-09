import {makeStyles} from "@material-ui/core/styles";

export const useStyles = makeStyles({
    root: {
        width: '100%',
        height: 100,
        color:'#FFF',
        backgroundColor: '#689F38',
        display:'flex',
        alignItems:'center',
        justifyContent:'center',
        flexDirection:'column',
        borderTop:'2px solid #FFC107'
    },
    name:{
        color:'#FFEA00',
        fontSize:17,
        margin:'0px 3px'
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