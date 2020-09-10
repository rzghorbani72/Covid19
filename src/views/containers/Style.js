import {makeStyles} from "@material-ui/core/styles";
import virus from '../assets/images/coronavirus512.png'
export const useStyles = makeStyles((theme) => ({
    root: {
        backgroundImage: `url(${virus})`,
        backgroundRepeat: 'repeat'
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