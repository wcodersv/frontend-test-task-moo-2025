import { HttpResponse, http } from "msw";

const infoHandler = http.get('/api/info', () => {
  return HttpResponse.json({
    success: true,
    data: {
      info: "Some information about the <b>company</b>."
    }
  });
});

export const handlers = [
  infoHandler,
];
