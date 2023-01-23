export const updateCourse = async (request) => {
    const recordId = request.params.id;
    const content = await request.json()
  
    return fetch(
      `${AIRTABLE_URL}/${AIRTABLE_BASE_ID}/${encodeURIComponent(
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
}