import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { MapPin, Clock, DollarSign } from "lucide-react";

const RideNotification = ({ onAccept, onDecline }) => {
  const [countdown, setCountdown] = useState(15);

  useEffect(() => {
    const timer = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          onDecline();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [onDecline]);

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <Card className="w-full max-w-sm bg-white">
        <CardContent className="p-6">
          <div className="text-center mb-4">
            <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-3">
              <MapPin className="w-8 h-8 text-white" />
            </div>
            <h2 className="text-xl font-bold mb-2">New Ride Request</h2>
            <p className="text-gray-600">Auto-declining in {countdown}s</p>
          </div>

          <div className="space-y-3 mb-6">
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
                <p className="text-sm text-gray-600">Destination</p>
              </div>
            </div>

            <div className="flex justify-between items-center pt-2 border-t">
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-gray-500" />
                <span className="text-sm text-gray-600">8 min away</span>
              </div>
              <div className="flex items-center gap-2">
                <DollarSign className="w-4 h-4 text-gray-500" />
                <span className="font-semibold">$12.50</span>
              </div>
            </div>
          </div>

          <div className="flex gap-3">
            <Button variant="outline" className="flex-1" onClick={onDecline}>
              Decline
            </Button>
            <Button
              className="flex-1 bg-green-500 hover:bg-green-600 text-white"
              onClick={onAccept}
            >
              Accept
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default RideNotification;
