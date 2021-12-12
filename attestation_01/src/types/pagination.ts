export interface PaginationHandlerType {
  (newPage: number, newSize?: number): void;
}
