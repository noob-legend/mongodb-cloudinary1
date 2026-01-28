"use client";

/**
 * PhotoForm Component
 * - Form untuk upload foto baru atau edit foto yang sudah ada
 * - Props:
 *   - editingPhoto: Object foto yang sedang diedit (null jika mode tambah)
 *   - onSubmit: Callback function saat form disubmit
 *   - onCancel: Callback function saat tombol Cancel diklik (mode edit)
 * - Features:
 *   - Input title dan file image
 *   - Preview gambar yang dipilih
 *   - Loading state saat submit
 */
import { useState, useEffect, useRef } from "react";
import { cn } from "../lib/utils";

export default function PhotoForm({ editingPhoto, onSubmit, onCancel }) {
  // Form state
  const [title, setTitle] = useState("");
  const [imageFile, setImageFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  // Ref untuk reset file input
  const fileInputRef = useRef(null);

  // Determine if in edit mode
  const isEditMode = editingPhoto !== null;

  /**
   * Effect untuk populate form saat mode edit
   * Reset form saat editingPhoto berubah
   */
  useEffect(() => {
    if (editingPhoto) {
      setTitle(editingPhoto.title);
      setPreview(editingPhoto.imageUrl);
      setImageFile(null);
    } else {
      // Reset form untuk mode tambah
      setTitle("");
      setPreview(null);
      setImageFile(null);
      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
    }
  }, [editingPhoto]);

  /**
   * Handle perubahan file input
   * Generate preview URL untuk gambar yang dipilih
   */
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageFile(file);
      // Create preview URL
      const previewUrl = URL.createObjectURL(file);
      setPreview(previewUrl);
    }
  };

  /**
   * Handle form submission
   * Buat FormData dan panggil onSubmit callback
   */
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validasi: title wajib diisi
    if (!title.trim()) {
      alert("Please enter a title");
      return;
    }

    // Validasi: image wajib saat mode tambah
    if (!isEditMode && !imageFile) {
      alert("Please select an image");
      return;
    }

    setIsLoading(true);

    try {
      // Buat FormData untuk multipart/form-data request
      const formData = new FormData();
      formData.append("title", title.trim());

      // Hanya append image jika ada file baru dipilih
      if (imageFile) {
        formData.append("photo", imageFile);
      }

      // Panggil onSubmit dengan FormData dan ID (jika edit mode)
      await onSubmit(formData, isEditMode ? editingPhoto._id : null);

      // Reset form setelah berhasil submit (hanya mode tambah)
      if (!isEditMode) {
        setTitle("");
        setImageFile(null);
        setPreview(null);
        if (fileInputRef.current) {
          fileInputRef.current.value = "";
        }
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      alert("Failed to save photo. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  /**
   * Handle cancel edit
   * Reset form dan panggil onCancel callback
   */
  const handleCancel = () => {
    setTitle("");
    setImageFile(null);
    setPreview(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
    onCancel();
  };

  return (
    <form
      onSubmit={handleSubmit}
      className={cn(
        "bg-white rounded-lg shadow-md p-6",
        "border border-gray-200",
      )}
    >
      {/* Form Header */}
      <h2 className="text-xl font-bold text-gray-800 mb-4">
        {isEditMode ? "Edit Photo" : "Upload New Photo"}
      </h2>

      {/* Title Input */}
      <div className="mb-4">
        <label
          htmlFor="title"
          className="block text-sm font-medium text-gray-700 mb-1"
        >
          Title
        </label>
        <input
          type="text"
          id="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Enter photo title"
          className={cn(
            "w-full px-3 py-2 rounded-md",
            "border border-gray-300",
            "focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500",
            "placeholder:text-gray-400",
          )}
        />
      </div>

      {/* File Input */}
      <div className="mb-4">
        <label
          htmlFor="image"
          className="block text-sm font-medium text-gray-700 mb-1"
        >
          Image {isEditMode && "(optional - leave empty to keep current)"}
        </label>
        <input
          type="file"
          id="image"
          ref={fileInputRef}
          accept="image/*"
          onChange={handleFileChange}
          className={cn(
            "w-full px-3 py-2 rounded-md",
            "border border-gray-300",
            "file:mr-4 file:py-1 file:px-3",
            "file:rounded-md file:border-0",
            "file:text-sm file:font-medium",
            "file:bg-blue-50 file:text-blue-700",
            "hover:file:bg-blue-100",
          )}
        />
      </div>

      {/* Image Preview */}
      {preview && (
        <div className="mb-4">
          <p className="text-sm font-medium text-gray-700 mb-1">Preview</p>
          <div className="w-32 h-32 rounded-md overflow-hidden border border-gray-200">
            <img
              src={preview || "/placeholder.svg"}
              alt="Preview"
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      )}

      {/* Action Buttons */}
      <div className="flex gap-2">
        {/* Submit Button */}
        <button
          type="submit"
          disabled={isLoading}
          className={cn(
            "flex-1 px-4 py-2 rounded-md font-medium",
            "bg-green-500 text-white",
            "hover:bg-green-600 transition-colors",
            "focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2",
            "disabled:opacity-50 disabled:cursor-not-allowed",
          )}
        >
          {isLoading
            ? "Saving..."
            : isEditMode
              ? "Update Photo"
              : "Upload Photo"}
        </button>

        {/* Cancel Button (only in edit mode) */}
        {isEditMode && (
          <button
            type="button"
            onClick={handleCancel}
            disabled={isLoading}
            className={cn(
              "px-4 py-2 rounded-md font-medium",
              "bg-gray-200 text-gray-700",
              "hover:bg-gray-300 transition-colors",
              "focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2",
              "disabled:opacity-50 disabled:cursor-not-allowed",
            )}
          >
            Cancel
          </button>
        )}
      </div>
    </form>
  );
}
