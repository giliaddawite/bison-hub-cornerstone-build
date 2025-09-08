
import { useState } from 'react';
import { User, Calendar, Smile } from 'lucide-react';
import { Comment } from '../types/forum';
import { Button } from './ui/button';
import { Popover, PopoverContent, PopoverTrigger } from './ui/popover';

interface CommentSectionProps {
  comments: Comment[];
  onAddComment: (content: string) => void;
}

const EMOJI_OPTIONS = [
  '😀', '😃', '😄', '😁', '😊', '😍', '🥰', '😘', '😗', '😚',
  '😙', '😋', '😛', '😜', '🤪', '😝', '🤗', '🤔', '🤐', '🤨',
  '😐', '😑', '😶', '😏', '😒', '🙄', '😬', '🤥', '😔', '😪',
  '🤤', '😴', '😷', '🤒', '🤕', '🤢', '🤮', '🤧', '🥵', '🥶',
  '🥴', '😵', '🤯', '🤠', '🥳', '😎', '🤓', '🧐', '😕', '😟',
  '🙁', '☹️', '😮', '😯', '😲', '😳', '🥺', '😦', '😧', '😨',
  '😰', '😥', '😢', '😭', '😱', '😖', '😣', '😞', '😓', '😩',
  '😫', '🥱', '😤', '😡', '😠', '🤬', '😈', '👿', '💀', '☠️',
  '💩', '🤡', '👹', '👺', '👻', '👽', '👾', '🤖', '😺', '😸',
  '😹', '😻', '😼', '😽', '🙀', '😿', '😾', '❤️', '💛', '💚',
  '💙', '💜', '🖤', '🤍', '🤎', '💔', '❣️', '💕', '💖', '💗',
  '💘', '💝', '💟', '👍', '👎', '👌', '🤌', '🤏', '✌️', '🤞',
  '🤟', '🤘', '🤙', '👈', '👉', '👆', '🖕', '👇', '☝️', '👋',
  '🤚', '🖐️', '✋', '🖖', '👏', '🙌', '🤝', '🙏', '✊', '👊',
  '🤛', '🤜', '💪', '🎉', '🎊', '🔥', '⭐', '✨', '💯', '💫'
];

const CommentSection = ({ comments, onAddComment }: CommentSectionProps) => {
  const [newComment, setNewComment] = useState('');
  const [isEmojiOpen, setIsEmojiOpen] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (newComment.trim()) {
      onAddComment(newComment.trim());
      setNewComment('');
    }
  };

  const handleEmojiSelect = (emoji: string) => {
    setNewComment(prev => prev + emoji);
    setIsEmojiOpen(false);
  };

  const formatDate = (date: Date) => {
    return new Intl.RelativeTimeFormat('en', { numeric: 'auto' }).format(
      Math.ceil((date.getTime() - Date.now()) / (1000 * 60)),
      'minute'
    );
  };

  return (
    <div className="bg-gray-900 border-t border-gray-700">
      <div className="p-6">
        {/* Add Comment Form */}
        <form onSubmit={handleSubmit} className="mb-6">
          <div className="relative">
            <textarea
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              placeholder="Add your comment..."
              className="w-full p-4 pr-12 bg-gray-800 border border-gray-600 text-white placeholder-gray-400 rounded-xl resize-none focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              rows={3}
            />
            <div className="absolute bottom-3 right-3">
              <Popover open={isEmojiOpen} onOpenChange={setIsEmojiOpen}>
                <PopoverTrigger asChild>
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    className="h-8 w-8 p-0 text-gray-400 hover:text-purple-400 hover:bg-gray-700"
                  >
                    <Smile className="h-4 w-4" />
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-80 p-2 bg-gray-800 border-gray-600">
                  <div className="grid grid-cols-10 gap-1 max-h-48 overflow-y-auto">
                    {EMOJI_OPTIONS.map((emoji, index) => (
                      <button
                        key={index}
                        type="button"
                        onClick={() => handleEmojiSelect(emoji)}
                        className="w-8 h-8 flex items-center justify-center hover:bg-gray-700 rounded text-lg transition-colors duration-150"
                      >
                        {emoji}
                      </button>
                    ))}
                  </div>
                </PopoverContent>
              </Popover>
            </div>
          </div>
          <div className="flex justify-end mt-3">
            <button
              type="submit"
              disabled={!newComment.trim()}
              className="bg-gradient-to-r from-purple-600 to-blue-600 text-white px-6 py-2 rounded-xl font-medium hover:from-purple-700 hover:to-blue-700 disabled:from-gray-600 disabled:to-gray-600 disabled:cursor-not-allowed transition-all duration-200 shadow-lg"
            >
              Comment
            </button>
          </div>
        </form>

        {/* Comments List */}
        <div className="space-y-4">
          {comments.length === 0 ? (
            <div className="text-center py-8 bg-gray-800 rounded-xl border border-gray-700">
              <div className="text-4xl mb-2">💬</div>
              <p className="text-gray-400">No comments yet. Be the first to comment!</p>
            </div>
          ) : (
            comments.map(comment => (
              <div key={comment.id} className="bg-gray-800 p-4 rounded-xl border border-gray-700 hover:border-gray-600 transition-colors duration-200">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center space-x-2 text-sm text-gray-400">
                    <User className="h-4 w-4 text-purple-400" />
                    <span className="text-purple-300 font-medium">{comment.authorName}</span>
                  </div>
                  <div className="flex items-center space-x-1 text-sm text-gray-500">
                    <Calendar className="h-3 w-3" />
                    <span>{formatDate(comment.createdAt)}</span>
                  </div>
                </div>
                <p className="text-gray-200">{comment.content}</p>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default CommentSection;
