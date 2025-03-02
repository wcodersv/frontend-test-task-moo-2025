import { HttpResponse, http } from 'msw';
import authors from './mock-data-author.json';
import quotes from './mock-data-quote.json';

const tokenAleks = 'fb566635a66295da0c8ad3f467c32dcf';
const getRandomElement = (arr) => arr[Math.floor(Math.random() * arr.length)];

const infoHandler = http.get('/api/info', () => {
  return HttpResponse.json({
    success: true,
    data: {
      info: 'Some information about the <b>company</b>.'
    }
  });
});

const loginHandler = http.post('/api/login', async (req) => {
  const { email, password } = await req.request.json();

  if (email === 'aleksei@example.com' && password === 'lkJlkn8hj') {
    return HttpResponse.json({
      success: true,
      data: {
        token: tokenAleks
      }
    });
  }

  return HttpResponse.json(
    { success: false, data: { message: 'Invalid email or password' } },
    { status: 401 }
  );
});

const logoutHandler = http.delete('/api/logout', (req) => {
  const token = req.request.url.split('token=')[1];

  if (token) {
    return HttpResponse.json({
      success: true,
      data: {}
    });
  }
});


const profileHandler = http.get('/api/profile', (req) => {
  const token = req.request.url.split('token=')[1];

  if (token) {
    return HttpResponse.json({
      success: true,
      data: {
        fullname: 'Aleksei K',
        email: 'aleksei@example.com'
      }
    });
  }
});

const authorHandler = http.get('/api/author', (req) => {
  const token = req.request.url.split('token=')[1];

  if (token) {
    return new Promise(resolve => {
      setTimeout(() => {
        const randomAuthor = getRandomElement(authors);

        resolve(HttpResponse.json({
          success: true,
          data: randomAuthor
        }));
      }, 5000);
    });
  }
});

const quoteHandler = http.get('/api/quote', (req) => {
  const token = req.request.url.split('token=')[1];
  const authorId = req.request.url.split('authorId=')[1];


  if (token && authorId) {
    const filteredQuotes = quotes.filter(q => q.authorId === Number(authorId));

    if (filteredQuotes.length > 0) {
      const randomQuote = getRandomElement(filteredQuotes);

      return new Promise(resolve => {
        setTimeout(() => {
          resolve(HttpResponse.json({
            success: true,
            data: randomQuote
          }));
        }, 5000);
      });
    }
  }
});


export const handlers = [
  infoHandler,
  loginHandler,
  logoutHandler,
  profileHandler,
  authorHandler,
  quoteHandler
];
