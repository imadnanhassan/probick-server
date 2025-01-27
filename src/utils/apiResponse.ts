export const apiResponse = {
  success: (data: unknown, message = 'Success') => ({
    message,
    success: true,
    data,
  }),

  error: (error: unknown, message = 'Error occurred') => {
    if (error instanceof Error && error.name === 'ValidationError') {
      return {
        message: 'Validation failed',
        success: false,
        error: error,
      };
    }
    return {
      message,
      success: false,
      error,
    };
  },
};
