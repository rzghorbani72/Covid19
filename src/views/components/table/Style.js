import {makeStyles} from "@material-ui/core/styles";

export const useRowStyles = makeStyles({
    root: {
        width: '100%',
        '& > *': {
            borderBottom: 'unset',
        },
    },
    container: {
        maxHeight: 690,
        overflowY: 'scroll !important'
    },
    tableHead: {
        backgroundColor: '#EEE'
    },
    table: {
        marginTop: 40
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