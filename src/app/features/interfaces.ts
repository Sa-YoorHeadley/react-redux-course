export interface Post {
  userId?: string;
  id: string;
  title: string;
  body: string;
  date: string;
  reactions: {
    thumbsUp: number;
    wow: number;
    heart: number;
    rocket: number;
    coffee: number;
  };
}
export interface User {
  id: string;
  name: string;
}

export interface Reactions {
  thumbsUp?: number;
  wow?: number;
  heart?: number;
  rocket?: number;
  coffee?: number;
}
