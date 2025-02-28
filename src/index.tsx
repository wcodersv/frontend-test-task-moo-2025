import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { RouterProvider } from 'react-router-dom';
import { router } from './routes/routes';
import { AuthProvider } from './providers';
import { worker } from './mocks/browser';
import './app/global.css';

async function enableMocking(): Promise<void> {
  await worker.start();
}

enableMocking().then(() => {
  const rootElement = document.getElementById('root') as HTMLElement;

  createRoot(rootElement).render(
    <StrictMode>
      <AuthProvider>
        <RouterProvider router={router} />
      </AuthProvider>
    </StrictMode>
  );
});