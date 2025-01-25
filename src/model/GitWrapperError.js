class GitWrapperError extends Error {
  constructor(code, message, details = null) {
    super(message);
    this.code = code;
    this.details = details;
  }
}

module.exports = GitWrapperError;
