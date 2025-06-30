"use client";
import type React from "react";
import { motion } from "framer-motion";
import LoginCard from "../components/login-card";
import Header from "../../components/header";
import type { Metadata } from "next";

export default function LoginPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-muted/30 px-4">
      <Header
        showBackButton
        showBranding
        showNavLinks={false}
        showAuthArea={false}
      />
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md"
      >
        <LoginCard />
      </motion.div>
    </div>
  );
}
