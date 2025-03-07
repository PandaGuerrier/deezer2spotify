import { Button } from '@nextui-org/react'

interface ButtonProps {
  type: "button" | "submit" | "reset",
  name: string,
  disabled?: boolean,
  className?: string,
  onPress?: () => void
}

export default function SpotifyButton({ name, type, disabled, className, onPress }: ButtonProps) {
  return (
      <Button
        variant={"solid"}
        type={type}
        name={name}
        disabled={disabled}
        className={"bg-green-600 " + className}
        radius={"full"}
        onClick={onPress}
      >{name}</Button>
  )
}
