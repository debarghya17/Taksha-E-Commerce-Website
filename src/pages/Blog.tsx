import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Calendar, User, Tag, Share2, Heart, Facebook, Twitter, Linkedin } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const Blog = () => {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const navigate = useNavigate();
  const { toast } = useToast();

  const blogPosts = [
    {
      id: 1,
      title: "The Art of Festive Gifting: Diwali Collection 2024",
      category: "Festive Gifting",
      author: "Dr. M Ray",
      date: "2024-10-15",
      excerpt: "Discover how traditional Diwali motifs inspire our latest collection, blending heritage patterns with contemporary aesthetics for meaningful celebrations.",
      image: "",
      readTime: "5 min read",
      tags: ["Diwali", "Traditional", "Festival"],
      featured: true,
    },
    {
      id: 2,
      title: "Behind the Craft: Meet Our Master Artisan Rajesh Kumar",
      category: "Behind the Scenes",
      author: "Dr. M Ray",
      date: "2024-10-10",
      excerpt: "An intimate conversation with our lead artisan about preserving traditional woodworking techniques while embracing modern design sensibilities.",
      image: "",
      readTime: "8 min read",
      tags: ["Artisan", "Craftsmanship", "Interview"],
      featured: false,
    },
    {
      id: 3,
      title: "Sustainable Crafting: Our Journey Towards Eco-Friendly Design",
      category: "Design Talk",
      author: "Dr. M Ray",
      date: "2024-10-05",
      excerpt: "Exploring our commitment to sustainable materials and practices, and how eco-consciousness shapes every piece we create.",
      image: "",
      readTime: "6 min read",
      tags: ["Sustainability", "Eco-friendly", "Materials"],
      featured: false,
    },
    {
      id: 4,
      title: "Corporate Gifting Done Right: Building Lasting Relationships",
      category: "Corporate",
      author: "Dr. M Ray",
      date: "2024-09-28",
      excerpt: "Why thoughtful corporate gifts matter more than ever, and how to choose pieces that reflect your company's values and appreciation.",
      image: "",
      readTime: "7 min read",
      tags: ["Corporate", "Relationships", "Business"],
      featured: false,
    },
    {
      id: 5,
      title: "The Philosophy of Meaningful Objects",
      category: "Design Talk",
      author: "Dr. M Ray",
      date: "2024-09-20",
      excerpt: "Delving into the deeper meaning behind handcrafted objects and how they carry emotional significance beyond their functional purpose.",
      image: "",
      readTime: "10 min read",
      tags: ["Philosophy", "Meaning", "Emotion"],
      featured: false,
    },
    {
      id: 6,
      title: "Workshop Diaries: Creating the Epoch Series",
      category: "Behind the Scenes",
      author: "Dr. M Ray",
      date: "2024-09-15",
      excerpt: "Take a behind-the-scenes look at the creation process of our Epoch Series, from initial sketches to final polished pieces.",
      image: "",
      readTime: "12 min read",
      tags: ["Process", "Design", "Creation"],
      featured: false,
    },
  ];

  const categories = [
    { id: 'all', name: 'All Stories' },
    { id: 'Festive Gifting', name: 'Festive Gifting' },
    { id: 'Behind the Scenes', name: 'Behind the Scenes' },
    { id: 'Design Talk', name: 'Design Talk' },
    { id: 'Corporate', name: 'Corporate' },
  ];

  const filteredPosts = selectedCategory === 'all'
    ? blogPosts
    : blogPosts.filter(post => post.category === selectedCategory);

  const featuredPost = blogPosts.find(post => post.featured);
  const regularPosts = blogPosts.filter(post => !post.featured);

  const handleShare = (post: any, platform: string) => {
    const url = `${window.location.origin}/blog/${post.id}`;
    const title = post.title;

    let shareUrl = '';

    switch (platform) {
      case 'facebook':
        shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`;
        break;
      case 'twitter':
        shareUrl = `https://twitter.com/intent/tweet?url=${encodeURIComponent(url)}&text=${encodeURIComponent(title)}`;
        break;
      case 'linkedin':
        shareUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`;
        break;
      default:
        navigator.clipboard.writeText(url);
        toast({
          title: "Link copied!",
          description: "The blog post link has been copied to your clipboard.",
        });
        return;
    }

    window.open(shareUrl, '_blank', 'width=600,height=400');
  };

  // Updated handleRead with scroll to top
  const handleRead = (postId: number) => {
    navigate(`/blog/${postId}`);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen">
      <Navigation />

      {/* Hero */}
      <section className="relative py-20 bg-gradient-to-br from-walnut-800 via-mahogany-700 to-walnut-800 text-white text-center">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="container mx-auto px-4 relative z-10">
          <p className="text-lg font-serif italic text-saffron-300 mb-4">
            Kathāyāḥ madhye kalā
          </p>
          <h1 className="text-4xl md:text-5xl font-serif font-bold text-white mb-6">
            Stories Behind the Craft
          </h1>
          <p className="text-xl text-gray-200 max-w-2xl mx-auto">
            Art within stories
          </p>
        </div>
      </section>

      {/* Featured Post */}
      {featuredPost && (
        <section className="py-16 bg-background">
          <div className="container mx-auto px-4">
            <h2 className="text-2xl font-serif font-bold text-walnut-800 mb-8 text-center">Featured Story</h2>
            <Card className="max-w-4xl mx-auto overflow-hidden hover-scale shadow-xl">
              <div className="md:flex">
                <div className="md:w-1/2">
                  <img
                    src={featuredPost.image}
                    alt={featuredPost.title}
                    className="w-full h-64 md:h-full object-cover"
                  />
                </div>
                <div className="md:w-1/2 p-8">
                  <div className="flex items-center gap-2 mb-4">
                    <span className="bg-saffron-100 text-saffron-800 text-xs font-medium px-2 py-1 rounded-full">
                      {featuredPost.category}
                    </span>
                    <span className="text-sm text-muted-foreground">{featuredPost.readTime}</span>
                  </div>

                  <h3 className="text-2xl font-serif font-bold text-walnut-800 mb-4">
                    {featuredPost.title}
                  </h3>

                  <p className="text-muted-foreground mb-6">
                    {featuredPost.excerpt}
                  </p>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4 text-sm text-muted-foreground">
                      <div className="flex items-center gap-1">
                        <User className="h-4 w-4" />
                        <span>{featuredPost.author}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Calendar className="h-4 w-4" />
                        <span>{new Date(featuredPost.date).toLocaleDateString()}</span>
                      </div>
                    </div>
                    <Button
                      className="bg-saffron-600 hover:bg-saffron-700"
                      onClick={() => handleRead(featuredPost.id)}
                    >
                      Read More
                    </Button>
                  </div>
                </div>
              </div>
            </Card>
          </div>
        </section>
      )}

      {/* Category Filter */}
      <section className="py-8 bg-walnut-50/30 border-y border-walnut-200">
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap justify-center gap-4">
            {categories.map((category) => (
              <Button
                key={category.id}
                variant={selectedCategory === category.id ? "default" : "outline"}
                className={`${selectedCategory === category.id ? 'bg-saffron-600 hover:bg-saffron-700' : 'border-walnut-300 hover:bg-walnut-50'}`}
                onClick={() => setSelectedCategory(category.id)}
              >
                {category.name}
              </Button>
            ))}
          </div>
        </div>
      </section>

      {/* Blog Grid */}
      <section className="py-16 bg-background">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {(selectedCategory === 'all' ? regularPosts : filteredPosts.filter(post => !post.featured)).map((post) => (
              <Card key={post.id} className="group overflow-hidden hover-scale bg-card/80 backdrop-blur-sm hover:shadow-xl transition-all duration-300">
                <div className="aspect-[4/3] relative overflow-hidden">
                  <img
                    src={post.image}
                    alt={post.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute top-3 left-3">
                    <span className="bg-white/90 backdrop-blur-sm text-walnut-800 text-xs font-medium px-2 py-1 rounded-full">
                      {post.category}
                    </span>
                  </div>
                  <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <Button size="icon" variant="secondary" className="h-8 w-8 bg-white/90 backdrop-blur-sm">
                      <Heart className="h-4 w-4" />
                    </Button>
                  </div>
                </div>

                <CardContent className="p-6">
                  <div className="flex items-center gap-2 text-sm text-muted-foreground mb-3">
                    <span>{post.readTime}</span>
                    <span>•</span>
                    <span>{new Date(post.date).toLocaleDateString()}</span>
                  </div>

                  <h3 className="font-serif font-bold text-xl text-walnut-800 mb-3 group-hover:text-saffron-600 transition-colors line-clamp-2">
                    {post.title}
                  </h3>

                  <p className="text-muted-foreground text-sm mb-4 line-clamp-3">
                    {post.excerpt}
                  </p>

                  <div className="flex flex-wrap gap-2 mb-4">
                    {post.tags.slice(0, 2).map((tag) => (
                      <span
                        key={tag}
                        className="bg-walnut-100 text-walnut-700 text-xs px-2 py-1 rounded-full"
                      >
                        #{tag}
                      </span>
                    ))}
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <User className="h-4 w-4" />
                      <span>{post.author}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="flex items-center gap-1">
                        <Button
                          size="sm"
                          variant="ghost"
                          className="h-8 w-8 p-0"
                          onClick={() => handleShare(post, 'copy')}
                        >
                          <Share2 className="h-4 w-4" />
                        </Button>
                      </div>
                      <Button
                        size="sm"
                        className="bg-saffron-600 hover:bg-saffron-700 text-white"
                        onClick={() => handleRead(post.id)}
                      >
                        Read
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {filteredPosts.length === 0 && (
            <div className="text-center py-12">
              <p className="text-lg text-muted-foreground">No stories found in this category.</p>
              <Button
                className="mt-4"
                onClick={() => setSelectedCategory('all')}
              >
                View All Stories
              </Button>
            </div>
          )}
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Blog;
