addEventListener('fetch', (event) => {
  event.respondWith(handleRequest(event.request));
});

async function handleRequest(request) {
  // console.log(request);
  const url = new URL(request.url);

  if (url.pathname === '/submit') {
    return submitHandler(request);
  }

  return Response.redirect(FORM_URL);
}

const submitHandler = async (request) => {
  if (request.method !== 'POST') {
    return new Response('Method Not Allowed', {
      status: 405,
    });
  }

  const body = await request.formData();

  const { name, link, tags } = Object.fromEntries(body);

  const reqBody = {
    fields: {
      Name: name,
      Link: link,
      Tags: tags,
    },
  };

  await createAirtableRecord(reqBody);
  return Response.redirect(FORM_URL);
};

const createAirtableRecord = async (body) => {
  return fetch(
    `https://api.airtable.com/v0/${AIRTABLE_BASE_ID}/${encodeURIComponent(
      AIRTABLE_TABLE_NAME
    )}`,
    {
      method: 'POST',
      body: JSON.stringify(body),
      headers: {
        Authorization: `Bearer ${AIRTABLE_API_KEY}`,
        'Content-type': `application/json`,
      },
    }
  );

  // const data = await resp.json();
  // return new Response(`Here ${JSON.stringify(data)}`, { status: 406 });
};
