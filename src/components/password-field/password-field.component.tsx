import { TextField, Typography } from '@mui/material';

interface PasswordFieldProps {
  password: string;
  setPassword: (value: string) => void;
}

export const PasswordField = ({ password, setPassword }: PasswordFieldProps) => {
  return (
    <>
      <Typography variant="body1">Password</Typography>
      <TextField
        type="password"
        fullWidth
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        margin="normal"
        required
        placeholder="Password"
      />
    </>
  );
};