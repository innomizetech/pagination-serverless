export const decode = (str: string) => {
  const buff = Buffer.from(str, 'base64');

  return buff.toString('utf8');
};

export const encode = (str: string) => {
  const buff = Buffer.from(str);

  return buff.toString('base64');
};
