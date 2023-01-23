export const getCourses = async () => {
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
      return JSON.stringify(data)
};
