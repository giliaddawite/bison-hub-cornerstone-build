
import { useState } from 'react';
import { MessageSquare, Calendar, User } from 'lucide-react';
import { Post } from '../types/forum';
import { CATEGORIES } from '../types/forum';
import CommentSection from './CommentSection';

interface PostCardProps {
  post: Post;
  onAddComment: (postId: string, content: string) => void;
}

const PostCard = ({ post, onAddComment }: PostCardProps) => {
  const [showComments, setShowComments] = useState(false);
  const categoryInfo = CATEGORIES.find(cat => cat.value === post.category);

  const formatDate = (date: Date) => {
    return new Intl.RelativeTimeFormat('en', { numeric: 'auto' }).format(
      Math.ceil((date.getTime() - Date.now()) / (1000 * 60 * 60 * 24)),
      'day'
    );
  };

  return (
    <div className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-200 border border-gray-100">
      <div className="p-6">
        <div className="flex items-center justify-between mb-4">
          <span className={`px-3 py-1 rounded-full text-xs font-medium ${categoryInfo?.color}`}>
            {categoryInfo?.label}
          </span>
          <div className="flex items-center text-gray-500 text-sm space-x-4">
            <div className="flex items-center space-x-1">
              <User className="h-4 w-4" />
              <span>{post.authorName}</span>
            </div>
            <div className="flex items-center space-x-1">
              <Calendar className="h-4 w-4" />
              <span>{formatDate(post.createdAt)}</span>
            </div>
          </div>
        </div>

        <h2 className="text-xl font-semibold text-gray-800 mb-3 hover:text-blue-600 cursor-pointer">
          {post.title}
        </h2>
        
        <p className="text-gray-600 mb-4 leading-relaxed">
          {post.content}
        </p>

        <div className="flex items-center justify-between pt-4 border-t border-gray-100">
          <button
            onClick={() => setShowComments(!showComments)}
            className="flex items-center space-x-2 text-gray-500 hover:text-blue-600 transition-colors duration-200"
          >
            <MessageSquare className="h-4 w-4" />
            <span>{post.comments.length} Comments</span>
          </button>
        </div>
      </div>

      {showComments && (
        <CommentSection 
          comments={post.comments} 
          onAddComment={(content) => onAddComment(post.id, content)}
        />
      )}
    </div>
  );
};

export default PostCard;
