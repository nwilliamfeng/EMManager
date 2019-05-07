import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import classNames from 'classnames';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelActions from '@material-ui/core/ExpansionPanelActions';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Chip from '@material-ui/core/Chip';
import Button from '@material-ui/core/Button';
 

const styles = theme => ({
    root: {
        width: '100%',
    },
    heading: {
        fontSize: theme.typography.pxToRem(15),
    },
    secondaryHeading: {
        fontSize: theme.typography.pxToRem(15),
        color: theme.palette.text.secondary,
    },
    icon: {
        verticalAlign: 'bottom',
        height: 20,
        width: 20,
    },
    details: {
        alignItems: 'center',
    },
    column: {
        flexBasis: '33.33%',
    },
    helper: {
        borderLeft: `2px solid ${theme.palette.divider}`,
        padding: `${theme.spacing.unit}px ${theme.spacing.unit * 2}px`,
    },
    link: {
        color: theme.palette.primary.main,
        textDecoration: 'none',
        '&:hover': {
            textDecoration: 'underline',
        },
    },
});

function DetailedExpansionPanel(props) {
    const { classes } = props;
    return (
        <div className={classes.root}>
            <ExpansionPanel defaultExpanded={false}>
                <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
                    <div className={classes.column}>
                        <Typography className={classes.heading}>查询条件</Typography>
                    </div>
                    <div className={classes.column}>
                        <Chip label="Barbados" className={classes.chip} onDelete={() => { }} />
                    </div>
                    <div className={classes.column}>
                        <Chip label="Barbados" className={classes.chip} onDelete={() => { }} />
                    </div>
                    <div className={classes.column}>
                        <Chip label="Barbados" className={classes.chip} onDelete={() => { }} />
                    </div>
                </ExpansionPanelSummary>
                <ExpansionPanelDetails className={classes.details}>
                    <div className={classes.column} />
                    <div className={classes.column}>
                        <Chip label="Barbados" className={classes.chip} onDelete={() => { }} />
                    </div>
                    <div className={classNames(classes.column, classes.helper)}>
                        <Typography variant="caption">
                            Select your destination of choice
              
                        </Typography>
                    </div>
                </ExpansionPanelDetails>
             
            </ExpansionPanel>
        </div>
    );
}

DetailedExpansionPanel.propTypes = {
    classes: PropTypes.object.isRequired,
};

export const Search = withStyles(styles)(DetailedExpansionPanel);