import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { useNavigate } from "react-router-dom";
import { Phone, MessageCircle, Star, Navigation } from "lucide-react";

const RidingPage = () => {
  const navigate = useNavigate();
  const [rideStatus, setRideStatus] = useState("on-the-way");
  const [showPayment, setShowPayment] = useState(false);
  const [rating, setRating] = useState(0);

  useEffect(() => {
    const timer1 = setTimeout(() => {
      setRideStatus("in-ride");
    }, 3000);

    const timer2 = setTimeout(() => {
      setRideStatus("completed");
      setShowPayment(true);
    }, 8000);

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
    };
  }, []);

  const handlePayment = () => {
    alert("Payment processed successfully!");
    navigate("/dashboard");
  };

  const handleRating = (stars) => {
    setRating(stars);
  };

  if (showPayment && rideStatus === "completed") {
    return (
      <div className="min-h-screen bg-white">
        <header className="bg-black text-white p-4">
          <div className="max-w-md mx-auto">
            <h1 className="text-xl font-semibold text-center">
              Ride Completed
            </h1>
          </div>
        </header>

        <div className="max-w-md mx-auto p-4 space-y-6">
          <div className="text-center py-8">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center">
                <span className="text-white text-xl">✓</span>
              </div>
            </div>
            <h2 className="text-2xl font-bold mb-2">You've arrived!</h2>
            <p className="text-gray-600">Hope you enjoyed your ride</p>
          </div>

          {/* Driver Rating */}
          <Card>
            <CardHeader>
              <CardTitle className="text-center">Rate your driver</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center gap-3 mb-4">
                <img
                  src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face"
                  alt="Driver"
                  className="w-12 h-12 rounded-full object-cover"
                />
                <div>
                  <p className="font-semibold">Michael R.</p>
                  <p className="text-sm text-gray-600">
                    Toyota Camry • ABC 123
                  </p>
                </div>
              </div>

              <div className="flex justify-center gap-2 mb-4">
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    key={star}
                    onClick={() => handleRating(star)}
                    className="p-1"
                  >
                    <Star
                      className={`w-8 h-8 ${
                        star <= rating
                          ? "fill-yellow-400 text-yellow-400"
                          : "text-gray-300"
                      }`}
                    />
                  </button>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Payment Summary */}
          <Card>
            <CardHeader>
              <CardTitle>Payment Summary</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-gray-600">Trip fare</span>
                  <span>$12.50</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Service fee</span>
                  <span>$2.50</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Taxes & tolls</span>
                  <span>$1.25</span>
                </div>
                {rating >= 4 && (
                  <div className="flex justify-between text-green-600">
                    <span>Tip (Good service)</span>
                    <span>$2.00</span>
                  </div>
                )}

                <Separator />

                <div className="flex justify-between font-semibold text-lg">
                  <span>Total</span>
                  <span>${rating >= 4 ? "18.25" : "16.25"}</span>
                </div>
              </div>

              <div className="mt-4 p-3 bg-gray-50 rounded-lg">
                <div className="flex items-center gap-2 text-sm">
                  <span>💳</span>
                  <span>Charged to •••• 4242</span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Actions */}
          <div className="space-y-3">
            <Button
              onClick={handlePayment}
              className="w-full bg-black hover:bg-gray-800 text-white py-3"
            >
              Complete Payment
            </Button>

            <Button
              variant="outline"
              onClick={() => navigate("/dashboard")}
              className="w-full"
            >
              Back to Dashboard
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="bg-black text-white p-4">
        <div className="max-w-md mx-auto">
          <h1 className="text-xl font-semibold text-center">
            {rideStatus === "on-the-way"
              ? "Driver is on the way"
              : "Enjoy your ride"}
          </h1>
        </div>
      </header>

      <div className="max-w-md mx-auto p-4 space-y-4">
        {/* Status Card */}
        <Card className="border-gray-200">
          <CardContent className="p-4">
            <div className="text-center">
              {rideStatus === "on-the-way" ? (
                <>
                  <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Navigation className="w-8 h-8 text-blue-600" />
                  </div>
                  <h2 className="text-lg font-semibold mb-2">
                    Driver is coming
                  </h2>
                  <p className="text-gray-600">Estimated arrival: 2 minutes</p>
                </>
              ) : (
                <>
                  <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <div className="w-8 h-8 bg-green-500 rounded-full animate-pulse"></div>
                  </div>
                  <h2 className="text-lg font-semibold mb-2">On your way</h2>
                  <p className="text-gray-600">Estimated arrival: 8 minutes</p>
                </>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Driver Info */}
        <Card className="border-gray-200">
          <CardContent className="p-4">
            <div className="flex items-center gap-3 mb-4">
              <img
                src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face"
                alt="Driver"
                className="w-12 h-12 rounded-full object-cover"
              />
              <div className="flex-1">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-semibold">Michael R.</p>
                    <p className="text-sm text-gray-600">
                      Toyota Camry • ABC 123
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-medium">4.8 ⭐</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Contact Buttons */}
            <div className="flex gap-2">
              <Button variant="outline" size="sm" className="flex-1">
                <Phone className="w-4 h-4 mr-2" />
                Call
              </Button>
              <Button variant="outline" size="sm" className="flex-1">
                <MessageCircle className="w-4 h-4 mr-2" />
                Message
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Trip Details */}
        <Card className="border-gray-200">
          <CardContent className="p-4">
            <div className="space-y-3">
              <div className="flex items-start gap-3">
                <div className="w-3 h-3 bg-green-500 rounded-full mt-1"></div>
                <div>
                  <p className="text-sm font-medium">123 Main Street</p>
                  <p className="text-xs text-gray-600">Pickup location</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-3 h-3 bg-red-500 rounded-full mt-1"></div>
                <div>
                  <p className="text-sm font-medium">456 Oak Avenue</p>
                  <p className="text-xs text-gray-600">Destination</p>
                </div>
              </div>
            </div>

            <Separator className="my-4" />

            <div className="flex justify-between text-sm">
              <span className="text-gray-600">RideGo • 2.3 mi</span>
              <span className="font-semibold">$16.25 total</span>
            </div>
          </CardContent>
        </Card>

        {/* Emergency Button */}
        <Button
          variant="outline"
          className="w-full border-red-200 text-red-600 hover:bg-red-50"
        >
          Emergency Help
        </Button>
      </div>
    </div>
  );
};

export default RidingPage;
