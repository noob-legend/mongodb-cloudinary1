'use client';

/**
 * App Component - Halaman Utama
 * - Dashboard untuk menampilkan, upload, edit, dan hapus foto
 * - Menggunakan React hooks untuk state management
 * - Connect ke backend API di localhost:5000
 */
import { useState, useEffect } from 'react'
import PhotoCard from './components/PhotoCard'
import PhotoForm from './components/PhotoForm'
import {
  getAllPhotos,
  createPhoto,
  updatePhoto,
  deletePhoto,
} from './lib/photoApi'
import { cn } from './lib/utils'

export default function App() {
  // State untuk menyimpan list foto
  const [photos, setPhotos] = useState([])

  // State untuk foto yang sedang diedit (null = mode tambah)
  const [editingPhoto, setEditingPhoto] = useState(null)

  // State untuk loading dan error
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState(null)

  /**
   * Effect untuk fetch semua foto saat component mount
   */
  useEffect(() => {
    fetchPhotos()
  }, [])

  /**
   * Fetch semua foto dari backend
   * Dipanggil saat mount dan setelah setiap operasi CRUD
   */
  const fetchPhotos = async () => {
    setIsLoading(true)
    setError(null)

    try {
      const data = await getAllPhotos()
      // Handle berbagai format response dari backend
      setPhotos(Array.isArray(data) ? data : data.photos || [])
    } catch (err) {
      console.error('Error fetching photos:', err)
      setError('Failed to load photos. Make sure the backend is running on localhost:5000')
    } finally {
      setIsLoading(false)
    }
  }

  /**
   * Handle submit form (create atau update)
   * @param {FormData} formData - Data form
   * @param {string|null} photoId - ID foto (null jika create)
   */
  const handleSubmit = async (formData, photoId) => {
    try {
      if (photoId) {
        // Update existing photo
        await updatePhoto(photoId, formData)
        setEditingPhoto(null)
      } else {
        // Create new photo
        await createPhoto(formData)
      }

      // Refresh list setelah operasi berhasil
      await fetchPhotos()
    } catch (err) {
      console.error('Error saving photo:', err)
      throw err // Re-throw untuk ditangani di PhotoForm
    }
  }

  /**
   * Handle edit button click
   * Set foto yang sedang diedit
   */
  const handleEdit = (photo) => {
    setEditingPhoto(photo)
    // Scroll ke form
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  /**
   * Handle cancel edit
   * Reset editing state
   */
  const handleCancelEdit = () => {
    setEditingPhoto(null)
  }

  /**
   * Handle delete photo
   * Konfirmasi dulu, lalu hapus dan refresh list
   */
  const handleDelete = async (photoId) => {
    // Konfirmasi sebelum hapus
    if (!window.confirm('Are you sure you want to delete this photo?')) {
      return
    }

    try {
      await deletePhoto(photoId)
      // Refresh list setelah hapus
      await fetchPhotos()
    } catch (err) {
      console.error('Error deleting photo:', err)
      alert('Failed to delete photo. Please try again.')
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-6xl mx-auto px-4 py-4">
          <h1 className="text-2xl font-bold text-gray-800">
            Photo Upload Dashboard
          </h1>
          <p className="text-gray-500 text-sm mt-1">
            Upload, manage, and organize your photos
          </p>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-6xl mx-auto px-4 py-8">
        {/* Upload/Edit Form Section */}
        <section className="mb-8">
          <PhotoForm
            editingPhoto={editingPhoto}
            onSubmit={handleSubmit}
            onCancel={handleCancelEdit}
          />
        </section>

        {/* Photo Gallery Section */}
        <section>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-bold text-gray-800">Photo Gallery</h2>
            {/* Refresh Button */}
            <button
              onClick={fetchPhotos}
              disabled={isLoading}
              className={cn(
                'px-4 py-2 rounded-md text-sm font-medium',
                'bg-gray-100 text-gray-700',
                'hover:bg-gray-200 transition-colors',
                'focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2',
                'disabled:opacity-50 disabled:cursor-not-allowed'
              )}
            >
              {isLoading ? 'Loading...' : 'Refresh'}
            </button>
          </div>

          {/* Error State */}
          {error && (
            <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-md mb-4">
              {error}
            </div>
          )}

          {/* Loading State */}
          {isLoading && !error && (
            <div className="text-center py-12">
              <div className="inline-block w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
              <p className="mt-2 text-gray-500">Loading photos...</p>
            </div>
          )}

          {/* Empty State */}
          {!isLoading && !error && photos.length === 0 && (
            <div className="text-center py-12 bg-white rounded-lg border border-gray-200">
              <div className="text-gray-400 text-5xl mb-4">📷</div>
              <p className="text-gray-500">No photos yet.</p>
              <p className="text-gray-400 text-sm">
                Upload your first photo using the form above.
              </p>
            </div>
          )}

          {/* Photo Grid */}
          {!isLoading && !error && photos.length > 0 && (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {photos.map((photo) => (
                <PhotoCard
                  key={photo._id}
                  photo={photo}
                  onEdit={handleEdit}
                  onDelete={handleDelete}
                />
              ))}
            </div>
          )}
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t border-gray-200 bg-white mt-12">
        <div className="max-w-6xl mx-auto px-4 py-4 text-center text-gray-500 text-sm">
          Photo Upload App - Connect to backend at localhost:5000
        </div>
      </footer>
    </div>
  )
}
