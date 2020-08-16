const response = (res, code, status, data, resType) =>
  res.status(code).json({
    status,
    [resType ? 'payload' : 'message']: data,
  });
export default response;
