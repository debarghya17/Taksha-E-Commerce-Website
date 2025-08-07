import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
    Package,
    Users,
    ShoppingCart,
    DollarSign,
    TrendingUp,
    Plus,
    Edit,
    Trash2,
    Eye,
    Heart,
    Star,
    BarChart3,
    Filter,
    Search,
    Layout,
    Tag,
    BookOpen,
    Home,
    Image
} from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import BannerManagement from '@/components/admin/BannerManagement';
import CategorySeriesManagement from '@/components/admin/CategorySeriesManagement';
import BlogManagement from '@/components/admin/BlogManagement';
import HomepageContentManagement from '@/components/admin/HomepageContentManagement';

const AdminDashboard = () => {
    const { toast } = useToast();
    const [newProduct, setNewProduct] = useState({
        name: '',
        category: 'corporate',
        series: 'TakshaVerse',
        price: '',
        originalPrice: '',
        image: '',
        description: '',
        features: '',
        isNew: false,
        isLimited: false
    });

    // Mock data for dashboard
    const dashboardStats = [
        { title: 'Total Products', value: '156', icon: Package, trend: '+12%' },
        { title: 'Total Orders', value: '2,847', icon: ShoppingCart, trend: '+23%' },
        { title: 'Total Revenue', value: '₹4,52,890', icon: DollarSign, trend: '+18%' },
        { title: 'Active Users', value: '1,249', icon: Users, trend: '+8%' },
    ];

    const recentOrders = [
        { id: 'ORD-001', customer: 'Rahul Sharma', product: 'Executive Desk Set', amount: '₹8,999', status: 'Delivered' },
        { id: 'ORD-002', customer: 'Priya Patel', product: 'Mandala Wall Art', amount: '₹3,299', status: 'Processing' },
        { id: 'ORD-003', customer: 'Amit Kumar', product: 'Festival Gift Set', amount: '₹1,599', status: 'Shipped' },
        { id: 'ORD-004', customer: 'Sneha Gupta', product: 'Tulsi Mala', amount: '₹599', status: 'Pending' },
    ];

    const topProducts = [
        { name: 'Executive Desk Set', sales: 87, revenue: '₹7,82,130' },
        { name: 'Mandala Wall Art', sales: 64, revenue: '₹2,11,136' },
        { name: 'Festival Gift Set', sales: 53, revenue: '₹84,747' },
        { name: 'Tulsi Mala', sales: 91, revenue: '₹54,509' },
    ];

    const handleAddProduct = () => {
        if (!newProduct.name || !newProduct.price || !newProduct.image) {
            toast({
                title: "Error",
                description: "Please fill in all required fields.",
                variant: "destructive"
            });
            return;
        }

        // Simulate adding product
        toast({
            title: "Product Added",
            description: `${newProduct.name} has been added successfully.`,
        });

        // Reset form
        setNewProduct({
            name: '',
            category: 'corporate',
            series: 'TakshaVerse',
            price: '',
            originalPrice: '',
            image: '',
            description: '',
            features: '',
            isNew: false,
            isLimited: false
        });
    };

    const getStatusColor = (status: string) => {
        switch (status) {
            case 'Delivered': return 'bg-green-100 text-green-800';
            case 'Processing': return 'bg-blue-100 text-blue-800';
            case 'Shipped': return 'bg-purple-100 text-purple-800';
            case 'Pending': return 'bg-yellow-100 text-yellow-800';
            default: return 'bg-gray-100 text-gray-800';
        }
    };

    return (
        <div className="min-h-screen bg-gray-50 p-4 md:p-6">
            <div className="max-w-7xl mx-auto">
                <div className="mb-8">
                    <h1 className="text-2xl md:text-3xl font-serif font-bold text-walnut-800 mb-2">
                        Admin Dashboard
                    </h1>
                    <p className="text-muted-foreground">
                        Manage your Taksha products, orders, content, and business insights
                    </p>
                </div>

                {/* Dashboard Stats */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 mb-8">
                    {dashboardStats.map((stat, index) => (
                        <Card key={index} className="relative overflow-hidden">
                            <CardContent className="p-4 md:p-6">
                                <div className="flex items-center justify-between">
                                    <div>
                                        <p className="text-sm font-medium text-muted-foreground mb-1">
                                            {stat.title}
                                        </p>
                                        <p className="text-xl md:text-2xl font-bold text-walnut-800">
                                            {stat.value}
                                        </p>
                                        <div className="flex items-center mt-2">
                                            <TrendingUp className="h-3 w-3 text-green-600 mr-1" />
                                            <span className="text-xs text-green-600 font-medium">
                                                {stat.trend}
                                            </span>
                                        </div>
                                    </div>
                                    <div className="p-3 bg-saffron-100 rounded-full">
                                        <stat.icon className="h-5 w-5 md:h-6 md:w-6 text-saffron-600" />
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    ))}
                </div>

                <Tabs defaultValue="products" className="space-y-6">
                    <TabsList className="grid w-full grid-cols-2 md:grid-cols-4 lg:grid-cols-8 h-auto">
                        <TabsTrigger value="products" className="text-xs md:text-sm px-2 md:px-4 py-2">
                            <Package className="h-4 w-4 mr-1" />
                            Products
                        </TabsTrigger>
                        <TabsTrigger value="orders" className="text-xs md:text-sm px-2 md:px-4 py-2">
                            <ShoppingCart className="h-4 w-4 mr-1" />
                            Orders
                        </TabsTrigger>
                        <TabsTrigger value="analytics" className="text-xs md:text-sm px-2 md:px-4 py-2">
                            <BarChart3 className="h-4 w-4 mr-1" />
                            Analytics
                        </TabsTrigger>
                        <TabsTrigger value="add-product" className="text-xs md:text-sm px-2 md:px-4 py-2">
                            <Plus className="h-4 w-4 mr-1" />
                            Add Product
                        </TabsTrigger>
                        <TabsTrigger value="banners" className="text-xs md:text-sm px-2 md:px-4 py-2">
                            <Layout className="h-4 w-4 mr-1" />
                            Banners
                        </TabsTrigger>
                        <TabsTrigger value="categories" className="text-xs md:text-sm px-2 md:px-4 py-2">
                            <Tag className="h-4 w-4 mr-1" />
                            Categories
                        </TabsTrigger>
                        <TabsTrigger value="blogs" className="text-xs md:text-sm px-2 md:px-4 py-2">
                            <BookOpen className="h-4 w-4 mr-1" />
                            Blogs
                        </TabsTrigger>
                        <TabsTrigger value="homepage" className="text-xs md:text-sm px-2 md:px-4 py-2">
                            <Home className="h-4 w-4 mr-1" />
                            Homepage
                        </TabsTrigger>
                    </TabsList>

                    {/* Products Tab */}
                    <TabsContent value="products">
                        <Card>
                            <CardHeader>
                                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                                    <CardTitle>Product Management</CardTitle>
                                    <div className="flex flex-col sm:flex-row gap-2">
                                        <div className="relative">
                                            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                                            <Input placeholder="Search products..." className="pl-10 w-full sm:w-auto" />
                                        </div>
                                        <Button variant="outline" size="sm">
                                            <Filter className="h-4 w-4 mr-2" />
                                            Filter
                                        </Button>
                                    </div>
                                </div>
                            </CardHeader>
                            <CardContent>
                                <div className="space-y-4">
                                    {/* Sample products list */}
                                    <div className="grid gap-4">
                                        {[1, 2, 3, 4].map((item) => (
                                            <div key={item} className="flex flex-col md:flex-row items-start md:items-center justify-between p-4 border rounded-lg hover:bg-gray-50 transition-colors">
                                                <div className="flex items-start space-x-4 mb-4 md:mb-0">
                                                    <div className="w-16 h-16 bg-gray-200 rounded-lg flex-shrink-0"></div>
                                                    <div>
                                                        <h3 className="font-semibold text-walnut-800">Executive Desk Set {item}</h3>
                                                        <p className="text-sm text-muted-foreground">TakshaVerse • Corporate</p>
                                                        <div className="flex items-center space-x-4 mt-2">
                                                            <span className="text-sm font-medium">₹8,999</span>
                                                            <Badge variant="secondary">In Stock</Badge>
                                                            <div className="flex items-center space-x-1">
                                                                <Star className="h-3 w-3 fill-saffron-400 text-saffron-400" />
                                                                <span className="text-xs">4.8</span>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="flex space-x-2 w-full md:w-auto">
                                                    <Button variant="outline" size="sm">
                                                        <Eye className="h-4 w-4" />
                                                    </Button>
                                                    <Button variant="outline" size="sm">
                                                        <Edit className="h-4 w-4" />
                                                    </Button>
                                                    <Button variant="outline" size="sm" className="text-red-600 hover:text-red-700">
                                                        <Trash2 className="h-4 w-4" />
                                                    </Button>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    </TabsContent>

                    {/* Orders Tab */}
                    <TabsContent value="orders">
                        <Card>
                            <CardHeader>
                                <CardTitle>Recent Orders</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div className="overflow-x-auto">
                                    <table className="w-full">
                                        <thead>
                                            <tr className="border-b">
                                                <th className="text-left p-2 text-sm font-medium">Order ID</th>
                                                <th className="text-left p-2 text-sm font-medium">Customer</th>
                                                <th className="text-left p-2 text-sm font-medium hidden md:table-cell">Product</th>
                                                <th className="text-left p-2 text-sm font-medium">Amount</th>
                                                <th className="text-left p-2 text-sm font-medium">Status</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {recentOrders.map((order) => (
                                                <tr key={order.id} className="border-b hover:bg-gray-50">
                                                    <td className="p-2 text-sm font-medium">{order.id}</td>
                                                    <td className="p-2 text-sm">{order.customer}</td>
                                                    <td className="p-2 text-sm hidden md:table-cell">{order.product}</td>
                                                    <td className="p-2 text-sm font-medium">{order.amount}</td>
                                                    <td className="p-2">
                                                        <Badge className={getStatusColor(order.status)}>
                                                            {order.status}
                                                        </Badge>
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            </CardContent>
                        </Card>
                    </TabsContent>

                    {/* Analytics Tab */}
                    <TabsContent value="analytics">
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                            <Card>
                                <CardHeader>
                                    <CardTitle className="flex items-center">
                                        <BarChart3 className="h-5 w-5 mr-2" />
                                        Top Performing Products
                                    </CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <div className="space-y-4">
                                        {topProducts.map((product, index) => (
                                            <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                                                <div>
                                                    <p className="font-medium text-sm">{product.name}</p>
                                                    <p className="text-xs text-muted-foreground">{product.sales} sales</p>
                                                </div>
                                                <div className="text-right">
                                                    <p className="font-semibold text-sm">{product.revenue}</p>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </CardContent>
                            </Card>

                            <Card>
                                <CardHeader>
                                    <CardTitle>Sales Analytics</CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <div className="space-y-4">
                                        <div className="p-4 bg-gradient-to-r from-saffron-50 to-orange-50 rounded-lg">
                                            <h3 className="font-semibold text-walnut-800 mb-2">Monthly Revenue</h3>
                                            <p className="text-2xl font-bold text-saffron-600">₹4,52,890</p>
                                            <p className="text-sm text-green-600">+18% from last month</p>
                                        </div>
                                        <div className="p-4 bg-gradient-to-r from-walnut-50 to-mahogany-50 rounded-lg">
                                            <h3 className="font-semibold text-walnut-800 mb-2">Orders This Month</h3>
                                            <p className="text-2xl font-bold text-walnut-600">147</p>
                                            <p className="text-sm text-green-600">+23% from last month</p>
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>
                        </div>
                    </TabsContent>

                    {/* Add Product Tab */}
                    <TabsContent value="add-product">
                        <Card>
                            <CardHeader>
                                <CardTitle>Add New Product</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
                                    <div className="space-y-4">
                                        <div>
                                            <label className="text-sm font-medium mb-2 block">Product Name *</label>
                                            <Input
                                                value={newProduct.name}
                                                onChange={(e) => setNewProduct(prev => ({ ...prev, name: e.target.value }))}
                                                placeholder="Enter product name"
                                            />
                                        </div>

                                        <div className="grid grid-cols-2 gap-4">
                                            <div>
                                                <label className="text-sm font-medium mb-2 block">Category</label>
                                                <select
                                                    value={newProduct.category}
                                                    onChange={(e) => setNewProduct(prev => ({ ...prev, category: e.target.value }))}
                                                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-saffron-500 text-sm"
                                                >
                                                    <option value="corporate">Corporate</option>
                                                    <option value="custom">Custom</option>
                                                    <option value="home">Home</option>
                                                    <option value="personal">Personal</option>
                                                    <option value="spiritual">Spiritual</option>
                                                </select>
                                            </div>

                                            <div>
                                                <label className="text-sm font-medium mb-2 block">Series</label>
                                                <select
                                                    value={newProduct.series}
                                                    onChange={(e) => setNewProduct(prev => ({ ...prev, series: e.target.value }))}
                                                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-saffron-500 text-sm"
                                                >
                                                    <option value="TakshaVerse">TakshaVerse</option>
                                                    <option value="Epoch Series">Epoch Series</option>
                                                    <option value="Ark Series">Ark Series</option>
                                                    <option value="Moments+">Moments+</option>
                                                    <option value="Spiritual Collection">Spiritual Collection</option>
                                                </select>
                                            </div>
                                        </div>

                                        <div className="grid grid-cols-2 gap-4">
                                            <div>
                                                <label className="text-sm font-medium mb-2 block">Price *</label>
                                                <Input
                                                    type="number"
                                                    value={newProduct.price}
                                                    onChange={(e) => setNewProduct(prev => ({ ...prev, price: e.target.value }))}
                                                    placeholder="0"
                                                />
                                            </div>

                                            <div>
                                                <label className="text-sm font-medium mb-2 block">Original Price</label>
                                                <Input
                                                    type="number"
                                                    value={newProduct.originalPrice}
                                                    onChange={(e) => setNewProduct(prev => ({ ...prev, originalPrice: e.target.value }))}
                                                    placeholder="0"
                                                />
                                            </div>
                                        </div>

                                        <div>
                                            <label className="text-sm font-medium mb-2 block">Image URL *</label>
                                            <Input
                                                value={newProduct.image}
                                                onChange={(e) => setNewProduct(prev => ({ ...prev, image: e.target.value }))}
                                                placeholder="https://..."
                                            />
                                        </div>
                                    </div>

                                    <div className="space-y-4">
                                        <div>
                                            <label className="text-sm font-medium mb-2 block">Description</label>
                                            <Textarea
                                                value={newProduct.description}
                                                onChange={(e) => setNewProduct(prev => ({ ...prev, description: e.target.value }))}
                                                placeholder="Product description..."
                                                rows={4}
                                            />
                                        </div>

                                        <div>
                                            <label className="text-sm font-medium mb-2 block">Features (comma separated)</label>
                                            <Textarea
                                                value={newProduct.features}
                                                onChange={(e) => setNewProduct(prev => ({ ...prev, features: e.target.value }))}
                                                placeholder="Feature 1, Feature 2, Feature 3..."
                                                rows={3}
                                            />
                                        </div>

                                        <div className="space-y-3">
                                            <div className="flex items-center space-x-2">
                                                <input
                                                    type="checkbox"
                                                    id="isNew"
                                                    checked={newProduct.isNew}
                                                    onChange={(e) => setNewProduct(prev => ({ ...prev, isNew: e.target.checked }))}
                                                    className="rounded border-gray-300 text-saffron-600 focus:ring-saffron-500"
                                                />
                                                <label htmlFor="isNew" className="text-sm font-medium">Mark as New Product</label>
                                            </div>

                                            <div className="flex items-center space-x-2">
                                                <input
                                                    type="checkbox"
                                                    id="isLimited"
                                                    checked={newProduct.isLimited}
                                                    onChange={(e) => setNewProduct(prev => ({ ...prev, isLimited: e.target.checked }))}
                                                    className="rounded border-gray-300 text-saffron-600 focus:ring-saffron-500"
                                                />
                                                <label htmlFor="isLimited" className="text-sm font-medium">Limited Edition</label>
                                            </div>
                                        </div>

                                        <Button
                                            onClick={handleAddProduct}
                                            className="w-full bg-saffron-600 hover:bg-saffron-700 text-white"
                                        >
                                            <Plus className="h-4 w-4 mr-2" />
                                            Add Product
                                        </Button>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    </TabsContent>

                    {/* New Tabs */}
                    <TabsContent value="banners">
                        <BannerManagement />
                    </TabsContent>

                    <TabsContent value="categories">
                        <CategorySeriesManagement />
                    </TabsContent>

                    <TabsContent value="blogs">
                        <BlogManagement />
                    </TabsContent>

                    <TabsContent value="homepage">
                        <HomepageContentManagement />
                    </TabsContent>
                </Tabs>
            </div>
        </div>
    );
};

export default AdminDashboard;
