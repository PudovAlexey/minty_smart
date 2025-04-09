import { Button } from "@shared/ui/Button/Button"
import { Input } from "@shared/ui/Input/Input"
import { useForm } from "react-hook-form"
import { zodResolver } from '@hookform/resolvers/zod'
import { useNavigate } from "react-router"
import { toast } from "sonner"
import { z } from 'zod';
import { sleep } from "@shared/lib/utils/sleep"

const formSchema = z.object({
	key: z.string().min(1),
})

export default function ImportSOLKey() {
    const navigate = useNavigate()

    const { register, handleSubmit, formState } = useForm<
        z.infer<typeof formSchema>
    >({
        resolver: zodResolver(formSchema),
    })

    async function onSubmit(_values: z.infer<typeof formSchema>) {
        await sleep(2000)

        toast.success('Wallet imported successfully')

        sessionStorage.setItem('wallet-created', 'true')

        navigate('/wallet?active_tab=balance')
    }

    return (
        <form className="flex flex-col h-full" onSubmit={handleSubmit(onSubmit)}>
            <Input
                type="text"
                inputMode="text"
                autoCapitalize="off"
                autoComplete="off"
                autoCorrect="off"
                spellCheck="false"
                placeholder="Private key"
                className="h-[59px] rounded-18 p-[18px] text-lg placeholder:text-lg border border-foreground/5"
                disabled={formState.isSubmitting}
                {...register('key')}
            />

            <Button
                disabled={
                    formState.isSubmitting || !formState.isValid || formState.isValidating
                }
                type="submit"
                variant="accent"
                size="lg"
                className="w-full mt-auto mb-28"
            >
                Import
            </Button>
        </form>
    )
}
