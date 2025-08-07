
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Plus, Edit, Trash2 } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const CategorySeriesManagement = () => {
  const { toast } = useToast();
  
  const [categories, setCategories] = useState([
    { id: 1, name: 'Corporate', slug: 'corporate', description: 'Corporate gifting items', isActive: true },
    { id: 2, name: 'Custom', slug: 'custom', description: 'Customized giftings', isActive: true },
    { id: 3, name: 'Home', slug: 'home', description: 'Home decoration items', isActive: true },
    { id: 4, name: 'Personal', slug: 'personal', description: 'Personal gifting items', isActive: true },
    { id: 5, name: 'Spiritual', slug: 'spiritual', description: 'Spiritual and religious items', isActive: true },
  ]);

  const [series, setSeries] = useState([
    { id: 1, name: 'TakshaVerse', description: 'Premium corporate collection', isActive: true },
    { id: 2, name: 'Epoch Series', description: 'Timeless design collection', isActive: true },
    { id: 3, name: 'Ark Series', description: 'Home decoration series', isActive: true },
    { id: 4, name: 'Moments+', description: 'Personal moments collection', isActive: true },
    { id: 5, name: 'Spiritual Collection', description: 'Sacred and spiritual items', isActive: true },
  ]);

  const [newCategory, setNewCategory] = useState({ name: '', slug: '', description: '' });
  const [newSeries, setNewSeries] = useState({ name: '', description: '' });

  const handleAddCategory = () => {
    if (!newCategory.name || !newCategory.slug) {
      toast({
        title: "Error",
        description: "Please fill in name and slug.",
        variant: "destructive"
      });
      return;
    }

    const category = {
      id: Date.now(),
      ...newCategory,
      isActive: true
    };

    setCategories(prev => [...prev, category]);
    setNewCategory({ name: '', slug: '', description: '' });
    
    toast({
      title: "Category Added",
      description: "New category has been created successfully.",
    });
  };

  const handleAddSeries = () => {
    if (!newSeries.name) {
      toast({
        title: "Error",
        description: "Please fill in series name.",
        variant: "destructive"
      });
      return;
    }

    const seriesItem = {
      id: Date.now(),
      ...newSeries,
      isActive: true
    };

    setSeries(prev => [...prev, seriesItem]);
    setNewSeries({ name: '', description: '' });
    
    toast({
      title: "Series Added",
      description: "New series has been created successfully.",
    });
  };

  return (
    <div className="space-y-8">
      {/* Categories Management */}
      <div>
        <h3 className="text-xl font-semibold mb-4">Categories Management</h3>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Add New Category</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <label className="text-sm font-medium mb-2 block">Category Name</label>
                <Input
                  value={newCategory.name}
                  onChange={(e) => setNewCategory(prev => ({ ...prev, name: e.target.value }))}
                  placeholder="Enter category name"
                />
              </div>
              
              <div>
                <label className="text-sm font-medium mb-2 block">Category Slug</label>
                <Input
                  value={newCategory.slug}
                  onChange={(e) => setNewCategory(prev => ({ ...prev, slug: e.target.value.toLowerCase() }))}
                  placeholder="category-slug"
                />
              </div>
              
              <div>
                <label className="text-sm font-medium mb-2 block">Description</label>
                <Textarea
                  value={newCategory.description}
                  onChange={(e) => setNewCategory(prev => ({ ...prev, description: e.target.value }))}
                  placeholder="Category description..."
                  rows={3}
                />
              </div>
              
              <Button onClick={handleAddCategory} className="w-full">
                <Plus className="h-4 w-4 mr-2" />
                Add Category
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Existing Categories</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {categories.map((category) => (
                  <div key={category.id} className="flex items-center justify-between p-3 border rounded-lg">
                    <div>
                      <h4 className="font-semibold">{category.name}</h4>
                      <p className="text-sm text-muted-foreground">{category.description}</p>
                      <Badge variant={category.isActive ? "default" : "secondary"} className="mt-1">
                        {category.isActive ? "Active" : "Inactive"}
                      </Badge>
                    </div>
                    <div className="flex space-x-2">
                      <Button variant="outline" size="sm">
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button variant="outline" size="sm" className="text-red-600">
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Series Management */}
      <div>
        <h3 className="text-xl font-semibold mb-4">Series Management</h3>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Add New Series</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <label className="text-sm font-medium mb-2 block">Series Name</label>
                <Input
                  value={newSeries.name}
                  onChange={(e) => setNewSeries(prev => ({ ...prev, name: e.target.value }))}
                  placeholder="Enter series name"
                />
              </div>
              
              <div>
                <label className="text-sm font-medium mb-2 block">Description</label>
                <Textarea
                  value={newSeries.description}
                  onChange={(e) => setNewSeries(prev => ({ ...prev, description: e.target.value }))}
                  placeholder="Series description..."
                  rows={3}
                />
              </div>
              
              <Button onClick={handleAddSeries} className="w-full">
                <Plus className="h-4 w-4 mr-2" />
                Add Series
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Existing Series</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {series.map((seriesItem) => (
                  <div key={seriesItem.id} className="flex items-center justify-between p-3 border rounded-lg">
                    <div>
                      <h4 className="font-semibold">{seriesItem.name}</h4>
                      <p className="text-sm text-muted-foreground">{seriesItem.description}</p>
                      <Badge variant={seriesItem.isActive ? "default" : "secondary"} className="mt-1">
                        {seriesItem.isActive ? "Active" : "Inactive"}
                      </Badge>
                    </div>
                    <div className="flex space-x-2">
                      <Button variant="outline" size="sm">
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button variant="outline" size="sm" className="text-red-600">
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default CategorySeriesManagement;
