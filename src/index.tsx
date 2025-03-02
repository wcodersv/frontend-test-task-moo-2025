import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { RouterProvider } from 'react-router-dom';
import { router } from './routes/routes';
import { AuthProvider } from './providers';
import './app/global.css';

async function enableMocking() {
  const { worker } = await import('./mocks/browser');
  return worker.start();
}

enableMocking().then(() => {
  createRoot(document.getElementById('root') as HTMLElement).render(
    <StrictMode>
      <AuthProvider>
        <RouterProvider router={router} />
      </AuthProvider>
    </StrictMode>
  );
});