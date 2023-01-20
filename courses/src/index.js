import { Router } from 'itty-router';

import { createCourse } from './createCourse';
import { getCourses } from './getCourses';

// addEventListener('fetch', (event) => {
//   event.respondWith(handleRequest(event.request));
// });

async function handleRequest(request) {
  // console.log(request);
  const url = new URL(request.url);

  if (url.pathname === '/submit') {
    return submitHandler(request);
  }
  if (url.pathname === '/courses') {
    // return submitHandler(request);
    return await getCourses();
  }
  // if (request.method === 'GET') {
  //   await getCourses()
  // }

  return Response.redirect(FORM_URL);
}

const submitHandler = async (request) => {
  if (request.method !== 'POST') {
    return new Response('Method Not Allowed', {
      status: 405,
    });
  }

  await createCourse(request);
  return Response.redirect(FORM_URL);
};

const coursesHandler = async (request) => {
  // console.log('wow');
  // return new Response('here', { status: 406 });
  const resp = await fetch(
    `https://api.airtable.com/v0/${AIRTABLE_BASE_ID}/${encodeURIComponent(
      AIRTABLE_TABLE_NAME
    )}`,
    {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${AIRTABLE_API_KEY}`,
      },
    }
  );
  const data = resp.json();
  return new Response(data, { status: 406 });
};

const router = Router();

router
  .post('/submit', submitHandler)
  .get('/api/courses', coursesHandler)
  .get('*', () => new Response('Not found', { status: 404 }));

addEventListener('fetch', (e) => {
  e.respondWith(router.handle(e.request, e));
});
