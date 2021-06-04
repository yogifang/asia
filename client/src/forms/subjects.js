import React from 'react';
import SubjectsForm from './fmSubjects';
import { Paper, makeStyles } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  pageContent: {
    margin: theme.spacing(0),
    padding: theme.spacing(3),
  },
}));

export default function BasicInfo() {
  const classes = useStyles();

  return (
    <>
      <Paper className={classes.pageContent}>
        <SubjectsForm />
      </Paper>{' '}
    </>
  );
}
