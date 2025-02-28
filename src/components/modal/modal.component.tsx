import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Typography,
  CircularProgress,
  Stack
} from "@mui/material";

interface ModalProps {
  open: boolean;
  onClose: () => void;
  onCancel: () => void;
  loadingAuthorData: boolean;
  loadingQuoteData: boolean;
}

export const Modal = ({
                        open,
                        onClose,
                        onCancel,
                        loadingAuthorData,
                        loadingQuoteData
                      }: ModalProps) => {
  return (
    <Dialog
      onClose={onClose}
      open={open}
      sx={{
        "& .MuiPaper-root": {
          width: "100%",
          maxWidth: "500px",
        },
      }}
    >
      <DialogTitle>{`Requesting the ${loadingAuthorData ? 'author' : 'quote'}`}</DialogTitle>
      <DialogContent>
        <Stack spacing={2}>
          <Typography variant="body1">
            {`Step 1: Requesting author...`}{" "}
            {loadingAuthorData ? <CircularProgress size={16}/> : "Completed"}
          </Typography>
          <Typography variant="body1">
            {`Step 2: Requesting quote...`}{" "}
            {!loadingAuthorData && (loadingQuoteData ? <CircularProgress size={16}/> : "Completed")}
          </Typography>
        </Stack>
      </DialogContent>
      <DialogActions sx={{justifyContent: "flex-start", padding: "0 24px 24px 24px"}}>
        <Button onClick={onCancel} type="button" color="primary" variant="contained">
          Cancel
        </Button>
      </DialogActions>
    </Dialog>
  );
};