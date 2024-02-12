export type TimestampProps = {
  createdAt: Date
  updatedAt: Date
  deletedAt: Date
}

export interface TimestampGetters {
  get createdAt(): Date
  get updatedAt(): Date
  get deletedAt(): Date
}
