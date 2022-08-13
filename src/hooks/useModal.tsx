import { useState } from 'react'

/**
 * Custom Hook for modal component
 */
export const useModal = () => {
  const [modalOpen, setModalOpen] = useState(false)

  /**
   * modal의 상태를 뒤바꿉니다
   * ex) true -> false , false -> true
   */
  const toggleModalOpenStatus = () => {
    setModalOpen(!modalOpen)
  }

  return { modalOpen, toggleModalOpenStatus }
}
