import {makeStyles} from "@material-ui/core/styles";

export const useStyles = makeStyles({
    root: {
        width: '100%',
        height: 100,
        color: '#FFF',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'column',
        // borderBottom:'3px solid #FFC107'
//         background: '#3494E6',
// background: '-webkit-linear-gradient(to right, #EC6EAD, #3494E6)',
        background: 'linear-gradient(to right, #EC6EAD, #3494E6)'
    },
    head: {
        fontSize: 16
    }
});