
export type Category = 'academics' | 'dorms' | 'food-spots' | 'financial-aid' | 'campus-life';

export interface Comment {
  id: string;
  content: string;
  authorId: string;
  authorName: string;
  createdAt: Date;
}

export interface EmojiReaction {
  emoji: string;
  count: number;
  userReacted: boolean;
}

export interface Post {
  id: string;
  title: string;
  content: string;
  category: Category;
  authorId: string;
  authorName: string;
  createdAt: Date;
  comments: Comment[];
  reactions: EmojiReaction[];
}

export const CATEGORIES: { value: Category; label: string; color: string }[] = [
  { value: 'academics', label: 'Academics', color: 'bg-blue-100 text-blue-800' },
  { value: 'dorms', label: 'Dorms', color: 'bg-green-100 text-green-800' },
  { value: 'food-spots', label: 'Food Spots', color: 'bg-yellow-100 text-yellow-800' },
  { value: 'financial-aid', label: 'Financial Aid', color: 'bg-purple-100 text-purple-800' },
  { value: 'campus-life', label: 'Campus Life', color: 'bg-red-100 text-red-800' }
];
