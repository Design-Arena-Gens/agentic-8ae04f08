'use client'

import { useEffect, useState } from 'react'
import Image from 'next/image'

interface ImageData {
  url: string
  title: string
  source: string
}

export default function Home() {
  const [images, setImages] = useState<ImageData[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    async function fetchImages() {
      try {
        const response = await fetch('/api/search')
        if (!response.ok) throw new Error('Failed to fetch images')
        const data = await response.json()
        setImages(data.images)
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred')
      } finally {
        setLoading(false)
      }
    }
    fetchImages()
  }, [])

  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      padding: '40px 20px'
    }}>
      <div style={{
        maxWidth: '1200px',
        margin: '0 auto'
      }}>
        <h1 style={{
          fontSize: '3rem',
          fontWeight: 'bold',
          color: 'white',
          textAlign: 'center',
          marginBottom: '20px',
          textShadow: '2px 2px 4px rgba(0,0,0,0.3)'
        }}>
          Aizen Sosuke Gallery
        </h1>

        <p style={{
          fontSize: '1.2rem',
          color: 'rgba(255,255,255,0.9)',
          textAlign: 'center',
          marginBottom: '40px'
        }}>
          Captain of the 5th Division - Bleach
        </p>

        {loading && (
          <div style={{
            textAlign: 'center',
            color: 'white',
            fontSize: '1.5rem',
            padding: '40px'
          }}>
            Loading images...
          </div>
        )}

        {error && (
          <div style={{
            textAlign: 'center',
            color: '#ff6b6b',
            fontSize: '1.2rem',
            padding: '40px',
            background: 'white',
            borderRadius: '12px',
            margin: '0 auto',
            maxWidth: '600px'
          }}>
            Error: {error}
          </div>
        )}

        {!loading && !error && (
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
            gap: '30px',
            padding: '20px 0'
          }}>
            {images.map((image, index) => (
              <div
                key={index}
                style={{
                  background: 'white',
                  borderRadius: '16px',
                  overflow: 'hidden',
                  boxShadow: '0 10px 30px rgba(0,0,0,0.3)',
                  transition: 'transform 0.3s ease, box-shadow 0.3s ease',
                  cursor: 'pointer'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-10px)'
                  e.currentTarget.style.boxShadow = '0 15px 40px rgba(0,0,0,0.4)'
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)'
                  e.currentTarget.style.boxShadow = '0 10px 30px rgba(0,0,0,0.3)'
                }}
              >
                <div style={{
                  position: 'relative',
                  width: '100%',
                  height: '400px',
                  background: '#f0f0f0'
                }}>
                  <img
                    src={image.url}
                    alt={image.title}
                    style={{
                      width: '100%',
                      height: '100%',
                      objectFit: 'cover'
                    }}
                  />
                </div>
                <div style={{
                  padding: '20px'
                }}>
                  <h3 style={{
                    fontSize: '1.3rem',
                    fontWeight: '600',
                    color: '#333',
                    marginBottom: '10px'
                  }}>
                    {image.title}
                  </h3>
                  <p style={{
                    fontSize: '0.9rem',
                    color: '#666'
                  }}>
                    {image.source}
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
