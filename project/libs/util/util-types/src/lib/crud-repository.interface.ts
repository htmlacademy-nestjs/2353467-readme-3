export interface CRUDRepository<E, I, R> {
  find(id: I): Promise<R | null>;
  create(item: E): Promise<R>;
  update(id: I, item: E): Promise<R>;
  destroy(id: I): Promise<void>;
}