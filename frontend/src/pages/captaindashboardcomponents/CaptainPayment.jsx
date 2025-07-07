import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useNavigate } from "react-router-dom";
import { DollarSign, Star, MapPin, Clock } from "lucide-react";

const CaptainPayment = () => {
  const navigate = useNavigate();
  const [rating, setRating] = useState(0);
  const [fare] = useState(12.5);
  const [earnings] = useState(10.0);

  const handleComplete = () => {
    navigate("/captain-dashboard");
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-black text-white p-4">
        <div className="max-w-md mx-auto text-center">
          <h1 className="text-xl font-semibold">Trip Completed!</h1>
          <p className="text-sm text-gray-300">Payment received</p>
        </div>
      </header>

      <div className="max-w-md mx-auto p-4 space-y-4">
        {/* Earnings Summary */}
        <Card className="border-green-200 bg-green-50">
          <CardContent className="p-6 text-center">
            <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-4">
              <DollarSign className="w-8 h-8 text-white" />
            </div>
            <h2 className="text-2xl font-bold text-green-700 mb-2">
              +${earnings.toFixed(2)}
            </h2>
            <p className="text-green-600">Added to your earnings</p>
          </CardContent>
        </Card>

        {/* Trip Summary */}
        <Card>
          <CardHeader>
            <CardTitle>Trip Summary</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                <div className="flex-1">
                  <p className="font-medium">123 Main Street</p>
                  <p className="text-sm text-gray-600">Pickup location</p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                <div className="flex-1">
                  <p className="font-medium">456 Oak Avenue</p>
                  <p className="text-sm text-gray-600">Drop-off location</p>
                </div>
              </div>

              <div className="pt-3 border-t">
                <div className="flex justify-between items-center">
                  <div className="flex items-center gap-2">
                    <Clock className="w-4 h-4 text-gray-500" />
                    <span className="text-sm">12 minutes</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <MapPin className="w-4 h-4 text-gray-500" />
                    <span className="text-sm">2.3 miles</span>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Payment Breakdown */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <DollarSign className="w-5 h-5" />
              Payment Details
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-gray-600">Trip fare</span>
                <span>${fare.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Platform fee</span>
                <span>-${(fare - earnings).toFixed(2)}</span>
              </div>
              <div className="border-t pt-2 flex justify-between font-semibold">
                <span>Your earnings</span>
                <span className="text-green-600">${earnings.toFixed(2)}</span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Passenger Info */}
        <Card>
          <CardHeader>
            <CardTitle>Passenger</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-gray-300 rounded-full flex items-center justify-center">
                  <span className="font-medium">SJ</span>
                </div>
                <div>
                  <p className="font-semibold">Sarah Johnson</p>
                  <p className="text-sm text-gray-600">⭐ 4.8 rating</p>
                </div>
              </div>
            </div>

            <div>
              <p className="text-sm font-medium mb-2">Rate your passenger:</p>
              <div className="flex gap-1 mb-4">
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    key={star}
                    onClick={() => setRating(star)}
                    className="p-1"
                  >
                    <Star
                      className={`w-6 h-6 ${
                        star <= rating
                          ? "fill-yellow-400 text-yellow-400"
                          : "text-gray-300"
                      }`}
                    />
                  </button>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Action Buttons */}
        <div className="space-y-3">
          <Button
            onClick={handleComplete}
            className="w-full bg-black hover:bg-gray-800 text-white"
          >
            Continue Driving
          </Button>

          <Button
            variant="outline"
            className="w-full"
            onClick={() => navigate("/driver/dashboard")}
          >
            Go to Dashboard
          </Button>
        </div>
      </div>
    </div>
  );
};

export default CaptainPayment;
