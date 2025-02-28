import { HttpResponse, http } from "msw";

const infoHandler = http.get('/api/info', () => {
  return HttpResponse.json({
    success: true,
    data: {
      info: "Some information about the <b>company</b>."
    }
  });
});

const loginHandler = http.post('/api/login', async (req) => {
  const { email, password } = await req.request.json()

  if (email === 'aleksei@example.com' && password === 'lkJlkn8hj') {
    return HttpResponse.json({
      success: true,
      data: {
        token: 'fb566635a66295da0c8ad3f467c32dcf',
      },
    });
  }

  return HttpResponse.json(
    { success: false, message: 'Invalid email or password' },
    { status: 401 }
  );
});

export const handlers = [
  infoHandler,
  loginHandler,
];
