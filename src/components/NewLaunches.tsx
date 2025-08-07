import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { useNavigate } from 'react-router-dom';
import { useToast } from '@/hooks/use-toast';
import { Phone } from 'lucide-react';
import ProductModal from '@/components/ProductModal';

const NewLaunches = () => {
  const { toast } = useToast();
  const navigate = useNavigate();
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const newProducts = [
    {
      id: 1,
      name: 'Festival Gift Collection',
      series: 'TakshaVerse',
      price: 5999,
      originalPrice: 7499,
      image: '',
      image2: '',
      image3: '',
      image4: '',
      description: 'A curated collection celebrating the spirit of festivals with traditional craftsmanship',
      isLimited: true,
      category: 'custom',
      rating: 4.8,
      reviews: 15,
      isNew: true,
      features: ['Festival themed items', 'Traditional craftsmanship', 'Premium packaging', 'Multiple pieces included']
    },
    {
      id: 2,
      name: 'Executive Desk Set',
      series: 'Epoch Series',
      price: 8999,
      image: '',
      image2: '',
      image3: '',
      image4: '',
      description: 'Sophisticated workspace essentials crafted for the modern leader',
      isLimited: false,
      category: 'corporate',
      rating: 4.9,
      reviews: 22,
      isNew: true,
      features: ['Executive quality', 'Multiple desk accessories', 'Premium materials', 'Professional design']
    },
    {
      id: 3,
      name: 'Artisan Home Decor Trio',
      series: 'Ark Series',
      price: 12999,
      image: '',
      image2: '',
      image3: '',
      image4: '',
      description: 'Transform your living space with this thoughtfully designed collection',
      isLimited: true,
      category: 'home',
      rating: 4.7,
      reviews: 18,
      isNew: true,
      features: ['Three piece set', 'Artisan crafted', 'Home decoration', 'Elegant design']
    },
  ];

  const handleExploreNow = (product) => {
    setSelectedProduct(product);
    setIsModalOpen(true);
  };

  const handleViewAllNewArrivals = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    setTimeout(() => {
      navigate('/shop?category=new');
    }, 400);
  };

  return (
    <>
      <section className="py-20 bg-walnut-50/50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <p className="text-lg font-serif italic text-saffron-600 mb-2">Nūtana sākṣāt</p>
            <h2 className="text-3xl md:text-4xl font-serif font-bold text-walnut-800 mb-4">Fresh Arrivals</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Be among the first to experience our latest creations, where innovation meets timeless tradition
            </p>
          </div>

          {/* Mobile Carousel */}
          <div className="block lg:hidden">
            <div className="flex overflow-x-auto gap-4 pb-4 snap-x snap-mandatory">
              {newProducts.map((product) => (
                <Card
                  key={product.id}
                  className="flex-shrink-0 w-80 snap-start group overflow-hidden bg-card/90 backdrop-blur-sm border-walnut-200 hover:shadow-2xl transition-all duration-500"
                >
                  <div className="relative">
                    <div className="aspect-[4/3] overflow-hidden">
                      <img
                        src={product.image}
                        alt={product.name}
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                      />
                    </div>
                    <div className="absolute top-4 left-4 flex flex-col space-y-2">
                      <span className="bg-saffron-500 text-white text-sm font-medium px-3 py-1 rounded-full shadow-lg">
                        Fresh Arrival
                      </span>
                      {product.isLimited && (
                        <span className="bg-mahogany-600 text-white text-xs font-medium px-2 py-1 rounded-full shadow-lg">
                          Pratiyogitā-samayaḥ
                        </span>
                      )}
                    </div>
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  </div>
                  <CardContent className="p-6">
                    <div className="mb-3">
                      <span className="text-sm font-medium text-saffron-600 bg-saffron-50 px-2 py-1 rounded">
                        {product.series}
                      </span>
                    </div>
                    <h3 className="font-serif font-bold text-xl text-walnut-800 mb-3 group-hover:text-saffron-600 transition-colors">
                      {product.name}
                    </h3>
                    <p className="text-muted-foreground mb-4 text-sm leading-relaxed">{product.description}</p>
                    <div className="bg-gradient-to-r from-green-50 to-emerald-50 border border-green-200 rounded-lg p-3 mb-4">
                      <div className="flex items-center space-x-2">
                        <Phone className="h-4 w-4 text-green-600 flex-shrink-0" />
                        <p className="text-sm text-green-700 font-medium">Custom designs available - We'll contact you!</p>
                      </div>
                    </div>
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center space-x-2">
                        <span className="text-2xl font-bold text-walnut-800">₹{product.price.toLocaleString()}</span>
                        {product.originalPrice && (
                          <span className="text-lg text-muted-foreground line-through">
                            ₹{product.originalPrice.toLocaleString()}
                          </span>
                        )}
                      </div>
                      {product.originalPrice && (
                        <span className="text-sm font-medium text-green-600 bg-green-50 px-2 py-1 rounded">
                          Save ₹{(product.originalPrice - product.price).toLocaleString()}
                        </span>
                      )}
                    </div>
                    <div className="flex justify-center">
                      <Button
                        className="w-full bg-saffron-600 hover:bg-saffron-700 text-white"
                        onClick={() => handleExploreNow(product)}
                      >
                        Explore Now
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* Desktop Grid */}
          <div className="hidden lg:grid grid-cols-1 lg:grid-cols-3 gap-8">
            {newProducts.map((product, index) => (
              <Card
                key={product.id}
                className={`group overflow-hidden bg-card/90 backdrop-blur-sm border-walnut-200 hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 ${index === 1 ? 'lg:scale-105' : ''
                  }`}
              >
                <div className="relative">
                  <div className="aspect-[4/3] overflow-hidden">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                  </div>
                  <div className="absolute top-4 left-4 flex flex-col space-y-2">
                    <span className="bg-saffron-500 text-white text-sm font-medium px-3 py-1 rounded-full shadow-lg">
                      Fresh Arrival
                    </span>
                    {product.isLimited && (
                      <span className="bg-mahogany-600 text-white text-xs font-medium px-2 py-1 rounded-full shadow-lg">
                        Pratiyogitā-samayaḥ
                      </span>
                    )}
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                </div>
                <CardContent className="p-6">
                  <div className="mb-3">
                    <span className="text-sm font-medium text-saffron-600 bg-saffron-50 px-2 py-1 rounded">
                      {product.series}
                    </span>
                  </div>
                  <h3 className="font-serif font-bold text-xl text-walnut-800 mb-3 group-hover:text-saffron-600 transition-colors">
                    {product.name}
                  </h3>
                  <p className="text-muted-foreground mb-4 text-sm leading-relaxed">{product.description}</p>
                  <div className="bg-gradient-to-r from-green-50 to-emerald-50 border border-green-200 rounded-lg p-3 mb-4">
                    <div className="flex items-center space-x-2">
                      <Phone className="h-4 w-4 text-green-600 flex-shrink-0" />
                      <p className="text-sm text-green-700 font-medium">Custom designs available - We'll contact you!</p>
                    </div>
                  </div>
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center space-x-2">
                      <span className="text-2xl font-bold text-walnut-800">₹{product.price.toLocaleString()}</span>
                      {product.originalPrice && (
                        <span className="text-lg text-muted-foreground line-through">
                          ₹{product.originalPrice.toLocaleString()}
                        </span>
                      )}
                    </div>
                    {product.originalPrice && (
                      <span className="text-sm font-medium text-green-600 bg-green-50 px-2 py-1 rounded">
                        Save ₹{(product.originalPrice - product.price).toLocaleString()}
                      </span>
                    )}
                  </div>
                  <div className="flex justify-center">
                    <Button
                      className="w-full bg-saffron-600 hover:bg-saffron-700 text-white"
                      onClick={() => handleExploreNow(product)}
                    >
                      Explore Now
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="text-center mt-12">
            <p className="text-sm text-muted-foreground mb-4">
              Limited quantities available. Each piece is carefully crafted by our artisans.
            </p>
            <Button
              size="lg"
              className="bg-walnut-700 hover:bg-walnut-800 text-white px-8 py-3"
              onClick={handleViewAllNewArrivals}
            >
              View All New Arrivals
            </Button>
          </div>
        </div>
      </section>

      {selectedProduct && (
        <ProductModal
          product={selectedProduct}
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
        />
      )}
    </>
  );
};

export default NewLaunches;
