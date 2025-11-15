import React from "react";
import { Link } from "react-router-dom";
import { Check } from "lucide-react";

export default function Pricing() {
  return (
    <main className="container mx-auto py-16 px-4">
      {/* Header */}
      <div className="text-center mb-16">
        <h1 className="text-4xl font-extrabold mb-2">
          Simple & Transparent Pricing
        </h1>
        <p className="text-gray-600 text-lg">
          Choose the plan that fits your productivity needs.
        </p>
      </div>

      {/* Pricing Grid */}
      <div className="grid md:grid-cols-3 gap-8">
        {/* Free Plan */}
        <div className="p-8 rounded-2xl border shadow-sm bg-white dark:bg-gray-900">
          <h3 className="text-2xl font-bold">Free</h3>
          <p className="text-4xl font-extrabold mt-2">₹0</p>
          <p className="text-gray-500 mt-1">Forever free plan</p>

          <ul className="mt-6 space-y-3 text-sm">
            <li className="flex items-center gap-2">
              <Check className="text-green-500" /> Unlimited Tasks
            </li>
            <li className="flex items-center gap-2">
              <Check className="text-green-500" /> Basic Task Filters
            </li>
            <li className="flex items-center gap-2">
              <Check className="text-green-500" /> Limited AI Usage
            </li>
          </ul>

          <Link
            to="/register"
            className="btn btn-primary mt-6 w-full text-center"
          >
            Get Started
          </Link>
        </div>

        {/* Pro Plan */}
        <div className="p-8 rounded-2xl border shadow-lg bg-gradient-to-br from-blue-600 to-cyan-400 text-white scale-105">
          <h3 className="text-2xl font-bold">Pro</h3>
          <p className="text-4xl font-extrabold mt-2">₹299</p>
          <p className="text-white/80 mt-1">Per month</p>

          <ul className="mt-6 space-y-3 text-sm">
            <li className="flex items-center gap-2">
              <Check className="text-white" /> Unlimited Projects
            </li>
            <li className="flex items-center gap-2">
              <Check className="text-white" /> Priority AI Assistance
            </li>
            <li className="flex items-center gap-2">
              <Check className="text-white" /> Productivity Analytics
            </li>
            <li className="flex items-center gap-2">
              <Check className="text-white" /> Advanced Filters
            </li>
          </ul>

          <Link
            to="/signup"
            className="btn bg-white text-blue-600 mt-6 w-full text-center"
          >
            Start Pro
          </Link>
        </div>

        {/* Enterprise */}
        <div className="p-8 rounded-2xl border shadow-sm bg-white dark:bg-gray-900">
          <h3 className="text-2xl font-bold">Enterprise</h3>
          <p className="text-4xl font-extrabold mt-2">Custom</p>
          <p className="text-gray-500 mt-1">For teams & companies</p>

          <ul className="mt-6 space-y-3 text-sm">
            <li className="flex items-center gap-2">
              <Check className="text-green-500" /> Unlimited Everything
            </li>
            <li className="flex items-center gap-2">
              <Check className="text-green-500" /> Team Workspace
            </li>
            <li className="flex items-center gap-2">
              <Check className="text-green-500" /> Dedicated Support
            </li>
            <li className="flex items-center gap-2">
              <Check className="text-green-500" /> SLA & Security
            </li>
          </ul>

          <Link
            to="/contact"
            className="btn btn-outline mt-6 w-full text-center"
          >
            Contact Sales
          </Link>
        </div>
      </div>
    </main>
  );
}
