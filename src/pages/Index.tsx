
import { useState, useEffect } from 'react';
import Header from '../components/Header';
import PostCard from '../components/PostCard';
import CreatePost from '../components/CreatePost';
import SearchBar from '../components/SearchBar';
import CategoryFilter from '../components/CategoryFilter';
import { Post, Category } from '../types/forum';

const Index = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [filteredPosts, setFilteredPosts] = useState<Post[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<Category | 'all'>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [showCreatePost, setShowCreatePost] = useState(false);

  // Mock initial data
  useEffect(() => {
    const mockPosts: Post[] = [
      {
        id: '1',
        title: 'Best study spots on campus?',
        content: 'Looking for quiet places to study for finals. Any recommendations? Need somewhere with good wifi and comfy seats!',
        category: 'academics',
        authorId: 'user123',
        authorName: 'Study Beast',
        createdAt: new Date('2024-06-27T10:00:00Z'),
        comments: [
          {
            id: 'c1',
            content: 'The Founders Library 4th floor is amazing! Super quiet and great for deep focus',
            authorId: 'user456',
            authorName: 'Library Lover',
            createdAt: new Date('2024-06-27T11:00:00Z')
          }
        ],
        reactions: [
          { emoji: '👍', count: 15, userReacted: false },
          { emoji: '📚', count: 8, userReacted: true },
          { emoji: '💯', count: 5, userReacted: false }
        ]
      },
      {
        id: '2',
        title: 'Howard Homecoming 2024',
        content: 'Who else is HYPED for Homecoming?! What events are you most looking forward to? The yard show is gonna be INSANE this year!',
        category: 'campus-life',
        authorId: 'user789',
        authorName: 'Bison Pride',
        createdAt: new Date('2024-06-26T15:30:00Z'),
        comments: [],
        reactions: [
          { emoji: '🎉', count: 25, userReacted: false },
          { emoji: '❤️', count: 18, userReacted: true },
          { emoji: '🔥', count: 12, userReacted: false }
        ]
      }
    ];
    setPosts(mockPosts);
    setFilteredPosts(mockPosts);
  }, []);

  // Filter posts based on category and search
  useEffect(() => {
    let filtered = posts;
    
    if (selectedCategory !== 'all') {
      filtered = filtered.filter(post => post.category === selectedCategory);
    }
    
    if (searchQuery) {
      filtered = filtered.filter(post => 
        post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        post.content.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }
    
    setFilteredPosts(filtered);
  }, [posts, selectedCategory, searchQuery]);

  const handleCreatePost = (newPost: Omit<Post, 'id' | 'createdAt' | 'comments' | 'reactions'>) => {
    const post: Post = {
      ...newPost,
      id: Date.now().toString(),
      createdAt: new Date(),
      comments: [],
      reactions: []
    };
    setPosts(prev => [post, ...prev]);
    setShowCreatePost(false);
  };

  const handleAddComment = (postId: string, content: string) => {
    const comment = {
      id: Date.now().toString(),
      content,
      authorId: 'currentUser',
      authorName: 'Anonymous Bison',
      createdAt: new Date()
    };

    setPosts(prev => prev.map(post => 
      post.id === postId 
        ? { ...post, comments: [...post.comments, comment] }
        : post
    ));
  };

  const handleReact = (postId: string, emoji: string) => {
    setPosts(prev => prev.map(post => {
      if (post.id !== postId) return post;
      
      const reactions = [...(post.reactions || [])];
      const existingReactionIndex = reactions.findIndex(r => r.emoji === emoji);
      
      if (existingReactionIndex >= 0) {
        const reaction = reactions[existingReactionIndex];
        if (reaction.userReacted) {
          // Remove user's reaction
          if (reaction.count === 1) {
            reactions.splice(existingReactionIndex, 1);
          } else {
            reactions[existingReactionIndex] = {
              ...reaction,
              count: reaction.count - 1,
              userReacted: false
            };
          }
        } else {
          // Add user's reaction
          reactions[existingReactionIndex] = {
            ...reaction,
            count: reaction.count + 1,
            userReacted: true
          };
        }
      } else {
        // Add new reaction
        reactions.push({
          emoji,
          count: 1,
          userReacted: true
        });
      }
      
      return { ...post, reactions };
    }));
  };

  return (
    <div className="min-h-screen bg-black">
      <Header />
      
      <main className="container mx-auto px-4 py-8 max-w-4xl">
        <div className="mb-8 text-center">
          <h1 className="text-5xl font-bold bg-gradient-to-r from-purple-400 via-blue-400 to-indigo-400 bg-clip-text text-transparent mb-4">
            The Bison Hub
          </h1>
          <p className="text-gray-400 text-lg">Your Howard University Community Hub</p>
        </div>

        {/* Search and Filter Controls */}
        <div className="mb-8 space-y-4">
          <SearchBar searchQuery={searchQuery} onSearchChange={setSearchQuery} />
          <div className="flex flex-wrap gap-4 items-center justify-between">
            <CategoryFilter 
              selectedCategory={selectedCategory} 
              onCategoryChange={setSelectedCategory} 
            />
            <button
              onClick={() => setShowCreatePost(true)}
              className="relative bg-gradient-to-r from-purple-600 via-blue-600 to-indigo-600 text-white px-8 py-3 rounded-2xl font-bold hover:from-purple-700 hover:via-blue-700 hover:to-indigo-700 transition-all duration-300 shadow-lg hover:shadow-2xl transform hover:scale-105 overflow-hidden group"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-purple-400 via-blue-400 to-indigo-400 opacity-0 group-hover:opacity-20 transition-opacity duration-300"></div>
              <div className="absolute top-0 left-0 w-full h-full">
                <div className="absolute top-1 left-2 w-1 h-1 bg-white rounded-full animate-pulse opacity-80"></div>
                <div className="absolute top-2 right-4 w-1 h-1 bg-yellow-300 rounded-full animate-pulse delay-150"></div>
                <div className="absolute bottom-2 left-6 w-1 h-1 bg-blue-200 rounded-full animate-pulse delay-300"></div>
                <div className="absolute bottom-1 right-2 w-1 h-1 bg-purple-200 rounded-full animate-pulse delay-500"></div>
                <div className="absolute top-3 left-1/2 w-1 h-1 bg-indigo-200 rounded-full animate-pulse delay-700"></div>
              </div>
              <span className="relative z-10 flex items-center space-x-2">
                <span>Create Post</span>
              </span>
            </button>
          </div>
        </div>

        {/* Create Post Modal */}
        {showCreatePost && (
          <CreatePost 
            onCreatePost={handleCreatePost}
            onCancel={() => setShowCreatePost(false)}
          />
        )}

        {/* Posts Feed */}
        <div className="space-y-6">
          {filteredPosts.length === 0 ? (
            <div className="text-center py-16 bg-gray-900 rounded-2xl border border-gray-700">
              <div className="text-6xl mb-4">💬</div>
              <p className="text-gray-400 text-lg">No posts found. Be the first to start the conversation!</p>
              <button
                onClick={() => setShowCreatePost(true)}
                className="mt-4 text-purple-400 hover:text-purple-300 font-medium"
              >
                Create the first post!
              </button>
            </div>
          ) : (
            filteredPosts.map(post => (
              <PostCard 
                key={post.id} 
                post={post} 
                onAddComment={handleAddComment}
                onReact={handleReact}
              />
            ))
          )}
        </div>
      </main>
    </div>
  );
};

export default Index;
