import {makeStyles} from "@material-ui/core/styles";

export const useRowStyles = makeStyles({
    root: {
        width: '100%',
        '& > *': {
            borderBottom: 'unset',
        },
    },
    doubleColumns:{
        display:'flex',
        flexDirection:'column'
    },
    doublePrimary:{
        fontWeight:'bold'
    },
    doubleSecondary:{
    },
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