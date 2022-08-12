import { useState } from 'react'

/**
 * Custom Hook for modal component
 */
export const useModal = () => {
  const [modalOpen, setModalOpen] = useState(false)

  const toggleModalOpenStatus = () => {
    setModalOpen(!modalOpen)
  }

  return { modalOpen, toggleModalOpenStatus }
}
