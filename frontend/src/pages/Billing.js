import React, { useState, useEffect } from "react";
import api from "../services/api";
import Sidebar from "../components/Sidebar";

const Billing = () => {
  const [billingData, setBillingData] = useState({
    totalRequests: 0,
    billAmount: 0,
  });
  // const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBilling = async () => {
      try {
        
        const res = await api.get("/api/billing");

        const totalRequests = res.data.reduce((sum, item) => {
          return sum + item.totalRequests;
        }, 0);

        const totalBill = res.data.reduce((sum, item) => {
          return sum + item.bill;
        }, 0);

        setBillingData({
          totalRequests,
          billAmount: totalBill,
        });
      } catch (err) {
        console.error("Failed to fetch billing data");
      } finally {
        // setLoading(false);
      }
    };
    fetchBilling();
  }, []);

  return (
    <div className="bg-slate-50 min-h-screen">
      <Sidebar />
      <main className="ml-64 p-8">
        <header className="mb-8">
          <h1 className="text-2xl font-bold text-slate-800">
            Billing & Subscription
          </h1>
          <p className="text-slate-500">
            Manage your payment methods and view your usage-based invoices.
          </p>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
         
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-indigo-600 rounded-2xl p-8 text-white shadow-lg relative overflow-hidden">
              <div className="relative z-10">
                <h3 className="text-lg font-medium opacity-80">
                  Current Usage Total
                </h3>
                <div className="text-5xl font-bold mt-2">
                  ₹{billingData.billAmount}
                </div>
                <div className="mt-6 flex items-center gap-4">
                  <span className="bg-white/20 px-3 py-1 rounded-lg text-sm font-semibold">
                    Pro Plan
                  </span>
                  <span className="opacity-80 text-sm">
                    {billingData.totalRequests} requests tracked
                  </span>
                </div>
              </div>
             
              <div className="absolute -right-10 -bottom-10 w-40 h-40 bg-white/10 rounded-full blur-3xl"></div>
            </div>

            
            <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm">
              <h3 className="font-bold text-slate-800 mb-4">Payment Methods</h3>
              <div className="flex items-center justify-between p-4 border border-slate-100 rounded-xl bg-slate-50">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-8 bg-slate-800 rounded flex items-center justify-center text-white text-[10px] font-bold">
                    VISA
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-slate-700">
                      Visa ending in 4242
                    </p>
                    <p className="text-xs text-slate-500">Expires 12/28</p>
                  </div>
                </div>
                <button className="text-indigo-600 text-sm font-bold hover:underline">
                  Edit
                </button>
              </div>
            </div>
          </div>

        
          <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm h-fit">
            <h3 className="font-bold text-slate-800 mb-6">Price Breakdown</h3>
            <div className="space-y-4">
              <div className="flex justify-between text-sm">
                <span className="text-slate-500">First 10 Requests</span>
                <span className="text-green-600 font-medium">Free</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-slate-500">Over Limit (₹1/req)</span>
               
                <span className="text-slate-700 font-medium">
                  ₹{billingData.billAmount > 0 ? billingData.billAmount : 0}
                </span>
              </div>
              <hr className="border-slate-100" />
              <div className="flex justify-between font-bold text-lg text-slate-800 pt-2">
                <span>Total Due</span>
                <span>₹{billingData.billAmount}</span>
              </div>
              
              <button
                onClick={() => {
                  alert("Payment Successful ✅");
                  
                }}
                className="bg-slate-900 text-white py-3 rounded-xl w-full font-semibold hover:bg-black"
              >
                Pay Now
              </button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Billing;
