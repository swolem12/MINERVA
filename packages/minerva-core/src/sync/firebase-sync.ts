export type SyncOperation = "create" | "update" | "delete";

export interface SyncQueueItem {
  id: string;
  collection: string;
  docId: string;
  operation: SyncOperation;
  payload: Record<string, unknown>;
  createdAt: string;
  retries: number;
}

export interface FirebaseSyncEngine {
  enqueue(
    collection: string,
    docId: string,
    operation: SyncOperation,
    payload: Record<string, unknown>
  ): SyncQueueItem;
  mergeQueue(local: SyncQueueItem[], remote: SyncQueueItem[]): SyncQueueItem[];
}

export function createFirebaseSyncEngine(): FirebaseSyncEngine {
  return {
    enqueue(collection, docId, operation, payload) {
      return {
        id: `${collection}-${docId}-${Date.now()}`,
        collection,
        docId,
        operation,
        payload,
        createdAt: new Date().toISOString(),
        retries: 0,
      };
    },

    mergeQueue(local, remote) {
      const map = new Map<string, SyncQueueItem>();
      for (const item of [...remote, ...local]) {
        const existing = map.get(item.id);
        if (!existing || item.createdAt > existing.createdAt) {
          map.set(item.id, item);
        }
      }
      return Array.from(map.values()).sort(
        (a, b) => a.createdAt.localeCompare(b.createdAt)
      );
    },
  };
}
