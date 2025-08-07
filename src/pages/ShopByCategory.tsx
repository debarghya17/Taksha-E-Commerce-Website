import { useState, useEffect, useRef } from 'react';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Star, Heart, ShoppingCart, Filter, Search } from 'lucide-react';
import ProductCard from '@/components/ProductCard';
import { useToast } from '@/hooks/use-toast';
import { useLocation, useNavigate } from 'react-router-dom';

const ShopByCategory = () => {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [priceRange, setPriceRange] = useState('all');
  const [series, setSeries] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const { toast } = useToast();
  const location = useLocation();
  const navigate = useNavigate();
  const productSectionRef = useRef<HTMLDivElement>(null);

  const scrollToProducts = () => {
    productSectionRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleRequestCustomDesign = () => {
    navigate('/contact');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Sync filters from URL on load or URL change
  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const categoryParam = urlParams.get('category');
    const seriesParam = urlParams.get('series');
    const priceParam = urlParams.get('price');

    if (categoryParam) {
      setSelectedCategory(categoryParam);
      setTimeout(() => scrollToProducts(), 200);
    } else {
      setSelectedCategory('all');
    }

    if (seriesParam) {
      setSeries(seriesParam);
      setTimeout(() => scrollToProducts(), 200);
    } else {
      setSeries('all');
    }

    if (priceParam) {
      setPriceRange(priceParam);
      setTimeout(() => scrollToProducts(), 200);
    } else {
      setPriceRange('all');
    }
  }, [location.search]);

  // Update URL and scroll when filters change
  const updateFilters = (newFilters: { category?: string; series?: string; priceRange?: string }) => {
    const params = new URLSearchParams(location.search);

    if (newFilters.category !== undefined) {
      if (newFilters.category === 'all') params.delete('category');
      else params.set('category', newFilters.category);
      setSelectedCategory(newFilters.category);
    }

    if (newFilters.series !== undefined) {
      if (newFilters.series === 'all') params.delete('series');
      else params.set('series', newFilters.series);
      setSeries(newFilters.series);
    }

    if (newFilters.priceRange !== undefined) {
      if (newFilters.priceRange === 'all') params.delete('price');
      else params.set('price', newFilters.priceRange);
      setPriceRange(newFilters.priceRange);
    }

    navigate(`${location.pathname}?${params.toString()}`, { replace: true });
    scrollToProducts();
  };

  const categories = [
    {
      id: 'corporate',
      name: 'Corporate Gifting Kits',
      image: '',
      count: 13,
      description: 'Professional gifts for business relationships',
    },
    {
      id: 'custom',
      name: 'Customized Giftings',
      image: '',
      count: 8,
      description: 'Personalized creations for special moments',
    },
    {
      id: 'home',
      name: 'Home Decors',
      image: '',
      count: 7,
      description: 'Transform your living spaces with style',
    },
    {
      id: 'personal',
      name: 'Personal Giftings',
      image: '',
      count: 8,
      description: 'Thoughtful gifts for loved ones',
    },
    {
      id: 'new',
      name: 'New Products',
      image: '',
      count: 5,
      description: 'Explore our latest arrivals and fresh launches',
    },
    {
      id: 'spiritual',
      name: 'Spiritual Collection',
      image: '',
      count: 6,
      description: 'Sacred gifts to nourish the soul',
    },
  ];

  const products = [
    // Corporate Gifting Kits
    {
      id: 1,
      name: 'Executive Diary Set',
      category: 'corporate',
      series: 'TakshaVerse',
      price: 1299,
      originalPrice: 1599,
      image:
        '',
      gallery: [
        '',
        '',
        '',
        '',
      ],
      rating: 4.8,
      reviews: 24,
      isNew: true,
      isLimited: false,
      description: 'Premium executive diary with elegant design and quality materials.',
      features: ['Premium paper quality', 'Leather cover', 'Date marking', 'Corporate branding option'],
    },
    {
      id: 2,
      name: 'Wooden Pen Drive Casing',
      category: 'corporate',
      series: 'TakshaVerse',
      price: 899,
      originalPrice: null,
      image:
        '',
      gallery: [
        '',
        '',
        '',
        '',
      ],
      rating: 4.7,
      reviews: 18,
      isNew: false,
      isLimited: false,
      description: 'Elegant wooden casing for pen drives, perfect for corporate gifts.',
      features: ['Natural wood finish', 'Custom engraving available', 'Protective casing', '16GB included'],
    },
    {
      id: 3,
      name: 'Table Organizer Set',
      category: 'corporate',
      series: 'TakshaVerse',
      price: 2499,
      originalPrice: 2999,
      image:
        '',
      gallery: [
        '',
        '',
        '',
        '',
      ],
      rating: 4.9,
      reviews: 31,
      isNew: false,
      isLimited: true,
      description: 'Complete desk organizer with multiple compartments for office essentials.',
      features: ['Multiple compartments', 'Premium wood', 'Pen holder included', 'Document slots'],
    },
    {
      id: 4,
      name: 'Pen Stand with Clock',
      category: 'corporate',
      series: 'TakshaVerse',
      price: 1799,
      originalPrice: null,
      image:
        '',
      gallery: [
        '',
        '',
        '',
        '',
      ],
      rating: 4.6,
      reviews: 22,
      isNew: true,
      isLimited: false,
      description: 'Functional pen stand with integrated digital clock for executive desks.',
      features: ['Digital clock display', 'Multiple pen slots', 'Wooden craftsmanship', 'Battery operated'],
    },
    {
      id: 5,
      name: 'Coffee Tumbler',
      category: 'corporate',
      series: 'TakshaVerse',
      price: 699,
      originalPrice: 899,
      image:
        '',
      gallery: [
        '',
        '',
        '',
        '',
      ],
      rating: 4.5,
      reviews: 35,
      isNew: false,
      isLimited: false,
      description: 'Insulated coffee tumbler perfect for office use.',
      features: ['Double wall insulation', 'Leak-proof lid', 'Custom branding', '350ml capacity'],
    },

    // Customized Giftings
    {
      id: 6,
      name: 'Welcome Kit Bundle',
      category: 'custom',
      series: 'Moments+',
      price: 1999,
      originalPrice: null,
      image:
        '',
      gallery: [
        '',
        '',
        '',
        '',
      ],
      rating: 4.8,
      reviews: 15,
      isNew: true,
      isLimited: false,
      description: 'Customizable welcome kit for new employees or guests.',
      features: ['Personalized items', 'Custom packaging', 'Brand integration', 'Multiple options'],
    },
    {
      id: 7,
      name: '3D Wooden Memento',
      category: 'custom',
      series: 'Epoch Series',
      price: 2299,
      originalPrice: 2699,
      image:
        '',
      gallery: [
        '',
        '',
        '',
        '',
      ],
      rating: 4.9,
      reviews: 28,
      isNew: false,
      isLimited: true,
      description: '3D carved wooden memento for special recognition and awards.',
      features: ['3D carving', 'Custom design', 'Premium wood', 'Engraving included'],
    },
    {
      id: 8,
      name: 'Festival Gift Set',
      category: 'custom',
      series: 'Moments+',
      price: 1599,
      originalPrice: null,
      image:
        '',
      gallery: [
        '',
        '',
        '',
        '',
      ],
      rating: 4.7,
      reviews: 42,
      isNew: false,
      isLimited: false,
      description: 'Specially curated festival gift sets for Diwali and other celebrations.',
      features: ['Festival themed', 'Traditional design', 'Gift packaging', 'Customizable message'],
    },

    // Home Decors
    {
      id: 9,
      name: 'Mandala Wall Art',
      category: 'home',
      series: 'Ark Series',
      price: 3299,
      originalPrice: null,
      image:
        '',
      gallery: [
        '',
        '',
        '',
        '',
      ],
      rating: 4.9,
      reviews: 31,
      isNew: false,
      isLimited: true,
      description: 'Intricate mandala wall art with chakra designs for spiritual spaces.',
      features: ['Hand-carved mandala', 'Chakra integration', 'Natural wood', 'Ready to hang'],
    },
    {
      id: 10,
      name: 'Temple Decor Set',
      category: 'home',
      series: 'Ark Series',
      price: 2799,
      originalPrice: 3299,
      image:
        '',
      gallery: [
        '',
        '',
        '',
        '',
      ],
      rating: 4.8,
      reviews: 25,
      isNew: true,
      isLimited: false,
      description: 'Traditional temple decor items crafted with devotional attention.',
      features: ['Sacred geometry', 'Traditional motifs', 'Spiritual significance', 'Handcrafted details'],
    },
    {
      id: 11,
      name: 'Wooden Photo Frame',
      category: 'home',
      series: 'Epoch Series',
      price: 899,
      originalPrice: 1199,
      image:
        '',
      gallery: [
        '',
        '',
        '',
        '',
      ],
      rating: 4.6,
      reviews: 38,
      isNew: false,
      isLimited: false,
      description: 'Elegant wooden photo frames in various sizes for home decoration.',
      features: ['Multiple sizes', 'Natural wood finish', 'Easy wall mounting', 'Classic design'],
    },

    // Personal Giftings
    {
      id: 12,
      name: 'Memory Fridge Magnet',
      category: 'personal',
      series: 'Moments+',
      price: 299,
      originalPrice: null,
      image:
        '',
      gallery: [
        '',
        '',
        '',
        '',
      ],
      rating: 4.5,
      reviews: 52,
      isNew: true,
      isLimited: false,
      description: 'Personalized fridge magnets made from your precious memories.',
      features: ['Photo customization', 'Strong magnet', 'Weather resistant', 'Multiple shapes'],
    },
    {
      id: 13,
      name: '3D Building Structure',
      category: 'personal',
      series: 'Epoch Series',
      price: 4999,
      originalPrice: 5999,
      image:
        '',
      gallery: [
        '',
        '',
        '',
        '',
      ],
      rating: 4.9,
      reviews: 12,
      isNew: false,
      isLimited: true,
      description: 'Custom 3D wooden replica of your building or architectural structure.',
      features: ['Architectural accuracy', 'Custom dimensions', 'Detailed craftsmanship', 'Display stand included'],
    },
    {
      id: 14,
      name: 'Engraved Photo Diary',
      category: 'personal',
      series: 'Moments+',
      price: 1299,
      originalPrice: null,
      image:
        '',
      gallery: [
        '',
        '',
        '',
        '',
      ],
      rating: 4.7,
      reviews: 33,
      isNew: true,
      isLimited: false,
      description: 'Personal diary with your photos beautifully engraved on wooden cover.',
      features: ['Photo engraving', 'Premium paper', 'Custom cover design', 'Gift packaging'],
    },
    {
      id: 15,
      name: 'Wooden Keychain Set',
      category: 'personal',
      series: 'Moments+',
      price: 199,
      originalPrice: 299,
      image:
        '',
      gallery: [
        '',
        '',
        '',
        '',
      ],
      rating: 4.4,
      reviews: 67,
      isNew: false,
      isLimited: false,
      description: 'Personalized wooden keychains in various designs and shapes.',
      features: ['Custom engraving', 'Durable wood', 'Multiple designs', 'Set of 2'],
    },

    // Spiritual Products
    {
      id: 16,
      name: 'Tulsi Mala',
      category: 'spiritual',
      series: 'Spiritual Collection',
      price: 599,
      originalPrice: null,
      image:
        '',
      gallery: [
        '',
        '',
        '',
        '',
      ],
      rating: 4.9,
      reviews: 85,
      isNew: false,
      isLimited: false,
      description: 'Sacred Tulsi mala for meditation and spiritual practices.',
      features: ['Authentic Tulsi beads', '108 beads', 'Spiritual significance', 'Natural fragrance'],
    },
    {
      id: 17,
      name: 'Rudraksh Sumarni',
      category: 'spiritual',
      series: 'Spiritual Collection',
      price: 899,
      originalPrice: null,
      image:
        '',
      gallery: [
        '',
        '',
        '',
        '',
      ],
      rating: 4.8,
      reviews: 67,
      isNew: false,
      isLimited: false,
      description: 'Authentic Rudraksh beads for spiritual enhancement.',
      features: ['Genuine Rudraksh', 'Different mukhi options', 'Spiritual benefits', 'Certificate included'],
    },
    {
      id: 18,
      name: 'Chandan Tilak',
      category: 'spiritual',
      series: 'Spiritual Collection',
      price: 249,
      originalPrice: null,
      image:
        '',
      gallery: [
        '',
        '',
        '',
        '',
      ],
      rating: 4.7,
      reviews: 134,
      isNew: false,
      isLimited: false,
      description: 'Pure sandalwood paste for tilak and spiritual rituals.',
      features: ['Pure sandalwood', 'Natural fragrance', 'Religious significance', 'Long lasting'],
    },
    {
      id: 19,
      name: 'Tilak Mold',
      category: 'spiritual',
      series: 'Spiritual Collection',
      price: 199,
      originalPrice: null,
      image:
        '',
      gallery: [
        '',
        '',
        '',
        '',
      ],
      rating: 4.6,
      reviews: 92,
      isNew: false,
      isLimited: false,
      description: 'Traditional tilak mold for perfect tilak application.',
      features: ['Different designs', 'Easy to use', 'Traditional patterns', 'Durable material'],
    },
    {
      id: 20,
      name: '12 Jyotirling',
      category: 'spiritual',
      series: 'Spiritual Collection',
      price: 2499,
      originalPrice: null,
      image:
        '',
      gallery: [
        '',
        '',
        '',
        '',
      ],
      rating: 4.9,
      reviews: 45,
      isNew: false,
      isLimited: true,
      description: 'Sacred representation of all 12 Jyotirlingas in one collection.',
      features: ['All 12 Jyotirlingas', 'Detailed craftsmanship', 'Spiritual significance', 'Display stand'],
    },
    {
      id: 21,
      name: 'Gangajal',
      category: 'spiritual',
      series: 'Spiritual Collection',
      price: 299,
      originalPrice: null,
      image:
        '',
      gallery: [
        '',
        '',
        '',
        '',
      ],
      rating: 4.8,
      reviews: 156,
      isNew: false,
      isLimited: false,
      description: 'Sacred Ganges water for religious ceremonies and rituals.',
      features: ['Authentic Gangajal', 'Religious ceremonies', 'Pure and sacred', 'Sealed bottle'],
    },
    {
      id: 22,
      name: 'Char Dham 3D',
      category: 'spiritual',
      series: 'Spiritual Collection',
      price: 1899,
      originalPrice: null,
      image:
        '',
      gallery: [
        '',
        '',
        '',
        '',
      ],
      rating: 4.9,
      reviews: 38,
      isNew: false,
      isLimited: true,
      description: '3D representation of the four sacred Char Dham pilgrimage sites.',
      features: ['All 4 Char Dhams', '3D craftsmanship', 'Spiritual significance', 'Premium materials'],
    },
    {
      id: 23,
      name: 'Spiritual Fridge Magnet',
      category: 'spiritual',
      series: 'Spiritual Collection',
      price: 199,
      originalPrice: null,
      image:
        '',
      gallery: [
        '',
        '',
        '',
        '',
      ],
      rating: 4.5,
      reviews: 87,
      isNew: false,
      isLimited: false,
      description: 'Spiritual themed fridge magnets with sacred symbols.',
      features: ['Sacred symbols', 'Strong magnet', 'Multiple designs', 'Weather resistant'],
    },
    {
      id: 24,
      name: 'Lobhan Deepak',
      category: 'spiritual',
      series: 'Spiritual Collection',
      price: 449,
      originalPrice: null,
      image:
        '',
      gallery: [
        '',
        '',
        '',
        '',
      ],
      rating: 4.7,
      reviews: 73,
      isNew: false,
      isLimited: false,
      description: 'Traditional frankincense lamp for spiritual ambiance.',
      features: ['Pure frankincense', 'Traditional design', 'Spiritual fragrance', 'Long burning'],
    },
    {
      id: 25,
      name: 'Arti Sangrah',
      category: 'spiritual',
      series: 'Spiritual Collection',
      price: 699,
      originalPrice: null,
      image:
        '',
      gallery: [
        '',
        '',
        '',
        '',
      ],
      rating: 4.8,
      reviews: 112,
      isNew: false,
      isLimited: false,
      description: 'Complete collection of traditional arti songs and prayers.',
      features: ['Complete arti collection', 'Traditional prayers', 'Multiple languages', 'Spiritual guidance'],
    },
    {
      id: 26,
      name: 'Reusable Outer Box',
      category: 'spiritual',
      series: 'Spiritual Collection',
      price: 399,
      originalPrice: null,
      image:
        '',
      gallery: [
        '',
        '',
        '',
        '',
      ],
      rating: 4.6,
      reviews: 47,
      isNew: false,
      isLimited: false,
      description: 'Eco-friendly reusable outer box for storing spiritual items.',
      features: ['Eco-friendly', 'Reusable', 'Durable material', 'Spiritual motifs'],
    },
  ];


  const filteredProducts = products.filter(product => {
    const matchesSearch =
      product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.description.toLowerCase().includes(searchTerm.toLowerCase());

    if (selectedCategory !== 'all' && selectedCategory !== 'new' && product.category !== selectedCategory)
      return false;
    if (selectedCategory === 'new' && !product.isNew) return false;
    if (series !== 'all' && product.series !== series) return false;
    if (priceRange === 'under-2000' && product.price >= 2000) return false;
    if (priceRange === '2000-5000' && (product.price < 2000 || product.price > 5000)) return false;
    if (priceRange === 'above-5000' && product.price <= 5000) return false;

    return matchesSearch;
  });

  return (
    <div className="min-h-screen bg-gradient-to-b from-walnut-50/30 to-background">
      <Navigation />

      {/* Hero Banner */}
      <section className="relative py-20 bg-gradient-to-br from-walnut-800 via-mahogany-700 to-walnut-800 text-white">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="container mx-auto px-4 text-center relative z-10">
          <p className="text-lg font-serif italic text-saffron-300 mb-4">Vikalpānām sṛṣṭiḥ</p>
          <h1 className="text-4xl md:text-6xl font-serif font-bold text-white mb-6">Discover the Craft That Speaks to You</h1>
          <p className="text-xl text-gray-200 max-w-2xl mx-auto mb-8">
            A creation of choices - Explore our curated collections designed to celebrate every moment
          </p>
        </div>
      </section>

      {/* Compact + Scroll-enabled Search and Filter Section */}
      <section className="py-3 md:py-4 bg-white/90 backdrop-blur-sm border-b shadow-sm sticky top-16 z-40">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between space-y-3 md:space-y-0 md:space-x-4">
            {/* Search Bar */}
            <div className="flex justify-center w-full md:w-auto lg:flex-grow">
              <div className="relative w-full max-w-md md:max-w-lg lg:max-w-full">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <Input
                  placeholder="Search for products, collections, or styles..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 h-9 md:h-10 text-sm border-walnut-300 focus:border-saffron-500 w-full"
                />
              </div>
            </div>



            {/* Filters */}
            <div className="flex flex-wrap items-center justify-center gap-2 md:gap-3">
              <div className="flex items-center space-x-2">
                <Filter className="h-3 w-3 md:h-4 md:w-4 text-walnut-600" />
                <span className="text-xs md:text-sm font-medium text-walnut-700 hidden sm:inline">Filters:</span>
              </div>

              {/* Category Filter */}
              <select
                value={selectedCategory}
                onChange={(e) => updateFilters({ category: e.target.value })}
                className="px-2 md:px-3 py-1 md:py-1.5 text-xs md:text-sm border border-walnut-300 rounded-md bg-white text-walnut-700 focus:border-saffron-500 min-w-0 flex-shrink"
              >
                <option value="all">All Categories</option>
                <option value="new">New</option>
                <option value="corporate">Corporate Gifting Kits</option>
                <option value="custom">Customized Giftings</option>
                <option value="home">Home Decors</option>
                <option value="personal">Personal Giftings</option>
                <option value="spiritual">Spiritual</option>
              </select>

              {/* Series Filter */}
              <select
                value={series}
                onChange={(e) => updateFilters({ series: e.target.value })}
                className="px-2 md:px-3 py-1 md:py-1.5 text-xs md:text-sm border border-walnut-300 rounded-md bg-white text-walnut-700 focus:border-saffron-500 min-w-0 flex-shrink"
              >
                <option value="all">All Collections</option>
                <option value="TakshaVerse">TakshaVerse</option>
                <option value="Epoch Series">Epoch Series</option>
                <option value="Ark Series">Ark Series</option>
                <option value="Moments+">Moments+</option>
                <option value="Spiritual Collection">Spiritual Collection</option>
              </select>

              {/* Price Filter */}
              <select
                value={priceRange}
                onChange={(e) => updateFilters({ priceRange: e.target.value })}
                className="px-2 md:px-3 py-1 md:py-1.5 text-xs md:text-sm border border-walnut-300 rounded-md bg-white text-walnut-700 focus:border-saffron-500 min-w-0 flex-shrink"
              >
                <option value="all">All Prices</option>
                <option value="under-2000">Under ₹2,000</option>
                <option value="2000-5000">₹2,000 - ₹5,000</option>
                <option value="above-5000">Above ₹5,000</option>
              </select>
            </div>
          </div>
        </div>
      </section>


      {/* Product Section with Scroll Ref */}
      <section ref={productSectionRef} className="py-16 bg-walnut-50/20" data-section="products">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-2xl font-serif font-bold text-walnut-800">
              {selectedCategory === 'all'
                ? 'All Products'
                : categories.find((c) => c.id === selectedCategory)?.name}
              <span className="text-lg text-muted-foreground ml-2">({filteredProducts.length} items)</span>
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {filteredProducts.length > 0 ? (
              filteredProducts.map((product) => (
                <div key={product.id} className="h-full">
                  <ProductCard product={product} />
                </div>
              ))
            ) : (
              <div className="col-span-full text-center py-12">
                <p className="text-muted-foreground text-lg">No products found matching your criteria.</p>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-16 bg-gradient-to-r from-walnut-800 to-mahogany-700 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-serif font-bold mb-6">Need Something Custom?</h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto opacity-90">
            Can't find exactly what you're looking for? We specialize in creating bespoke pieces tailored to your vision.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              onClick={handleRequestCustomDesign}
              className="bg-saffron-600 hover:bg-saffron-700 text-white px-8 py-3 text-lg font-medium rounded-full transition-all duration-300 hover:scale-105"
            >
              Request Custom Design
            </Button>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default ShopByCategory;
