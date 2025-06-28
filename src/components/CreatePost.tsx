
import { useState } from 'react';
import { X, Smile } from 'lucide-react';
import { Category, CATEGORIES } from '../types/forum';
import { Button } from './ui/button';
import { Popover, PopoverContent, PopoverTrigger } from './ui/popover';

interface CreatePostProps {
  onCreatePost: (post: {
    title: string;
    content: string;
    category: Category;
    authorId: string;
    authorName: string;
  }) => void;
  onCancel: () => void;
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

const CreatePost = ({ onCreatePost, onCancel }: CreatePostProps) => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [category, setCategory] = useState<Category>('academics');
  const [isTitleEmojiOpen, setIsTitleEmojiOpen] = useState(false);
  const [isContentEmojiOpen, setIsContentEmojiOpen] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (title.trim() && content.trim()) {
      onCreatePost({
        title: title.trim(),
        content: content.trim(),
        category,
        authorId: 'currentUser',
        authorName: 'Anonymous Bison'
      });
    }
  };

  const handleTitleEmojiSelect = (emoji: string) => {
    setTitle(prev => prev + emoji);
    setIsTitleEmojiOpen(false);
  };

  const handleContentEmojiSelect = (emoji: string) => {
    setContent(prev => prev + emoji);
    setIsContentEmojiOpen(false);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center p-4 z-50 backdrop-blur-sm">
      <div className="bg-gray-900 border border-gray-700 rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between p-6 border-b border-gray-700">
          <h2 className="text-2xl font-bold text-white">✨ Create New Post</h2>
          <button
            onClick={onCancel}
            className="text-gray-400 hover:text-white transition-colors duration-200 hover:bg-gray-800 p-2 rounded-lg"
          >
            <X className="h-6 w-6" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          <div>
            <label htmlFor="category" className="block text-sm font-medium text-gray-300 mb-2">
              📂 Category
            </label>
            <select
              id="category"
              value={category}
              onChange={(e) => setCategory(e.target.value as Category)}
              className="w-full p-3 bg-gray-800 border border-gray-600 text-white rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
            >
              {CATEGORIES.map(cat => (
                <option key={cat.value} value={cat.value} className="bg-gray-800">
                  {cat.label}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label htmlFor="title" className="block text-sm font-medium text-gray-300 mb-2">
              💭 Title
            </label>
            <div className="relative">
              <input
                type="text"
                id="title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="What's on your mind? 🤔"
                className="w-full p-3 pr-12 bg-gray-800 border border-gray-600 text-white placeholder-gray-400 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                required
              />
              <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                <Popover open={isTitleEmojiOpen} onOpenChange={setIsTitleEmojiOpen}>
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
                          onClick={() => handleTitleEmojiSelect(emoji)}
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
          </div>

          <div>
            <label htmlFor="content" className="block text-sm font-medium text-gray-300 mb-2">
              📝 Content
            </label>
            <div className="relative">
              <textarea
                id="content"
                value={content}
                onChange={(e) => setContent(e.target.value)}
                placeholder="Share your thoughts, questions, or information... 💬"
                rows={6}
                className="w-full p-3 pr-12 bg-gray-800 border border-gray-600 text-white placeholder-gray-400 rounded-xl resize-none focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                required
              />
              <div className="absolute bottom-3 right-3">
                <Popover open={isContentEmojiOpen} onOpenChange={setIsContentEmojiOpen}>
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
                          onClick={() => handleContentEmojiSelect(emoji)}
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
          </div>

          <div className="flex justify-end space-x-4 pt-4">
            <button
              type="button"
              onClick={onCancel}
              className="px-6 py-3 border border-gray-600 text-gray-300 rounded-xl hover:bg-gray-800 transition-all duration-200 font-medium"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={!title.trim() || !content.trim()}
              className="px-6 py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-xl font-semibold hover:from-purple-700 hover:to-pink-700 disabled:from-gray-600 disabled:to-gray-600 disabled:cursor-not-allowed transition-all duration-200 shadow-lg hover:shadow-xl"
            >
              🚀 Create Post
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreatePost;
