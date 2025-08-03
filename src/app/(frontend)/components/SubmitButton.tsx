import { ReactElement } from 'react'
import { Button } from '@heroui/button'

export default function SubmitButton({
  loading,
  text,
  onPress,
}: {
  loading: boolean
  text: string
  onPress: (e: any) => void
}): ReactElement {
  return (
    <Button
      disabled={loading}
      isLoading={loading}
      onPress={onPress}
      variant="shadow"
      className="bg-linear-to-tr from-pink-500 to-yellow-500 text-white shadow-lg rounded-md"
    >
      {text}
    </Button>
  )
}
