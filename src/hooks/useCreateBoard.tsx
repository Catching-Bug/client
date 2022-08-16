import { useRouter } from 'next/router'

/**
 * Custom Hook for createButton
 */
export const useCreateBoard = () => {
  const router = useRouter()

  const createBoard = () => {
    router.push('/board/create')
  }

  return { createBoard }
}
