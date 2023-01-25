export const getCourses = async (request) => {
  const resp = await fetch(
    `${AIRTABLE_URL}/${AIRTABLE_BASE_ID}/${encodeURIComponent(
      AIRTABLE_TABLE_NAME
    )}`,
    {
      method: request.method,
      headers: {
        Authorization: `Bearer ${AIRTABLE_API_KEY}`,
      },
    }
  );
  const data = await resp.json();
  return JSON.stringify(data);
};
