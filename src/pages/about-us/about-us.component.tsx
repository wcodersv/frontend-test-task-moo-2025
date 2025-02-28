import { useEffect, useState } from 'react';

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

  if (isLoading) return <p>Loading...</p>;

  return <p dangerouslySetInnerHTML={{ __html: infoData ?? 'No data available' }} />;
};