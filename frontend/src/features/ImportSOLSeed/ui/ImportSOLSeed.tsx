import { SeedInput } from "@entities/SeedInput/ui/SeedInput"
import { zodResolver } from "@hookform/resolvers/zod"
import { readClipboardSeed } from "@shared/lib/utils/readClipboardSeed"
import { sleep } from "@shared/lib/utils/sleep"
import { Button } from "@shared/ui/Button/Button"
import { PasteButton } from "@shared/ui/PasteButton/PasteButton"
import { useFieldArray, useForm } from "react-hook-form"
import { useNavigate } from "react-router"
import { toast } from "sonner"
import { z } from "zod"

const formSchema = z.object({
	seed: z.array(z.object({ value: z.string().min(1) })).length(24),
})

export default function ImportSOLSeed() {
	const navigate = useNavigate()

	const { control, register, handleSubmit, formState, setValue } = useForm<
		z.infer<typeof formSchema>
	>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			seed: Array.from({ length: 12 }).map(() => ({ value: undefined })),
		},
	})

	const { fields } = useFieldArray({
		control,
		name: 'seed',
	})

	const paste = async () => {
		const phrases = await readClipboardSeed(12)

		if (!phrases.length)
			return toast.error('Clipboard does not contain 12 phrases')

		phrases.forEach((phrase, index) => {
			setValue(`seed.${index}.value`, phrase, { shouldValidate: true })
		})

		toast.success('Phrases pasted successfully')
	}

	async function onSubmit(_values: z.infer<typeof formSchema>) {
		await sleep(2000)

		toast.success('Wallet imported successfully')

		sessionStorage.setItem('wallet-created', 'true')

        navigate('/wallet?active_tab=balance');
	}

	return (
		<>
			<PasteButton onClick={paste} disabled={formState.isSubmitting} />
			<form className="flex flex-col gap-3" onSubmit={handleSubmit(onSubmit)}>
				{fields.map((field, index) => (
					<SeedInput
						index={index}
						key={field.id}
						disabled={formState.isSubmitting}
						{...register(`seed.${index}.value`)}
					/>
				))}
				<Button
					disabled={
						formState.isSubmitting ||
						!formState.isValid ||
						formState.isValidating
					}
					type="submit"
					variant="accent"
					size="lg"
					className="grow shrink-0 mt-2.5 mb-28"
				>
					Import
				</Button>
			</form>
		</>
	)
}
