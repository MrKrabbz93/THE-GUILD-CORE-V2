import React, { useState } from 'react';
import { X, CreditCard, Lock, CheckCircle, Smartphone } from 'lucide-react';
import { Product } from '../types';

interface PaymentModalProps {
  product: Product;
  onClose: () => void;
}

export const PaymentModal: React.FC<PaymentModalProps> = ({ product, onClose }) => {
  const [method, setMethod] = useState<'card' | 'payid'>('card');
  const [processing, setProcessing] = useState(false);
  const [success, setSuccess] = useState(false);

  const handlePay = (e: React.FormEvent) => {
    e.preventDefault();
    setProcessing(true);
    // Simulate API call
    setTimeout(() => {
      setProcessing(false);
      setSuccess(true);
    }, 2000);
  };

  if (success) {
    return (
      <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 backdrop-blur-sm p-4">
        <div className="glass-panel w-full max-w-md p-8 rounded-2xl border-guild-success/50 text-center relative overflow-hidden">
          <div className="absolute inset-0 bg-guild-success/10 animate-pulse"></div>
          <CheckCircle size={64} className="mx-auto text-guild-success mb-6" />
          <h2 className="text-2xl font-bold text-white mb-2">Acquisition Complete</h2>
          <p className="text-slate-400 mb-6">License key for {product.name} has been transferred to your secure vault.</p>
          <button onClick={onClose} className="w-full py-3 bg-guild-success text-black font-bold rounded-lg hover:bg-emerald-400 transition-all">
            Initialize System
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 backdrop-blur-sm p-4">
      <div className="glass-panel w-full max-w-lg rounded-2xl flex flex-col relative animate-float">
        <button onClick={onClose} className="absolute top-4 right-4 text-slate-500 hover:text-white transition-colors">
          <X size={24} />
        </button>

        <div className="p-6 border-b border-guild-800">
          <h2 className="text-xl font-display font-bold text-white">Secure Checkout</h2>
          <p className="text-sm text-guild-accent mt-1">Acquiring: {product.name}</p>
          <div className="mt-4 flex items-baseline gap-1">
            <span className="text-3xl font-bold text-white">${product.price}</span>
            <span className="text-slate-500">/ lifetime license</span>
          </div>
        </div>

        <div className="p-6 flex-1">
          <div className="flex gap-4 mb-6">
            <button
              onClick={() => setMethod('card')}
              className={`flex-1 py-3 rounded-lg border flex items-center justify-center gap-2 transition-all ${method === 'card' ? 'bg-guild-accent/10 border-guild-accent text-guild-accent' : 'border-guild-800 text-slate-400 hover:bg-guild-800'}`}
            >
              <CreditCard size={18} /> Card
            </button>
            <button
              onClick={() => setMethod('payid')}
              className={`flex-1 py-3 rounded-lg border flex items-center justify-center gap-2 transition-all ${method === 'payid' ? 'bg-guild-purple/10 border-guild-purple text-guild-purple' : 'border-guild-800 text-slate-400 hover:bg-guild-800'}`}
            >
              <Smartphone size={18} /> PayID
            </button>
          </div>

          <form onSubmit={handlePay} className="space-y-4">
            {method === 'card' ? (
              <>
                <div>
                  <label className="block text-xs uppercase text-slate-500 mb-1">Card Number</label>
                  <input type="text" placeholder="0000 0000 0000 0000" className="w-full bg-guild-950 border border-guild-800 rounded-lg p-3 text-white focus:border-guild-accent outline-none font-mono" required />
                </div>
                <div className="flex gap-4">
                  <div className="flex-1">
                    <label className="block text-xs uppercase text-slate-500 mb-1">Expiry</label>
                    <input type="text" placeholder="MM/YY" className="w-full bg-guild-950 border border-guild-800 rounded-lg p-3 text-white focus:border-guild-accent outline-none font-mono" required />
                  </div>
                  <div className="flex-1">
                    <label className="block text-xs uppercase text-slate-500 mb-1">CVC</label>
                    <input type="text" placeholder="123" className="w-full bg-guild-950 border border-guild-800 rounded-lg p-3 text-white focus:border-guild-accent outline-none font-mono" required />
                  </div>
                </div>
              </>
            ) : (
              <div>
                <label className="block text-xs uppercase text-slate-500 mb-1">PayID / Osko Email</label>
                <div className="relative">
                  <Smartphone className="absolute left-3 top-3 text-guild-purple" size={18} />
                  <input type="email" placeholder="user@bank" className="w-full bg-guild-950 border border-guild-purple/50 rounded-lg p-3 pl-10 text-white focus:border-guild-purple outline-none font-mono" required />
                </div>
                <p className="text-xs text-slate-500 mt-2">Instant transfer secured by NPP.</p>
              </div>
            )}

            <button
              type="submit"
              disabled={processing}
              className={`w-full py-4 mt-4 rounded-lg font-bold text-black flex items-center justify-center gap-2 transition-all ${processing ? 'bg-slate-500 cursor-not-allowed' : 'bg-white hover:bg-gray-200'}`}
            >
              {processing ? (
                <>Processing Transaction...</>
              ) : (
                <>
                  <Lock size={16} /> Confirm Payment ${product.price}
                </>
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};