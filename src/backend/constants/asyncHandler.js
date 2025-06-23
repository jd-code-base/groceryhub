const asyncHandler = (fn) => async (req, res) => {
  try {
    await fn(req, res);
  } catch (error) {
    if (process.env.NODE_ENV !== "production") {
      console.error("[Unhandled Error]", error);
    }

    const statusCode = error?.statusCode || 500;
    const message = error?.message || "Internal Server Error";

    return res.status(statusCode).json({
      success: false,
      message,
      errors: error?.errors || [],
      errorId: error?.errorId || "unknown",
      ...(process.env.NODE_ENV === "development" && { stack: error.stack }),
    });
  }
};

export default asyncHandler;
