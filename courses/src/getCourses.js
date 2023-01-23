export const getCourses = async () => {
    const resp = await fetch(
        `${AIRTABLE_URL}/${AIRTABLE_BASE_ID}/${encodeURIComponent(
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
      return JSON.stringify(data)
};
