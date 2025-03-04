import { useState, useEffect, useRef, useCallback } from 'react';
import { Box, Button, Typography } from '@mui/material';
import Cookies from 'js-cookie';
import { Modal } from '../../components/modal';
import { ProfileType, AuthorType, QuoteType } from '../../types';

export const Profile = () => {
  const [userData, setUserData] = useState<ProfileType | null>(null);
  const [authorData, setAuthorData] = useState<AuthorType | null>(null);
  const [quoteData, setQuoteData] = useState<QuoteType | null>(null);
  const [loading, setLoading] = useState(false);
  const [loadingAuthorData, setLoadingAuthorData] = useState(false);
  const [loadingQuoteData, setLoadingQuoteData] = useState(false);
  const [open, setOpen] = useState(false);

  const token = Cookies.get('token');

  const abortController = useRef<AbortController | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      if (token) {
        try {
          const response = await fetch(`/api/profile?token=${token}`);
          const { success, data } = await response.json();

          if (success) {
            setUserData(data);
          } else {
            console.error('Failed to fetch user data');
          }
        } catch (error) {
          console.error('Error fetching profile data:', error);
        }
      }
    };

    fetchData();
  }, []);


  const handleUpdateClick = async () => {
    setLoading(true);
    setOpen(true);

    abortController.current?.abort();
    abortController.current = new AbortController();

    try {
      setLoadingAuthorData(true);
      const authorResponse = await fetch(`/api/author?token=${token}`, {
        signal: abortController.current.signal
      });

      const authorData = await authorResponse.json();
      if (!authorData.success) {
        throw new Error('Failed to fetch author data');
      }
      setAuthorData(authorData.data);

      setLoadingAuthorData(false);
      setLoadingQuoteData(true);
      const quoteResponse = await fetch(`/api/quote?token=${token}&authorId=${authorData.data.authorId}`, {
        signal: abortController.current.signal
      });

      const quoteData = await quoteResponse.json();
      if (!quoteData.success) {
        throw new Error('Failed to fetch quote data');
      }
      setQuoteData(quoteData.data);
    } catch (error) {
      if ((error as Error).name === 'AbortError') {
        console.log('Request was aborted');
      } else {
        console.error('Error fetching data:', error);
      }
    } finally {
      setLoading(false);
      setLoadingQuoteData(false);
      setLoadingAuthorData(false);
      setOpen(false);
    }
  };

  const handleCancel = useCallback(() => {
    abortController.current?.abort();
    setOpen(false);
  }, []);

  useEffect(() => {
    return () => {
      abortController.current?.abort();
    };
  }, []);


  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        width: '100%',
        gap: '30px'
      }}
    >
      <Box
        sx={{
          display: 'grid',
          gridTemplateColumns: '250px 1fr',
          width: '100%',
          padding: 2
        }}
      >
        <Box
          component="img"
          src="https://images.unsplash.com/photo-1517849845537-4d257902454a?q=80&w=2835&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          alt="Profile"
          sx={{
            width: '200px',
            height: '200px',
            borderRadius: '100px',
            objectFit: 'cover'
          }}
        />

        <Box>
          <Typography variant="h3" sx={{ marginBottom: 1 }}>
            {`Welcome, ${userData?.fullname}!`}
          </Typography>

          <Button type="submit" color="primary" variant="contained" onClick={handleUpdateClick}>
            Update
          </Button>
        </Box>
      </Box>

      {!loading && quoteData && authorData && (
        <>
          <Typography variant="body1" style={{ fontSize: '18px', fontStyle: 'italic', marginLeft: '1em' }}>
            "{quoteData?.quote}"
          </Typography>
          <Typography variant="caption" style={{ fontSize: '16px', textAlign: 'right', marginTop: '8px' }}>
            - {authorData?.name}
          </Typography>
        </>
      )}

      {open && <Modal
        open={open}
        onClose={() => setOpen(false)}
        onCancel={handleCancel}
        loadingAuthorData={loadingAuthorData}
        loadingQuoteData={loadingQuoteData}
      />
      }
    </Box>
  );
};