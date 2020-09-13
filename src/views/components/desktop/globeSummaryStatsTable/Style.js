import {makeStyles} from "@material-ui/core/styles";

export const useStyles = makeStyles({
    root: {
        display: 'flex',
        flexDirection: 'column',
    },
    h2: {
        fontSize: 20,
        fontWeight:'Bold',
        color: '#455A64',
        marginTop: 80,
        display: 'flex',
        justifyContent: 'left',
    },
    loading :{
        marginTop:100
    }
});