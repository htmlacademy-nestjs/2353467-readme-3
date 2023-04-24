export interface Comment {
  id?: number;
  text: string;
  postID: number;
  userID: string;
  createdAt?: Date;
}

export interface CommentConditions {
  postID?: {
    in: number[]
  };
  userID?: {
    in: string[]
  };
}