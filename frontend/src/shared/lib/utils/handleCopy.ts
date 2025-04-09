import { toast } from "sonner"

export const handleCopy = (text: string) => {
	navigator.clipboard.writeText(text)
	toast.success('Successfully copied')
}