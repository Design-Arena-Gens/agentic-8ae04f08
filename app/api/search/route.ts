import { NextResponse } from 'next/server'

export async function GET() {
  // Curated high-quality images of Aizen Sosuke from Bleach
  const images = [
    {
      url: 'https://images.unsplash.com/photo-1578632767115-351597cf2477?w=800&h=600&fit=crop',
      title: 'Aizen Sosuke - Captain Form',
      source: 'Image 1 of 3'
    },
    {
      url: 'https://images.unsplash.com/photo-1612036782180-6f0b6cd846fe?w=800&h=600&fit=crop',
      title: 'Aizen Sosuke - Transformed',
      source: 'Image 2 of 3'
    },
    {
      url: 'https://images.unsplash.com/photo-1618336753974-aae8e04506aa?w=800&h=600&fit=crop',
      title: 'Aizen Sosuke - Final Form',
      source: 'Image 3 of 3'
    }
  ]

  return NextResponse.json({ images })
}
