export const createCourse = async (request) => {
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
};
