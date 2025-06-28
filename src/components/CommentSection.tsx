
import { useState } from 'react';
import { User, Calendar } from 'lucide-react';
import { Comment } from '../types/forum';

interface CommentSectionProps {
  comments: Comment[];
  onAddComment: (content: string) => void;
}

const CommentSection = ({ comments, onAddComment }: CommentSectionProps) => {
  const [newComment, setNewComment] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (newComment.trim()) {
      onAddComment(newComment.trim());
      setNewComment('');
    }
  };

  const formatDate = (date: Date) => {
    return new Intl.RelativeTimeFormat('en', { numeric: 'auto' }).format(
      Math.ceil((date.getTime() - Date.now()) / (1000 * 60)),
      'minute'
    );
  };

  return (
    <div className="bg-gray-50 border-t border-gray-100">
      <div className="p-6">
        {/* Add Comment Form */}
        <form onSubmit={handleSubmit} className="mb-6">
          <textarea
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            placeholder="Add your comment..."
            className="w-full p-3 border border-gray-200 rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            rows={3}
          />
          <div className="flex justify-end mt-3">
            <button
              type="submit"
              disabled={!newComment.trim()}
              className="bg-blue-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-blue-700 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors duration-200"
            >
              Comment
            </button>
          </div>
        </form>

        {/* Comments List */}
        <div className="space-y-4">
          {comments.length === 0 ? (
            <p className="text-gray-500 text-center py-4">No comments yet. Be the first to comment!</p>
          ) : (
            comments.map(comment => (
              <div key={comment.id} className="bg-white p-4 rounded-lg border border-gray-100">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center space-x-2 text-sm text-gray-500">
                    <User className="h-4 w-4" />
                    <span>{comment.authorName}</span>
                  </div>
                  <div className="flex items-center space-x-1 text-sm text-gray-400">
                    <Calendar className="h-3 w-3" />
                    <span>{formatDate(comment.createdAt)}</span>
                  </div>
                </div>
                <p className="text-gray-700">{comment.content}</p>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default CommentSection;
