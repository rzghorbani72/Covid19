import {makeStyles} from "@material-ui/core/styles";

export const useStyles = makeStyles({
    root: {
        width: '100%',
        height: 200,
        color:'#FFF',
        backgroundColor: '#1B5E20',
        display:'flex',
        alignItems:'center',
        justifyContent:'center',
        flexDirection:'column',
        // borderBottom:'3px solid #FFC107'
    },
    head:{
        fontSize:40
    }
});