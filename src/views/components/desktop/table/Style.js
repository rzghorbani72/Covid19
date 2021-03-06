import {makeStyles} from "@material-ui/core/styles";

export const useRowStyles = makeStyles({
    root: {
        width: '100%',
        '& > *': {
            borderBottom: 'unset',
        },
        marginTop: 30
    },
    active: {
        cursor: 'pointer',
        color: '#212121',
        '&:hover':{
            fontWeight: 'bold',
            color: '#1565C0',
        }
    },
    worldActive: {
        cursor: 'pointer',
        color: '#FFF',
        fontSize: 17,
        fontWeight: 'bolder'
    },
    globe: {
        backgroundColor: '#1565C0',
    },
    globeRow: {
        color: 'white !important'
    },
    date: {
        display: 'flex',
        padding: 5,
        fontSize: '0.8rem',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#B0BEC5',
        color: '#263238'
    },
    doubleColumns: {
        display: 'flex',
        flexDirection: 'column'
    },
    doublePrimary: {
        fontWeight: 'bold'
    },
    doubleSecondary: {},
    container: {
        maxHeight: 690,
        overflowY: 'scroll !important'
    },
    rowCursor: {
        backgroundColor: '#EEE'
    },
    table: {
        marginTop: 20
    },
    textField: {
        width: 115
    },
    tableCell: {
        display: 'inline-flex',
        alignItems: 'center',
        height: 55
    },
    TableHeadCell: {
        cursor: 'pointer'
    },
    loading: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
    }
});