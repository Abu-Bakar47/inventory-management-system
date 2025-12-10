import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import rateLimit from 'express-rate-limit';
import cookieParser from 'cookie-parser';
import mongoSanitize from './middlewares/sanitize';
import authRoutes from './routes/authRoutes';
import paymentRoutes from './routes/paymentRoutes';
import storeRoutes from './routes/store.routes';
import categoryRoutes from './routes/category.routes';
import supplierRoutes from './routes/supplier.routes';
import productRoutes from './routes/product.routes';
import orderRoutes from './routes/order.routes';
import inventoryRoutes from './routes/inventory.routes';
import errorHandler from './middlewares/errorHandler';

const app = express();

// Security middlewares
app.use(helmet());
app.use(mongoSanitize());
app.use(cookieParser());

// CORS configuration
const corsOptions = {
  origin: process.env.ALLOWED_ORIGINS?.split(',') || '*',
  credentials: true,
  optionsSuccessStatus: 200
};
app.use(cors(corsOptions));

// Rate limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 200,
  message: 'Too many requests from this IP, please try again later'
});
app.use(limiter);

// Body parsing
app.use(express.json({ limit: '10kb' }));

// Routes
app.use('/api/v1/auth', authRoutes);
app.use('/api/v1/payment', paymentRoutes);
app.use('/api/v1/store', storeRoutes);
app.use('/api/v1/category', categoryRoutes);
app.use('/api/v1/supplier', supplierRoutes);
app.use('/api/v1/product', productRoutes);
app.use('/api/v1/order', orderRoutes);
app.use('/api/v1/inventory', inventoryRoutes);

// Health check endpoint
app.get('/api/v1/health', (req, res) => {
  res.status(200).json({ status: 'UP', timestamp: Date.now() });
});

// Error handling - must be last middleware
app.use(errorHandler);

export default app;