import {makeStyles} from "@material-ui/core/styles";


export const useStyles = makeStyles((theme) => ({
    root: {
        backgroundColor:'#42a5f5'
    },
    paper: {
        padding: theme.spacing(2),
        textAlign: 'center',
        color: theme.palette.text.secondary,
    },
    tableWrapper: {
        display: 'flex',
        justifyContent: 'center'
    }
}));