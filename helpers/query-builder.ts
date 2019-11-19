import { select } from 'squel';

import { decode } from './base64';

/**
 * Build query string to reading data from database support cursor-based pagination
 */
export const buildCursorPaginationQuery = (options: { table: string; limit: number; cursor: string }): string => {
  let cursorId;
  let selectQuery = select().from(options.table);

  if (options.cursor) {
    try {
      let decodedCursor = decode(options.cursor);

      cursorId = decodedCursor.split(':')[1];
    } catch {
      throw new Error('Invalid cursor');
    }

    selectQuery = selectQuery.where(`id >= ${cursorId}`);
  }

  selectQuery = selectQuery.limit(+(options.limit || 50) + 1);
  selectQuery = selectQuery.order('id', true);

  return selectQuery.toString();
};
