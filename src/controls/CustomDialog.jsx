import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Dialog from '@material-ui/core/Dialog';
import MuiDialogTitle from '@material-ui/core/DialogTitle';
import MuiDialogContent from '@material-ui/core/DialogContent';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import Typography from '@material-ui/core/Typography';

const DialogTitle = withStyles(theme => ({
    root: {
        borderBottom: `1px solid ${theme.palette.divider}`,
        margin: 0,
        padding: theme.spacing.unit * 2,
    },
    closeButton: {
        position: 'absolute',
        right: theme.spacing.unit,
        top: theme.spacing.unit,
        color: theme.palette.grey[500],
    },
}))(props => {
    const { children, classes, onClose } = props;
    return (
        <MuiDialogTitle disableTypography className={classes.root}>
            <Typography variant="h6">{children}</Typography>
            {onClose ? (
                <IconButton aria-label="Close" className={classes.closeButton} onClick={onClose}>
                    <CloseIcon />
                </IconButton>
            ) : null}
        </MuiDialogTitle>
    );
});

const DialogContent = withStyles(theme => ({
    root: {
        margin: 0,
        padding: theme.spacing.unit * 2,
    },
}))(MuiDialogContent);



export class CustomDialog extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            open: false,
        };
    }


    handleClose = () => {
        this.setState({ open: false });
    };

    componentWillReceiveProps(nextProps, nextContext) {
        if (nextProps != null) {
            const { isOpen, title, executeConfirm } = nextProps;
            this.setState({ open: isOpen, title, executeConfirm });
        }
    }

    render() {
        return (<Dialog
            disableBackdropClick
            disableEscapeKeyDown
            onClose={this.handleClose}
            aria-labelledby="customized-dialog-title"
            open={this.state.open}>
            <DialogTitle id="customized-dialog-title" onClose={this.handleClose}>
                {this.state.title}
            </DialogTitle>
            <DialogContent>
                {this.props.children}
            </DialogContent>
            {/* <DialogActions>
                <Button onClick={this.handleConfirm} color="primary">
                    确定
            </Button>
            </DialogActions> */}
        </Dialog>
        );
    }
}

