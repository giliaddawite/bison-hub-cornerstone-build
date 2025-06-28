
import { useState } from 'react';
import { smile, meh, frown } from 'lucide-react';
import { EmojiReaction } from '../types/forum';
import { Button } from './ui/button';
import { Popover, PopoverContent, PopoverTrigger } from './ui/popover';

interface EmojiReactionProps {
  reactions: EmojiReaction[];
  onReact: (emoji: string) => void;
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
  '🤛', '🤜', '💪', '🦾', '🦿', '🦵', '🦶', '👂', '🦻', '👃',
  '🧠', '🫀', '🫁', '🦷', '🦴', '👀', '👁️', '👅', '👄', '💋'
];

const EmojiReactionComponent = ({ reactions, onReact }: EmojiReactionProps) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="flex items-center space-x-2">
      {/* Display existing reactions */}
      <div className="flex items-center space-x-1">
        {reactions.map((reaction, index) => (
          <button
            key={index}
            onClick={() => onReact(reaction.emoji)}
            className={`flex items-center space-x-1 px-2 py-1 rounded-full text-sm border transition-colors duration-200 ${
              reaction.userReacted 
                ? 'bg-blue-100 border-blue-300 text-blue-800' 
                : 'bg-gray-100 border-gray-200 hover:bg-gray-200'
            }`}
          >
            <span>{reaction.emoji}</span>
            <span className="text-xs">{reaction.count}</span>
          </button>
        ))}
      </div>

      {/* Add reaction button */}
      <Popover open={isOpen} onOpenChange={setIsOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            size="sm"
            className="h-8 px-2 text-gray-500 hover:text-gray-700"
          >
            <span className="text-lg">😊</span>
            <span className="ml-1 text-xs">+</span>
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-80 p-2">
          <div className="grid grid-cols-10 gap-1 max-h-48 overflow-y-auto">
            {EMOJI_OPTIONS.map((emoji, index) => (
              <button
                key={index}
                onClick={() => {
                  onReact(emoji);
                  setIsOpen(false);
                }}
                className="w-8 h-8 flex items-center justify-center hover:bg-gray-100 rounded text-lg transition-colors duration-150"
              >
                {emoji}
              </button>
            ))}
          </div>
        </PopoverContent>
      </Popover>
    </div>
  );
};

export default EmojiReactionComponent;
