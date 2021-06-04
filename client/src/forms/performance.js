import React from 'react';
import PerformanceForm from './fmPerformance';
import { Paper, makeStyles } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  pageContent: {
    margin: theme.spacing(0),
    padding: theme.spacing(3),
  },
}));

export default function Performance() {
  const classes = useStyles();

  return (
    <>
      <Paper className={classes.pageContent}>
        <PerformanceForm />
      </Paper>{' '}
    </>
  );
}
