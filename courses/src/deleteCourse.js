export const deleteCourse = async (request)=> {
    const id = request.params.id;

    return fetch(
      `${AIRTABLE_URL}/${AIRTABLE_BASE_ID}/${encodeURIComponent(
        AIRTABLE_TABLE_NAME
      )}/${id}`,
      {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${AIRTABLE_API_KEY}`,
        },
      }
    );
}