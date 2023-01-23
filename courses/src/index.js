import { Router } from 'itty-router';
import { createCors } from 'itty-cors';
import { error, json, missing } from 'itty-router-extras'

import { createCourse } from './createCourse';
import { getCourses } from './getCourses';


const submitHandler = async (request) => {
  if (request.method !== 'POST') {
    return new Response('Method Not Allowed', {
      status: 405,
    });
  }

  await createCourse(request);
  return Response.redirect(FORM_URL);
};

const coursesHandler = async () => {
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

  return fetch(
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
};

const updateCoursesHandler = async (request) => {
  const recordId = request.params.id;
  const content = await request.json()

  return fetch(
    `https://api.airtable.com/v0/${AIRTABLE_BASE_ID}/${encodeURIComponent(
      AIRTABLE_TABLE_NAME
    )}/${recordId}`,
    {
      method: 'PUT',
      body: JSON.stringify(content) ,

      headers: {
        Authorization: `Bearer ${AIRTABLE_API_KEY}`,
        'Content-type': `application/json`,
      },
    }
  );
};

const router = Router();

const { preflight, corsify } = createCors({
  origins: ['*'],
  methods: ['GET', 'POST', 'DELETE', 'PUT'],
  headers: {
    'Access-Control-Allow-Origin': '*',
  },
});

router
  .options('*', preflight)
  .post('/submit', submitHandler)
  .get('/api/courses', coursesHandler)
  .put('/api/courses/:id', updateCoursesHandler)
  .delete('/api/courses/:id', deleteCoursesHandler)
  .get('*', () => new Response('Not found', { status: 404 }));

addEventListener('fetch', (e) => {
  e.respondWith(
    router
      .handle(e.request, e)
      .catch((err) => {
        console.log(err);
        return error(500, err.stack)
      })
      .then(corsify)
  );
});
