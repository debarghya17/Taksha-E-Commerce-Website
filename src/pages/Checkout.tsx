import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useCart } from '@/contexts/CartContext';
import { useAuth } from '@/contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import { useToast } from '@/hooks/use-toast';
import Navigation from '@/components/Navigation';
import { Address } from '@/components/UserProfile';
import { MapPin } from 'lucide-react';

const Checkout = () => {
  const [step, setStep] = useState(1);
  const [savedAddresses, setSavedAddresses] = useState<Address[]>([]);
  const [selectedAddressId, setSelectedAddressId] = useState<string>('');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    pincode: '',
    paymentMethod: 'card'
  });
  const { items, getTotalPrice, clearCart } = useCart();
  const { user } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    if (!user) {
      toast({
        title: "Login Required",
        description: "Please login to proceed with checkout.",
        duration: 3000,
      });
      navigate('/auth?redirect=checkout');
    }
  }, [user, navigate, toast]);

  // Load saved addresses
  useEffect(() => {
    if (user) {
      const savedAddresses = localStorage.getItem(`addresses_${user.id}`);
      if (savedAddresses) {
        const addresses = JSON.parse(savedAddresses);
        setSavedAddresses(addresses);

        // Pre-select default address if available
        const defaultAddress = addresses.find((addr: Address) => addr.isDefault);
        if (defaultAddress) {
          setSelectedAddressId(defaultAddress.id);
          fillFormWithAddress(defaultAddress);
        }
      }
    }
  }, [user]);

  const fillFormWithAddress = (address: Address) => {
    setFormData(prev => ({
      ...prev,
      name: address.name,
      phone: address.phone,
      address: `${address.addressLine1}${address.addressLine2 ? ', ' + address.addressLine2 : ''}`,
      city: address.city,
      pincode: address.pincode,
      email: prev.email || user?.email || ''
    }));
  };

  const handleAddressSelect = (address: Address) => {
    setSelectedAddressId(address.id);
    fillFormWithAddress(address);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
    // Clear selected address if user manually edits the form
    if (['name', 'phone', 'address', 'city', 'pincode'].includes(e.target.name)) {
      setSelectedAddressId('');
    }
  };

  const handlePlaceOrder = () => {
    // Mock order placement
    toast({
      title: "Order placed successfully!",
      description: `Your order of ₹${getTotalPrice().toLocaleString()} has been confirmed.`,
    });
    clearCart();
    navigate('/');
  };

  if (items.length === 0) {
    return (
      <div className="min-h-screen">
        <Navigation />
        <div className="container mx-auto px-4 py-16 text-center">
          <h1 className="text-2xl font-serif font-bold mb-4">Your cart is empty</h1>
          <Button onClick={() => navigate('/shop')}>Continue Shopping</Button>
        </div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="min-h-screen">
        <Navigation />
        <div className="container mx-auto px-4 py-16 text-center">
          <h1 className="text-2xl font-serif font-bold mb-4">Redirecting to login...</h1>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-walnut-50/30">
      <Navigation />

      <div className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl font-serif font-bold text-walnut-800 mb-8">Checkout</h1>

          {/* Progress Bar */}
          <div className="flex items-center justify-between mb-8">
            {[1, 2, 3].map((stepNum) => (
              <div key={stepNum} className="flex items-center">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center ${step >= stepNum ? 'bg-saffron-600 text-white' : 'bg-gray-200'
                  }`}>
                  {stepNum}
                </div>
                {stepNum < 3 && <div className="w-16 h-1 bg-gray-200 mx-2"></div>}
              </div>
            ))}
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              {step === 1 && (
                <Card>
                  <CardHeader>
                    <CardTitle>Delivery Information</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {/* Saved Addresses */}
                    {savedAddresses.length > 0 && (
                      <div className="space-y-3">
                        <Label className="text-sm font-medium">Choose from saved addresses</Label>
                        <div className="grid gap-2 max-h-48 overflow-y-auto">
                          {savedAddresses.map((address) => (
                            <div
                              key={address.id}
                              className={`p-3 border rounded-lg cursor-pointer transition-colors ${selectedAddressId === address.id
                                  ? 'border-saffron-600 bg-saffron-50'
                                  : 'border-gray-200 hover:border-gray-300'
                                }`}
                              onClick={() => handleAddressSelect(address)}
                            >
                              <div className="flex items-start justify-between">
                                <div className="flex items-start space-x-2">
                                  <MapPin className="h-4 w-4 mt-0.5 text-gray-500" />
                                  <div>
                                    <p className="text-sm font-medium">{address.name}</p>
                                    <p className="text-xs text-gray-600">{address.phone}</p>
                                    <p className="text-xs text-gray-600">
                                      {address.addressLine1}
                                      {address.addressLine2 && `, ${address.addressLine2}`}
                                    </p>
                                    <p className="text-xs text-gray-600">
                                      {address.city}, {address.state} - {address.pincode}
                                    </p>
                                  </div>
                                </div>
                                {address.isDefault && (
                                  <span className="text-xs bg-saffron-600 text-white px-2 py-1 rounded">
                                    Default
                                  </span>
                                )}
                              </div>
                            </div>
                          ))}
                        </div>
                        <div className="relative">
                          <div className="absolute inset-0 flex items-center">
                            <span className="w-full border-t" />
                          </div>
                          <div className="relative flex justify-center text-xs uppercase">
                            <span className="bg-background px-2 text-muted-foreground">
                              Or enter manually
                            </span>
                          </div>
                        </div>
                      </div>
                    )}

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="name">Full Name</Label>
                        <Input
                          id="name"
                          name="name"
                          value={formData.name}
                          onChange={handleInputChange}
                          placeholder="Enter your name"
                        />
                      </div>
                      <div>
                        <Label htmlFor="email">Email</Label>
                        <Input
                          id="email"
                          name="email"
                          type="email"
                          value={formData.email}
                          onChange={handleInputChange}
                          placeholder="Enter your email"
                        />
                      </div>
                    </div>
                    <div>
                      <Label htmlFor="phone">Phone Number</Label>
                      <Input
                        id="phone"
                        name="phone"
                        value={formData.phone}
                        onChange={handleInputChange}
                        placeholder="Enter your phone number"
                      />
                    </div>
                    <div>
                      <Label htmlFor="address">Address</Label>
                      <Input
                        id="address"
                        name="address"
                        value={formData.address}
                        onChange={handleInputChange}
                        placeholder="Enter your address"
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="city">City</Label>
                        <Input
                          id="city"
                          name="city"
                          value={formData.city}
                          onChange={handleInputChange}
                          placeholder="Enter your city"
                        />
                      </div>
                      <div>
                        <Label htmlFor="pincode">Pincode</Label>
                        <Input
                          id="pincode"
                          name="pincode"
                          value={formData.pincode}
                          onChange={handleInputChange}
                          placeholder="Enter pincode"
                        />
                      </div>
                    </div>
                    <Button
                      className="w-full bg-saffron-600 hover:bg-saffron-700"
                      onClick={() => setStep(2)}
                    >
                      Continue to Payment
                    </Button>
                  </CardContent>
                </Card>
              )}

              {step === 2 && (
                <Card>
                  <CardHeader>
                    <CardTitle>Payment Method</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-3">
                      <div className="flex items-center space-x-2">
                        <input
                          type="radio"
                          id="card"
                          name="paymentMethod"
                          value="card"
                          checked={formData.paymentMethod === 'card'}
                          onChange={handleInputChange}
                        />
                        <Label htmlFor="card">Credit/Debit Card</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <input
                          type="radio"
                          id="upi"
                          name="paymentMethod"
                          value="upi"
                          checked={formData.paymentMethod === 'upi'}
                          onChange={handleInputChange}
                        />
                        <Label htmlFor="upi">UPI</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <input
                          type="radio"
                          id="cod"
                          name="paymentMethod"
                          value="cod"
                          checked={formData.paymentMethod === 'cod'}
                          onChange={handleInputChange}
                        />
                        <Label htmlFor="cod">Cash on Delivery</Label>
                      </div>
                    </div>
                    <div className="flex gap-4">
                      <Button variant="outline" onClick={() => setStep(1)}>
                        Back
                      </Button>
                      <Button
                        className="flex-1 bg-saffron-600 hover:bg-saffron-700"
                        onClick={() => setStep(3)}
                      >
                        Review Order
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              )}

              {step === 3 && (
                <Card>
                  <CardHeader>
                    <CardTitle>Order Review</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-2">
                      <h3 className="font-semibold">Delivery Address</h3>
                      <p className="text-sm text-muted-foreground">
                        {formData.name}<br />
                        {formData.address}<br />
                        {formData.city}, {formData.pincode}<br />
                        {formData.phone}
                      </p>
                    </div>
                    <div className="space-y-2">
                      <h3 className="font-semibold">Payment Method</h3>
                      <p className="text-sm text-muted-foreground">
                        {formData.paymentMethod === 'card' && 'Credit/Debit Card'}
                        {formData.paymentMethod === 'upi' && 'UPI'}
                        {formData.paymentMethod === 'cod' && 'Cash on Delivery'}
                      </p>
                    </div>
                    <div className="flex gap-4">
                      <Button variant="outline" onClick={() => setStep(2)}>
                        Back
                      </Button>
                      <Button
                        className="flex-1 bg-saffron-600 hover:bg-saffron-700"
                        onClick={handlePlaceOrder}
                      >
                        Place Order
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              )}
            </div>

            {/* Order Summary */}
            <div>
              <Card>
                <CardHeader>
                  <CardTitle>Order Summary</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {items.map((item) => (
                    <div key={item.id} className="flex items-center space-x-3">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-12 h-12 object-cover rounded"
                      />
                      <div className="flex-1">
                        <p className="text-sm font-medium">{item.name}</p>
                        <p className="text-xs text-muted-foreground">Qty: {item.quantity}</p>
                      </div>
                      <p className="text-sm font-semibold">₹{(item.price * item.quantity).toLocaleString()}</p>
                    </div>
                  ))}
                  <div className="border-t pt-4">
                    <div className="flex justify-between text-lg font-semibold">
                      <span>Total</span>
                      <span>₹{getTotalPrice().toLocaleString()}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
