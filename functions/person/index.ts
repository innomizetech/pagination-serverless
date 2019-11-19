import { Handler, Context } from 'aws-lambda';

import { mysql, getQueryParams, encode, buildCursorPaginationQuery } from '../../helpers';

export const handler: Handler = async (event: any, context: Context) => {
  const query: any = getQueryParams(event);
  const pagingQuery: string = buildCursorPaginationQuery({
    table: 'person',
    limit: query.limit,
    cursor: query.cursor
  });

  console.log(pagingQuery);

  const results: any[] = (await mysql.query(pagingQuery)) || [];
  // Calculate next cursor
  let nextCursor = '';

  if (results.length > query.limit) {
    const lastEle = results.pop();

    nextCursor = encode(`person:${lastEle.id}`);
  }

  const response = {
    success: true,
    data: results,
    response_metadata: {
      next_cursor: nextCursor
    }
  };

  // Run clean up function
  await mysql.end();

  return {
    statusCode: 200,
    body: JSON.stringify(response)
  };
};
