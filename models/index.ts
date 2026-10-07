import mongoose, { Schema } from 'mongoose';

// Multilingual text schema helper
const LocalizedTextSchema = new Schema({
  fr: { type: String, default: '' },
  en: { type: String, default: '' },
  es: { type: String, default: '' },
  it: { type: String, default: '' },
  pt: { type: String, default: '' },
}, { _id: false });

// 1. Admin Schema
const AdminSchema = new Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true, lowercase: true, trim: true },
  password: { type: String, required: true },
  role: { type: String, enum: ['superadmin', 'admin'], default: 'admin' },
  lastLogin: { type: Date },
}, { timestamps: true });

export const Admin = mongoose.models.Admin || mongoose.model('Admin', AdminSchema);

// 2. Product Schema
const ProductSchema = new Schema({
  slug: { type: String, required: true, unique: true, trim: true },
  name: { type: LocalizedTextSchema, required: true },
  description: { type: LocalizedTextSchema, required: true },
  shortDescription: { type: LocalizedTextSchema, default: () => ({}) },
  ingredients: { type: LocalizedTextSchema, default: () => ({}) },
  usage: { type: LocalizedTextSchema, default: () => ({}) },
  price: { type: Number, required: true },
  discountPrice: { type: Number, default: 0 },
  category: { type: String, required: true, default: 'Soins Visage' },
  range: { type: String, default: 'classic' }, // 'green', 'nude', 'gold', 'accessories'
  images: [{ type: String }],
  inStock: { type: Boolean, default: true },
  stockQuantity: { type: Number, default: 50 },
  isFeatured: { type: Boolean, default: false },
  isNewProduct: { type: Boolean, default: false },
  variations: [{
    name: String,
    price: Number,
    sku: String,
    inStock: { type: Boolean, default: true }
  }],
  rating: { type: Number, default: 5.0 },
  reviewCount: { type: Number, default: 12 },
}, { timestamps: true });

export const Product = mongoose.models.Product || mongoose.model('Product', ProductSchema);

// 3. Treatment Schema (Nos Soins et Traitements)
const TreatmentSchema = new Schema({
  slug: { type: String, required: true, unique: true },
  title: { type: LocalizedTextSchema, required: true },
  description: { type: LocalizedTextSchema, required: true },
  category: { 
    type: String, 
    required: true,
    enum: ['visage-cou', 'ventre-dos', 'cuisses-fesses', 'bras', 'cheveux', 'epilation']
  },
  categoryLabel: { type: LocalizedTextSchema, required: true },
  duration: { type: String, required: true, default: '60 min' },
  price: { type: Number, required: true },
  priceNote: { type: LocalizedTextSchema, default: () => ({}) },
  images: [{ type: String }],
  isFeatured: { type: Boolean, default: false },
  benefits: [LocalizedTextSchema],
}, { timestamps: true });

export const Treatment = mongoose.models.Treatment || mongoose.model('Treatment', TreatmentSchema);

// 4. Beauty Ritual Schema (Rituels Beauté)
const BeautyRitualSchema = new Schema({
  slug: { type: String, required: true, unique: true },
  title: { type: LocalizedTextSchema, required: true },
  description: { type: LocalizedTextSchema, required: true },
  productsIncluded: [LocalizedTextSchema],
  originalPrice: { type: Number, required: true },
  discountPrice: { type: Number, required: true },
  discountPercentage: { type: Number, default: 15 },
  images: [{ type: String }],
  isAvailable: { type: Boolean, default: true },
}, { timestamps: true });

export const BeautyRitual = mongoose.models.BeautyRitual || mongoose.model('BeautyRitual', BeautyRitualSchema);

// 5. Formation Schema
const FormationSchema = new Schema({
  slug: { type: String, required: true, unique: true },
  title: { type: LocalizedTextSchema, required: true },
  description: { type: LocalizedTextSchema, required: true },
  duration: { type: String, default: '1 à 2 jours' },
  price: { type: Number, default: 950 },
  certification: { type: String, default: 'Qualiopi' },
  program: [{
    title: LocalizedTextSchema,
    details: [String]
  }],
  image: { type: String },
}, { timestamps: true });

export const Formation = mongoose.models.Formation || mongoose.model('Formation', FormationSchema);

// 6. Booking Schema
const BookingSchema = new Schema({
  referenceNumber: { type: String, required: true, unique: true },
  treatmentTitle: { type: String, required: true },
  treatmentSlug: { type: String, required: true },
  treatmentPrice: { type: Number, required: true },
  treatmentDuration: { type: String, required: true },
  customerName: { type: String, required: true },
  customerEmail: { type: String, required: true },
  customerPhone: { type: String, required: true },
  bookingDate: { type: String, required: true },
  bookingTime: { type: String, required: true },
  notes: { type: String, default: '' },
  status: { 
    type: String, 
    enum: ['pending', 'confirmed', 'completed', 'cancelled'], 
    default: 'pending' 
  },
}, { timestamps: true });

export const Booking = mongoose.models.Booking || mongoose.model('Booking', BookingSchema);

// 7. Order Schema
const OrderSchema = new Schema({
  orderNumber: { type: String, required: true, unique: true },
  items: [{
    productId: { type: String },
    slug: { type: String, required: true },
    name: { type: String, required: true },
    price: { type: Number, required: true },
    quantity: { type: Number, required: true, min: 1 },
    image: { type: String },
    variation: { type: String }
  }],
  subtotal: { type: Number, required: true },
  shipping: { type: Number, default: 0 },
  total: { type: Number, required: true },
  customer: {
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    email: { type: String, required: true },
    phone: { type: String, required: true },
    address: { type: String, required: true },
    city: { type: String, required: true },
    postalCode: { type: String, required: true },
    country: { type: String, default: 'France' }
  },
  paymentMethod: { type: String, default: 'Carte Bancaire' },
  paymentStatus: { type: String, enum: ['paid', 'pending', 'failed'], default: 'paid' },
  orderStatus: { 
    type: String, 
    enum: ['processing', 'shipped', 'delivered', 'cancelled'], 
    default: 'processing' 
  },
}, { timestamps: true });

export const Order = mongoose.models.Order || mongoose.model('Order', OrderSchema);

// 8. BlogPost Schema
const BlogPostSchema = new Schema({
  slug: { type: String, required: true, unique: true },
  title: { type: LocalizedTextSchema, required: true },
  excerpt: { type: LocalizedTextSchema, required: true },
  content: { type: LocalizedTextSchema, required: true },
  category: { type: String, default: 'Facialiste Paris' },
  author: { type: String, default: 'Ruth Niddam' },
  image: { type: String },
  isPublished: { type: Boolean, default: true },
}, { timestamps: true });

export const BlogPost = mongoose.models.BlogPost || mongoose.model('BlogPost', BlogPostSchema);

// 9. PressItem Schema
const PressItemSchema = new Schema({
  publication: { type: String, required: true },
  title: { type: LocalizedTextSchema, required: true },
  quote: { type: LocalizedTextSchema, required: true },
  date: { type: String },
  logo: { type: String },
  image: { type: String },
  link: { type: String },
}, { timestamps: true });

export const PressItem = mongoose.models.PressItem || mongoose.model('PressItem', PressItemSchema);

// 10. NewsletterSubscriber Schema
const NewsletterSubscriberSchema = new Schema({
  email: { type: String, required: true, unique: true, lowercase: true, trim: true },
  locale: { type: String, default: 'fr' },
}, { timestamps: true });

export const NewsletterSubscriber = mongoose.models.NewsletterSubscriber || mongoose.model('NewsletterSubscriber', NewsletterSubscriberSchema);

// 11. ContactMessage Schema
const ContactMessageSchema = new Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  phone: { type: String, default: '' },
  subject: { type: String, default: 'Demande de renseignements' },
  message: { type: String, required: true },
  status: { type: String, enum: ['unread', 'read', 'replied'], default: 'unread' },
}, { timestamps: true });

export const ContactMessage = mongoose.models.ContactMessage || mongoose.model('ContactMessage', ContactMessageSchema);

// 12. SiteContent Schema
const SiteContentSchema = new Schema({
  key: { type: String, required: true, unique: true },
  data: { type: Schema.Types.Mixed, required: true }
}, { timestamps: true });

export const SiteContent = mongoose.models.SiteContent || mongoose.model('SiteContent', SiteContentSchema);
