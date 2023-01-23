import { Router } from 'itty-router';
import { createCors } from 'itty-cors';
import { error } from 'itty-router-extras'

import { createCourse } from './createCourse';
import { getCourses } from './getCourses';
import { deleteCourse } from './deleteCourse';
import { updateCourse } from './updateCourse';


const submitHandler = async (request) => {
  if (request.method !== 'POST') {
    return new Response('Method Not Allowed', {
      status: 405,
    });
  }

  await createCourse(request);
  return Response.redirect(FORM_URL);
};

const getCoursesHandler = async (request) => {
  if (request.method !== 'GET') {
    return new Response('Method Not Allowed', {
      status: 405,
    });
  }

  const data = await getCourses()
  return new Response(data)
};

const deleteCoursesHandler = async (request) => {
  if (request.method !== 'DELETE') {
    return new Response('Method Not Allowed', {
      status: 405,
    });
  }

return await deleteCourse(request)
};

const updateCoursesHandler = async (request) => {
  if (request.method !== 'PUT') {
    return new Response('Method Not Allowed', {
      status: 405,
    });
  }

 return await updateCourse(request)
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
  .get('/api/courses', getCoursesHandler)
  .put('/api/courses/:id', updateCoursesHandler)
  .delete('/api/courses/:id', deleteCoursesHandler)
  .get('*', () => new Response('Not found', { status: 404 }));

addEventListener('fetch', (e) => {
  e.respondWith(
    router
      .handle(e.request, e)
      .catch((err) => {
        return error(500, err.stack)
      })
      .then(corsify)
  );
});
