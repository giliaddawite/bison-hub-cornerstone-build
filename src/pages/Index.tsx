
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
        content: 'Looking for quiet places to study for finals. Any recommendations?',
        category: 'academics',
        authorId: 'user123',
        authorName: 'Bison Student',
        createdAt: new Date('2024-06-27T10:00:00Z'),
        comments: [
          {
            id: 'c1',
            content: 'The Founders Library 4th floor is amazing!',
            authorId: 'user456',
            authorName: 'Study Buddy',
            createdAt: new Date('2024-06-27T11:00:00Z')
          }
        ]
      },
      {
        id: '2',
        title: 'Howard Homecoming 2024',
        content: 'Who else is excited for Homecoming? What events are you most looking forward to?',
        category: 'campus-life',
        authorId: 'user789',
        authorName: 'Bison Pride',
        createdAt: new Date('2024-06-26T15:30:00Z'),
        comments: []
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

  const handleCreatePost = (newPost: Omit<Post, 'id' | 'createdAt' | 'comments'>) => {
    const post: Post = {
      ...newPost,
      id: Date.now().toString(),
      createdAt: new Date(),
      comments: []
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

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-red-50">
      <Header />
      
      <main className="container mx-auto px-4 py-8 max-w-4xl">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-800 mb-2">The Bison's Corner</h1>
          <p className="text-gray-600">Your Howard University Community Hub</p>
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
              className="bg-gradient-to-r from-blue-600 to-red-600 text-white px-6 py-2 rounded-lg font-semibold hover:from-blue-700 hover:to-red-700 transition-all duration-200 shadow-lg hover:shadow-xl"
            >
              Create Post
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
            <div className="text-center py-12">
              <p className="text-gray-500 text-lg">No posts found. Be the first to start the conversation!</p>
            </div>
          ) : (
            filteredPosts.map(post => (
              <PostCard 
                key={post.id} 
                post={post} 
                onAddComment={handleAddComment}
              />
            ))
          )}
        </div>
      </main>
    </div>
  );
};

export default Index;
