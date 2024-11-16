// Utility to send a consistent response structure
const sendResponse = (
  res,
  statusCode,
  success,
  data = null,
  message = null
) => {
  res.status(statusCode).json({
    status: success ? "success" : "error",
    data,
    message,
  });
};

module.exports = sendResponse;
