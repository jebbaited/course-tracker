export const createCourse = async (request) => {
  const { name, link, tags } = await request.json();

  const reqBody = {
    fields: {
      Name: name,
      Link: link,
      Tags: tags.join(", "),
    },
  };

  return createAirtableRecord(reqBody);
};

const createAirtableRecord = async (body) => {
  return fetch(
    `${AIRTABLE_URL}/${AIRTABLE_BASE_ID}/${encodeURIComponent(
      AIRTABLE_TABLE_NAME
    )}`,
    {
      method: "POST",
      body: JSON.stringify(body),
      headers: {
        Authorization: `Bearer ${AIRTABLE_API_KEY}`,
        "Content-type": `application/json`,
      },
    }
  );
};
