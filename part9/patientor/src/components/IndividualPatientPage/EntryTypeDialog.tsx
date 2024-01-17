import * as React from 'react';
import Button from '@mui/material/Button';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import DialogTitle from '@mui/material/DialogTitle';
import Dialog from '@mui/material/Dialog';
import { Entry } from '../../types';

const entryTypes = ['Hospital' as Entry['type'], 'HealthCheck' as Entry['type'], 'OccupationalHealthcare' as Entry['type']];

export interface SimpleDialogProps {
  open: boolean;
  selectedValue: Entry['type'];
  onClose: (value: Entry['type']) => void;
  formOpen: boolean;
  setFormOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

export interface EntryTypeDialogProps {
    entryType: Entry['type'], 
    setEntryType: React.Dispatch<React.SetStateAction<Entry['type']>>,
    formOpen: boolean, 
    setFormOpen: React.Dispatch<React.SetStateAction<boolean>>
}

function SimpleDialog(props: SimpleDialogProps) {
  const { onClose, selectedValue, open, setFormOpen } = props;

  const handleClose = () => {
    onClose(selectedValue);
  };

  const handleListItemClick = (value: Entry['type']) => {
    setFormOpen(true);
    onClose(value);
  };

  return (
    <Dialog onClose={handleClose} open={open}>
      <DialogTitle>Select Type of Entry</DialogTitle>
      <List sx={{ pt: 0 }}>
        {entryTypes.map((entryType) => (
          <ListItem disableGutters key={entryType}>
            <ListItemButton onClick={() => handleListItemClick(entryType)}>
              <ListItemText primary={entryType} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Dialog>
  );
}

export default function EntryTypeDialog(props: EntryTypeDialogProps) {
  const [open, setOpen] = React.useState(false);
  const {entryType, setEntryType, formOpen, setFormOpen} = props;
  const selectedValue = entryType;
  const setSelectedValue = setEntryType;

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = (value: Entry['type']) => {
    setOpen(false);
    setSelectedValue(value as Entry['type']);
  };

  return (
    <>
      <Button sx={{m:1}}variant="contained" onClick={handleClickOpen}>
        ADD NEW ENTRY
      </Button>
      <SimpleDialog
        selectedValue={selectedValue}
        open={open}
        onClose={handleClose}
        formOpen={formOpen}
        setFormOpen={setFormOpen}
      />
    </>
  );
}