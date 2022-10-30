interface Codes {
  success: number;
  created: number;
  noContent: number;
  badRequest: number;
  notFound: number;
  conflict: number;
  InternalServerError: number;
}
export const statusCodes: Codes = {
  success: 200,
  created: 201,
  noContent: 204,
  badRequest: 400,
  notFound: 404,
  conflict: 409,
  InternalServerError: 500,
};
