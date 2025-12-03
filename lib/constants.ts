// API Constants
export const API_BASE_URL = 'https://integritas.minima.global/core';
export const API_VERSION = 'v1';
export const API_FULL_URL = `${API_BASE_URL}/${API_VERSION}`;

// HTTP Methods
export const HTTP_METHOD_POST = 'POST';

// Request Headers
export const HEADER_CONTENT_TYPE = 'Content-Type';
export const HEADER_X_API_KEY = 'x-api-key';
export const HEADER_X_REQUEST_ID = 'x-request-id';
export const HEADER_X_REPORT_REQUIRED = 'x-report-required';

// Content Types
export const CONTENT_TYPE_JSON = 'application/json';
export const CONTENT_TYPE_MULTIPART = 'multipart/form-data';

// Request Types
export const REQUEST_TYPE_FILE_UPLOAD = 'File upload';
export const REQUEST_TYPE_RAW_DATA = 'Raw data';

// Header Placeholders
export const PLACEHOLDER_API_KEY = 'your-api-key';
export const PLACEHOLDER_REQUEST_ID = 'your-choice';

// Header Descriptions
export const DESC_X_API_KEY =
  'Add your API-key from your profile at https://integritas.minima.global/';
export const DESC_X_REQUEST_ID =
  'Add a request id to trace every step of the process';
export const DESC_X_REPORT_REQUIRED =
  'Request NFT trace from the verification process';
export const DESC_CONTENT_TYPE_JSON = 'Specifies the content type as JSON';
export const DESC_CONTENT_TYPE_MULTIPART =
  'Specifies the content type as multipart form data';

// API Endpoint Paths
export const ENDPOINT_FILE_HASH = '/v1/file/hash';
export const ENDPOINT_TIMESTAMP_POST = '/v1/timestamp/post';
export const ENDPOINT_TIMESTAMP_STATUS = '/v1/timestamp/status';
export const ENDPOINT_VERIFY_POST = '/v1/verify/post';
export const ENDPOINT_VERIFY_POST_LITE = '/v1/verify/post-lite';
