export enum status {
  SUCCESS = 200,
  SERVER = 500,
  CREATED = 201,
}

export const message = {
  CREATED_SUCCESSFULLY: (FIELD: string) => `${FIELD} created succcessfullly`,
};
