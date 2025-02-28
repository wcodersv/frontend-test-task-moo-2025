import { useEffect, useState } from 'react';
import { Typography, CircularProgress } from '@mui/material';

export const AboutUs = () => {
  const [infoData, setInfoData] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('/api/info');
        const data = await response.json();

        if (data.success) {
          setInfoData(data.data.info);
        }
      } catch (error) {
        console.error('Failed to fetch info:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  if (isLoading) return <CircularProgress />;

  return (
    <Typography
      variant='h3'
      dangerouslySetInnerHTML={{
        __html: infoData ?? 'No data available',
      }}
      sx={{
        fontSize: '30px',
        color: 'text.primary',
        lineHeight: 1.5,
      }}
    />
  );
};