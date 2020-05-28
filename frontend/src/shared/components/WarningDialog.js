import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

const WarningDialogue = ({ open, onClose, onContinue, msg }) => (
  <Dialog
    open={open}
    onClose={onClose}
    aria-labelledby="alert-dialog-title"
    aria-describedby="alert-dialog-description"
  >
    <DialogTitle id="alert-dialog-title">Warning!</DialogTitle>
    <DialogContent>
      <DialogContentText id="alert-dialog-description">
        {msg}
      </DialogContentText>
    </DialogContent>
    <DialogActions>
      <Button onClick={onContinue} color="primary">
        Yes
      </Button>
      <Button onClick={onClose} color="primary" autoFocus>
        No
      </Button>
    </DialogActions>
  </Dialog>
);

export default WarningDialogue;
