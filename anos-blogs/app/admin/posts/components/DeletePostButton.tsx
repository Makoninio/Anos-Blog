'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

interface DeletePostButtonProps {
  postId: string;
  postTitle: string;
}

export default function DeletePostButton({ postId, postTitle }: DeletePostButtonProps) {
  const router = useRouter();
  const [isDeleting, setIsDeleting] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const handleDelete = async () => {
    if (!showConfirm) {
      setShowConfirm(true);
      return;
    }

    setIsDeleting(true);
    try {
      const response = await fetch('/api/admin/delete-post', {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ postId }),
      });

      const data = await response.json();

      if (response.ok && data.success) {
        // Refresh the page to show updated list
        router.refresh();
      } else {
        // Show detailed error message
        const errorMsg = data.error || 'Failed to delete post';
        alert(errorMsg);
        setIsDeleting(false);
        setShowConfirm(false);
      }
    } catch (error) {
      console.error('Error deleting post:', error);
      alert('An error occurred while deleting the post');
      setIsDeleting(false);
      setShowConfirm(false);
    }
  };

  const handleCancel = () => {
    setShowConfirm(false);
  };

  if (showConfirm) {
    return (
      <div className="flex flex-col gap-2">
        <p className="text-xs text-red-600 font-medium mb-1">Delete "{postTitle}"?</p>
        <div className="flex gap-1">
          <button
            onClick={handleDelete}
            disabled={isDeleting}
            className="flex-1 bg-red-500 text-white px-2 py-1 rounded text-xs font-medium hover:bg-red-600 transition-colors disabled:opacity-50"
          >
            {isDeleting ? 'Deleting...' : 'Confirm'}
          </button>
          <button
            onClick={handleCancel}
            disabled={isDeleting}
            className="flex-1 bg-gray-200 text-gray-700 px-2 py-1 rounded text-xs font-medium hover:bg-gray-300 transition-colors disabled:opacity-50"
          >
            Cancel
          </button>
        </div>
      </div>
    );
  }

  return (
    <button
      onClick={handleDelete}
      className="flex-1 bg-red-50 text-red-700 px-3 py-2 rounded-lg text-sm font-medium hover:bg-red-100 transition-colors duration-200 text-center"
      title="Delete post"
    >
      Delete
    </button>
  );
}

