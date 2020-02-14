export interface IReply {
  id: number,
  content: string,
  createdAt: string,
  updatedAt: string,
  reviewId: number,
  userEmail?: string,
  sellerId?: number,
}

export interface IReview {
  id: number,
  content: string,
  starRating: number,
  createdAt: string,
  updatedAt: string,
  truckId: number,
  userEmail: string,
  replies: IReply[],
}

