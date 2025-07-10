import ContactSection from '@/app/components/contact-section'
import Header from '@/app/components/header'
import React from 'react'

export default function ContactPage() {
  return (
    <main className="relative min-h-screen overflow-hidden bg-background">
      <div className="relative z-10 container mx-auto max-w-4xl px-4 md:px-6">
        <Header showBackButton showNavLinks={false} showAuthArea={false} showBranding />
        <ContactSection />
      </div>
    </main>
  )
}
