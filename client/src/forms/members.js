import React from 'react';
import MemberForm from './fmMembers';
import { Paper, makeStyles } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  pageContent: {
    margin: theme.spacing(0),
    padding: theme.spacing(3),
  },
}));

export default function Members() {
  const classes = useStyles();
 
  return (
    <>
      <Paper className={classes.pageContent}>
        <MemberForm />
      </Paper>{' '}
    </>
  );
}
