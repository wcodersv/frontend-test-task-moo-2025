import { useState } from 'react';
import { Button, Box, Typography } from '@mui/material';
import { EmailField } from '../../components/email-field';
import { PasswordField } from '../../components/password-field';
import { useAuthContext } from '../../providers';

export const SignIn = () => {
  const { login, isLoading, error } = useAuthContext();

  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [errorSubmit, setErrorSubmit] = useState<null | string>('');


  const handleSubmit = async (e: React.FormEvent) => {
    setErrorSubmit('');
    e.preventDefault();

    try {
      login(email, password);
      setErrorSubmit('');
    } catch (error) {
      setErrorSubmit('An error occurred during authentication');
    }
  };

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        width: '100%',
        maxWidth: '500px',
        margin: '0 auto',
        padding: 2
      }}
    >
      <Typography variant="h3" gutterBottom>
        Sign In
      </Typography>

      {(errorSubmit || error) && (
        <Typography color="error" variant="body2" sx={{ marginBottom: 2 }}>
          {errorSubmit || error}
        </Typography>
      )}

      <form onSubmit={handleSubmit} style={{ width: '100%' }}>
        <EmailField email={email} setEmail={setEmail} />
        <PasswordField password={password} setPassword={setPassword} />

        <Button
          type="submit"
          variant="contained"
          color="primary"
          fullWidth
          sx={{ marginTop: 2 }}
        >
          {isLoading ? 'Logging in...' : 'Log In'}
        </Button>
      </form>
    </Box>
  );
};