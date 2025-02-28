import {Box, TextField, Typography} from "@mui/material";

interface EmailFieldProps {
  email: string;
  setEmail: (value: string) => void;
}

export const EmailField = ({email, setEmail}: EmailFieldProps) => {
  return (
    <Box sx={{marginBottom: '20px'}}>
      <Typography variant='body1'>Email address</Typography>
      <TextField
        type="email"
        fullWidth
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        margin="normal"
        required
        placeholder='Enter email'
      />
      <Typography
        variant='body2'
        sx={{
          color: '#757575',
          opacity: 0.8,
        }}
      >We'll never share your email with anyone else</Typography>
    </Box>
  )
}