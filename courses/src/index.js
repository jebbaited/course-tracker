import { Router } from 'itty-router';
import { createCors } from 'itty-cors';

import { createCourse } from './createCourse';
import { getCourses } from './getCourses';

// addEventListener('fetch', (event) => {
//   event.respondWith(handleRequest(event.request));
// });

// async function handleRequest(request) {
//   // console.log(request);
//   const url = new URL(request.url);

//   if (url.pathname === '/submit') {
//     return submitHandler(request);
//   }
//   if (url.pathname === '/courses') {
//     // return submitHandler(request);
//     return await getCourses();
//   }
//   // if (request.method === 'GET') {
//   //   await getCourses()
//   // }

//   return Response.redirect(FORM_URL);
// }

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
  const data = await resp.json();
  return new Response(JSON.stringify(data));
};

const deleteCoursesHandler = async (request) => {
  const id = request.params.id;

  const resp = await fetch(
    `https://api.airtable.com/v0/${AIRTABLE_BASE_ID}/${encodeURIComponent(
      AIRTABLE_TABLE_NAME
    )}/${id}`,
    {
      method: 'DELETE',
      headers: {
        Authorization: `Bearer ${AIRTABLE_API_KEY}`,
      },
    }
  );

  const data = await resp.json();

  return new Response(JSON.stringify(data));

  // return fetch(
  //   `https://api.airtable.com/v0/${AIRTABLE_BASE_ID}/${encodeURIComponent(
  //     AIRTABLE_TABLE_NAME
  //   )}/${id}`,
  //   {
  //     method: 'DELETE',
  //     headers: {
  //       Authorization: `Bearer ${AIRTABLE_API_KEY}`,
  //     },
  //   }
  // );
};

const router = Router();

const { preflight, corsify } = createCors({
  allowOrigin: '*',
  headers: {
    'Access-Control-Allow-Origin': '*',
  },
});

router
  .options('*', preflight)
  .post('/submit', submitHandler)
  .get('/api/courses', coursesHandler)
  // .put('/api/courses', coursesHandler)
  .delete('/api/courses/:id', deleteCoursesHandler)
  .get('*', () => new Response('Not found', { status: 404 }));

addEventListener('fetch', (e) => {
  e.respondWith(
    router
      .handle(e.request, e)
      .catch((err) => error(500, err.stack))
      .then(corsify)
  );
});
