// components/product/ProductModal.tsx
import { motion, AnimatePresence } from 'framer-motion';
import { ShoppingBag, Eye, X } from 'lucide-react';
import { useCartStore } from '../../store/cartStore';
import ProductOptions from './ProductOptions';
import Product3DView from './Product3DView';
import Cloudnary from '../cloudnary/Cloudnary';
import { calculateTotalPrice } from '../../utils/calculateTotalPrice';
import { Product } from '../../types';
import { useState } from 'react';

interface ProductModalProps {
  product: Product | null;
  onClose: () => void;
  config: any;
  setConfig: (config: any) => void;
}

export default function ProductModal({ 
  product, 
  onClose,
  config,
  setConfig
}: ProductModalProps) {
  const addItem = useCartStore((state) => state.addItem);
  const [show3D, setShow3D] = useState(false);

  if (!product) return null;

  const totalPrice = calculateTotalPrice(product, config);

  const handleAddToCart = () => {
    addItem(product, config);
    onClose();
  };

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4"
        onClick={onClose}
      >
        <motion.div
          initial={{ scale: 0.9, y: 20 }}
          animate={{ scale: 1, y: 0 }}
          exit={{ scale: 0.9, y: 20 }}
          className="bg-white rounded-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="p-6">
            <div className="flex justify-between items-start mb-4">
              <h2 className="text-2xl font-bold">{product.name}</h2>
              <button 
                onClick={onClose}
                className="text-gray-500 hover:text-gray-700 p-1"
              >
                <X className="h-6 w-6" />
              </button>
            </div>
            
            <div className="grid md:grid-cols-2 gap-8">
              <div className="relative h-96 bg-gray-100 rounded-lg">
                {show3D ? (
                  <Product3DView />
                ) : (
                  <Cloudnary 
                    cldImg={product.image} 
                    format="auto" 
                    quality="auto" 
                    width={500} 
                    height={500}
                    // className="w-full h-full object-contain"
                  />
                )}
                <button
                  onClick={() => setShow3D(!show3D)}
                  className="absolute top-4 right-4 bg-white/90 p-2 rounded-lg shadow-lg hover:bg-white transition-colors"
                >
                  <Eye className="h-5 w-5 text-gray-700" />
                </button>
              </div>

              <div>
                <p className="text-gray-700 mb-6">{product.description}</p>
                
                <div className="mb-6">
                  <h3 className="font-semibold text-lg mb-2">Configuration</h3>
                  <ProductOptions 
                    config={config} 
                    onChange={setConfig} 
                    options={product.options}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div className="text-2xl font-bold text-green-600">
                    ${totalPrice.toFixed(2)}
                  </div>
                  <motion.button
                    onClick={handleAddToCart}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="bg-green-500 text-white px-6 py-2 rounded-lg hover:bg-green-600 
                             transition-colors flex items-center gap-2"
                  >
                    <ShoppingBag className="h-5 w-5" />
                    Add to Cart
                  </motion.button>
                </div>
              </div>
            </div>

            {product.specs && (
              <div className="mt-8 pt-6 border-t border-gray-200">
                <h3 className="font-semibold text-lg mb-4">Technical Specifications</h3>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  {Object.entries(product.specs.defaultSpecs).map(([key, value]) => (
                    <div key={key} className="bg-gray-50 p-3 rounded-lg">
                      <h4 className="text-sm font-medium text-gray-500 capitalize">{key}</h4>
                      <p className="font-medium">{value}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}