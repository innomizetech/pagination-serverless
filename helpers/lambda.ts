/**
 * Retrieve query params from the event object
 * @param event Event object
 */
export const getQueryParams = (event: any): any => {
  return event.queryStringParameters;
};
