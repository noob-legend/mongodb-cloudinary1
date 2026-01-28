'use client';

/**
 * PhotoCard Component
 * - Menampilkan thumbnail foto, title, dan tombol aksi (edit & delete)
 * - Props:
 *   - photo: Object berisi data foto (id, title, imageUrl)
 *   - onEdit: Callback function saat tombol Edit diklik
 *   - onDelete: Callback function saat tombol Delete diklik
 */
import { cn } from '../lib/utils'

export default function PhotoCard({ photo, onEdit, onDelete }) {
  return (
    <div
      className={cn(
        'bg-white rounded-lg shadow-md overflow-hidden',
        'border border-gray-200',
        'transition-transform hover:scale-[1.02] hover:shadow-lg'
      )}
    >
      {/* Thumbnail Image */}
      <div className="aspect-square overflow-hidden bg-gray-100">
        <img
          src={photo.imageUrl || "/placeholder.svg"}
          alt={photo.title}
          className="w-full h-full object-cover"
        />
      </div>

      {/* Photo Info & Actions */}
      <div className="p-4">
        {/* Title */}
        <h3 className="font-semibold text-gray-800 text-lg truncate mb-3">
          {photo.title}
        </h3>

        {/* Action Buttons */}
        <div className="flex gap-2">
          {/* Edit Button */}
          <button
            onClick={() => onEdit(photo)}
            className={cn(
              'flex-1 px-3 py-2 text-sm font-medium rounded-md',
              'bg-blue-500 text-white',
              'hover:bg-blue-600 transition-colors',
              'focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2'
            )}
          >
            Edit
          </button>

          {/* Delete Button */}
          <button
            onClick={() => onDelete(photo._id)}
            className={cn(
              'flex-1 px-3 py-2 text-sm font-medium rounded-md',
              'bg-red-500 text-white',
              'hover:bg-red-600 transition-colors',
              'focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2'
            )}
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  )
}
