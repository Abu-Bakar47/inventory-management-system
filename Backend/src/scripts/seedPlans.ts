import mongoose from 'mongoose';
import Plan from '../models/Plan';
import dotenv from 'dotenv';
dotenv.config();

const plans = [
  {
    name: "Free Trial",
    price: 0,
    trialDays: 14,
    features: ["Up to 100 items", "Basic reporting", "Email support"]
  },
  {
    name: "Starter",
    price: 15,
    trialDays: 7,
    features: ["Up to 500 items", "Advanced reporting", "Priority support"]
  },
  {
    name: "Professional",
    price: 35,
    features: ["Unlimited items", "Advanced analytics", "API access", "24/7 support"]
  },
  {
    name: "Enterprise",
    price: 99,
    features: ["Unlimited items", "Dedicated account manager", "Custom integrations", "SLA guarantee"]
  }
];

const seedDatabase = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI!);
    await Plan.deleteMany({});
    await Plan.insertMany(plans);
    console.log('Plans seeded successfully');
    process.exit(0);
  } catch (error) {
    console.error('Seeding failed:', error);
    process.exit(1);
  }
};

seedDatabase();