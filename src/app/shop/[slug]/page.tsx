"use client";

import { useState, useEffect, use } from "react";
import Link from "next/link";
import { useCart } from "@/context/CartContext";
import {
  ArrowLeft, Star, ShoppingCart, CheckCircle2, Tag, Shield,
  Truck, RotateCcw, Package,
} from "lucide-react";
import { formatPrice } from "@/lib/utils";

interface Product {
  id: string;
  name: string;
  slug: string;
  description: string;
  price: number;
  salePrice: number | null;
  category: string;
  images: string[];
  inStock: boolean;
  stockCount: number;
  rating: number;
  features: string[];
}

export default function ProductDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = use(params);
  const { addItem } = useCart();
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [added, setAdded] = useState(false);

  useEffect(() => {
    fetch(`/api/products/${slug}`)
      .then((r) => r.json())
      .then((data) => setProduct(data.product))
      .catch(console.error)
      .finally(() => setLoading(false));
  }, [slug]);

  const handleAdd = () => {
    if (!product) return;
    addItem({
      id: product.id,
      name: product.name,
      price: product.price,
      salePrice: product.salePrice,
      image: product.images[0] || "",
      slug: product.slug,
    });
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="w-10 h-10 border-3 border-primary/30 border-t-primary rounded-full animate-spin" />
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-2">Product not found</h2>
          <Link href="/shop" className="btn btn-primary mt-4">Browse Shop</Link>
        </div>
      </div>
    );
  }

  const discount = product.salePrice
    ? Math.round(((product.price - product.salePrice) / product.price) * 100)
    : 0;

  return (
    <div className="min-h-screen bg-background">
      <div className="container-custom py-8">
        <Link href="/shop" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary mb-6">
          <ArrowLeft className="w-4 h-4" /> Back to Shop
        </Link>

        <div className="grid lg:grid-cols-2 gap-10">
          {/* Image */}
          <div className="bg-gradient-to-br from-primary/10 to-accent/10 rounded-3xl aspect-square flex items-center justify-center relative overflow-hidden">
            <Package className="w-32 h-32 text-primary/20" />
            {product.salePrice && (
              <div className="absolute top-4 left-4">
                <span className="badge badge-destructive text-sm flex items-center gap-1 px-3 py-1.5">
                  <Tag className="w-3.5 h-3.5" /> {discount}% OFF
                </span>
              </div>
            )}
          </div>

          {/* Details */}
          <div className="space-y-6">
            <div>
              <span className="badge badge-primary mb-3 inline-block">
                {product.category.replace("_", " ")}
              </span>
              <h1 className="text-3xl font-bold mb-3">{product.name}</h1>
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-1">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star
                      key={i}
                      className={`w-5 h-5 ${i < Math.round(product.rating) ? "fill-amber-400 text-amber-400" : "text-gray-200"}`}
                    />
                  ))}
                  <span className="ml-1 text-sm font-medium">{product.rating.toFixed(1)}</span>
                </div>
                <span className={`text-sm font-medium ${product.inStock ? "text-green-600" : "text-red-500"}`}>
                  {product.inStock ? `In Stock (${product.stockCount})` : "Out of Stock"}
                </span>
              </div>
            </div>

            {/* Price */}
            <div className="flex items-center gap-4">
              {product.salePrice ? (
                <>
                  <span className="text-4xl font-bold text-primary">{formatPrice(product.salePrice)}</span>
                  <span className="text-xl text-muted-foreground line-through">{formatPrice(product.price)}</span>
                  <span className="badge badge-success">Save {formatPrice(product.price - product.salePrice)}</span>
                </>
              ) : (
                <span className="text-4xl font-bold text-primary">{formatPrice(product.price)}</span>
              )}
            </div>

            {/* Description */}
            <div>
              <h3 className="font-semibold mb-2">Description</h3>
              <p className="text-muted-foreground leading-relaxed">{product.description}</p>
            </div>

            {/* Features */}
            {product.features.length > 0 && (
              <div>
                <h3 className="font-semibold mb-3">Key Features</h3>
                <div className="space-y-2">
                  {product.features.map((f) => (
                    <div key={f} className="flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-primary flex-shrink-0" />
                      <span className="text-sm">{f}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Add to Cart */}
            <div className="flex gap-3">
              <button
                onClick={handleAdd}
                disabled={!product.inStock}
                className={`btn btn-lg flex-1 ${added ? "bg-green-500 text-white hover:bg-green-600" : "btn-primary"}`}
              >
                {added ? (
                  <>
                    <CheckCircle2 className="w-5 h-5" /> Added to Cart
                  </>
                ) : (
                  <>
                    <ShoppingCart className="w-5 h-5" /> Add to Cart
                  </>
                )}
              </button>
              <Link href="/shop/cart" className="btn btn-outline btn-lg">
                View Cart
              </Link>
            </div>

            {/* Trust Badges */}
            <div className="grid grid-cols-3 gap-4 pt-4 border-t border-border">
              {[
                { icon: Truck, label: "Free Delivery", sub: "Across Ahmedabad" },
                { icon: RotateCcw, label: "Easy Returns", sub: "7-day return policy" },
                { icon: Shield, label: "Secure Payment", sub: "100% protected" },
              ].map((badge) => (
                <div key={badge.label} className="text-center">
                  <badge.icon className="w-6 h-6 text-primary mx-auto mb-1" />
                  <p className="text-xs font-semibold">{badge.label}</p>
                  <p className="text-[10px] text-muted-foreground">{badge.sub}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
