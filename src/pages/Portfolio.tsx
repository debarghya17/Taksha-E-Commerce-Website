import { useState } from 'react';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Download, Eye, Star } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { useNavigate } from 'react-router-dom';

const Portfolio = () => {
  const { toast } = useToast();
  const navigate = useNavigate();

  const catalogues = [
    {
      id: 1,
      title: 'TakshaVerse Collection',
      subtitle: 'Corporate Excellence Series',
      description:
        'Our premium corporate gifting solutions featuring executive desk sets, branded items, and sophisticated business gifts that leave lasting impressions.',
      images: [
        '',
        '',
        '',
      ],
      productCount: 24,
      category: 'Corporate',
      featured: true,
      pdfUrl:
        '',
      previewImages: [
        '',
        '',
        '',
      ],
    },
    {
      id: 2,
      title: 'Ark Series Heritage',
      subtitle: 'Spiritual & Traditional Artistry',
      description:
        'Sacred geometry and traditional Indian art forms transformed into contemporary home decor pieces that bring spiritual essence to modern spaces.',
      images: [
        '',
        '',
        '',
      ],
      productCount: 18,
      category: 'Spiritual',
      featured: true,
      pdfUrl:
        '',
      previewImages: [
        '',
        '',
        '',
      ],
    },
    {
      id: 3,
      title: 'Moments+ Celebrations',
      subtitle: 'Special Occasions Collection',
      description:
        "Thoughtfully crafted pieces for life's precious moments - birthdays, anniversaries, festivals, and celebrations that deserve something extraordinary.",
      images: [
        '',
        '',
        '',
      ],
      productCount: 32,
      category: 'Personal',
      featured: false,
      pdfUrl:
        '',
      previewImages: [
        '',
        '',
        '',
      ],
    },
    {
      id: 4,
      title: 'Epoch Series Classics',
      subtitle: 'Timeless Traditional Craftsmanship',
      description:
        'Heritage woodwork techniques passed down through generations, reimagined for contemporary homes while preserving authentic craftsmanship.',
      images: [
        '',
        '',
        '',
      ],
      productCount: 28,
      category: 'Heritage',
      featured: false,
      pdfUrl:
        '',
      previewImages: [
        '',
        '',
        '',
      ],
    },
    {
      id: 5,
      title: 'Bespoke Customizations',
      subtitle: 'Made-to-Order Excellence',
      description:
        'Completely personalized creations tailored to your vision, from corporate branding to personal engravings and custom dimensions.',
      images: [
        '',
        '',
        '',
      ],
      productCount: 15,
      category: 'Custom',
      featured: true,
      pdfUrl:
        '',
      previewImages: [
        '',
        '',
        '',
      ],
    },
    {
      id: 6,
      title: 'Home Decor Essentials',
      subtitle: 'Contemporary Living Collection',
      description:
        'Modern home accessories that blend functionality with aesthetic appeal, designed to complement contemporary interior design styles.',
      images: [
        '',
        '',
        '',
      ],
      productCount: 42,
      category: 'Home',
      featured: false,
      pdfUrl:
        '',
      previewImages: [
        '',
        '',
        '',
      ],
    },
  ];


  const handleRequestCustomDesign = () => {
    navigate('/contact');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // CatalogueCard as inner component to keep its own state properly
  const CatalogueCard = ({ catalogue }: { catalogue: any }) => {
    const [currentImgIndex, setCurrentImgIndex] = useState(0);

    const nextImage = () => {
      setCurrentImgIndex((prev) => (prev + 1) % catalogue.images.length);
    };

    const prevImage = () => {
      setCurrentImgIndex((prev) =>
        prev === 0 ? catalogue.images.length - 1 : prev - 1
      );
    };

    const handleDownloadPDF = () => {
      try {
        const link = document.createElement('a');
        link.href = catalogue.pdfUrl;
        link.setAttribute(
          'download',
          `${catalogue.title.replace(/\s+/g, '_')}_Catalogue.pdf`
        );
        link.setAttribute('target', '_blank');
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);

        toast({
          title: 'Download Initiated',
          description: `${catalogue.title} catalogue download has started.`,
        });
      } catch (error) {
        toast({
          title: 'Download Failed',
          description: `There was an error downloading the ${catalogue.title} catalogue.`,
          variant: 'destructive',
        });
      }
    };

    const handlePreview = () => {
      window.open(catalogue.pdfUrl, '_blank');

      toast({
        title: 'Preview Opened',
        description: `${catalogue.title} catalogue preview opened in new tab.`,
      });
    };

    return (
      <Card className="group overflow-hidden hover-scale bg-card/80 backdrop-blur-sm border-walnut-200 hover:shadow-xl transition-all duration-300 h-full flex flex-col">
        <div className="relative aspect-[4/3] overflow-hidden select-none">
          <img
            src={catalogue.images[currentImgIndex]}
            alt={`${catalogue.title} image ${currentImgIndex + 1}`}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
            draggable={false}
          />
          {/* Prev/Next Buttons */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              prevImage();
            }}
            className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-black/40 text-white p-2 rounded-full hover:bg-black/60 transition"
            aria-label="Previous Image"
            type="button"
          >
            ‹
          </button>
          <button
            onClick={(e) => {
              e.stopPropagation();
              nextImage();
            }}
            className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-black/40 text-white p-2 rounded-full hover:bg-black/60 transition"
            aria-label="Next Image"
            type="button"
          >
            ›
          </button>

          {catalogue.featured && (
            <div className="absolute top-3 left-3 z-10">
              <Badge className="bg-saffron-500 text-white flex items-center gap-1 px-2 py-1">
                <Star className="h-3 w-3 fill-current" />
                Featured
              </Badge>
            </div>
          )}

          <div className="absolute top-3 right-3 z-10">
            <Badge
              variant="secondary"
              className="bg-black/60 text-white border-none px-2 py-1"
            >
              {catalogue.category}
            </Badge>
          </div>
        </div>

        <CardContent className="p-6 flex-1 flex flex-col">
          <div className="mb-3">
            <Badge
              variant="outline"
              className="text-xs text-saffron-600 border-saffron-600"
            >
              {catalogue.productCount} Products
            </Badge>
          </div>

          <h3 className="font-serif font-bold text-xl text-walnut-800 mb-2 group-hover:text-saffron-600 transition-colors">
            {catalogue.title}
          </h3>

          <p className="font-medium text-saffron-600 text-sm mb-3">
            {catalogue.subtitle}
          </p>

          <p className="text-sm text-muted-foreground mb-6 flex-1 leading-relaxed">
            {catalogue.description}
          </p>

          <div className="flex gap-3 mt-auto">
            <Button
              onClick={handlePreview}
              variant="outline"
              className="flex-1 border-walnut-300 hover:bg-walnut-50 group"
            >
              <Eye className="h-4 w-4 mr-2 group-hover:scale-110 transition-transform" />
              Preview
            </Button>
            <Button
              onClick={handleDownloadPDF}
              className="flex-1 bg-saffron-600 hover:bg-saffron-700 text-white group"
            >
              <Download className="h-4 w-4 mr-2 group-hover:scale-110 transition-transform" />
              Download PDF
            </Button>
          </div>
        </CardContent>
      </Card>
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-walnut-50/30 to-background">
      <Navigation />

      {/* Hero Section */}
      <section className="relative py-20 bg-gradient-to-br from-walnut-800 via-mahogany-700 to-walnut-800 text-white">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="container mx-auto px-4 text-center relative z-10">
          <p className="text-lg font-serif italic text-saffron-300 mb-4">
            Kṛtidharśanam
          </p>
          <h1 className="text-4xl md:text-6xl font-serif font-bold text-white mb-6">
            Complete Collection Catalogues
          </h1>
          <p className="text-xl text-gray-200 max-w-2xl mx-auto">
            Discover our comprehensive range through detailed catalogues showcasing
            the finest in traditional craftsmanship
          </p>
        </div>
      </section>

      {/* Catalogues Grid */}
      <section className="py-16 bg-background">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-serif font-bold text-walnut-800 mb-4">
              Browse Our Collection Catalogues
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Each catalogue is thoughtfully curated to showcase our craftsmanship
              across different categories and styles
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {catalogues.map((catalogue) => (
              <CatalogueCard key={catalogue.id} catalogue={catalogue} />
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-walnut-50/30">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8 text-center">
            <div>
              <h3 className="text-3xl font-bold text-walnut-800 mb-2">6+</h3>
              <p className="text-muted-foreground">Collection Catalogues</p>
            </div>
            <div>
              <h3 className="text-3xl font-bold text-walnut-800 mb-2">159+</h3>
              <p className="text-muted-foreground">Unique Products</p>
            </div>
            <div>
              <h3 className="text-3xl font-bold text-walnut-800 mb-2">5</h3>
              <p className="text-muted-foreground">Product Categories</p>
            </div>
            <div>
              <h3 className="text-3xl font-bold text-walnut-800 mb-2">15+</h3>
              <p className="text-muted-foreground">Years of Craftsmanship</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-saffron-600 text-white text-center">
        <div className="container mx-auto px-4 max-w-2xl">
          <h2 className="text-4xl font-serif font-bold mb-6">
            Looking for a Custom Catalogue?
          </h2>
          <p className="text-lg mb-8">
            If you have a specific requirement or want a personalized catalogue,
            please get in touch with us.
          </p>
          <Button
            onClick={handleRequestCustomDesign}
            className="bg-walnut-800 hover:bg-walnut-900 text-white px-8 py-3 text-lg font-medium rounded-full transition-all duration-300"
          >
            Request Custom Catalogue
          </Button>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Portfolio;
