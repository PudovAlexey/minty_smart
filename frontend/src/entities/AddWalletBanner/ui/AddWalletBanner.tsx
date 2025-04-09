import { SOL, TON } from "@shared/assets/icons"
import { Button } from "@shared/ui/Button/Button"
import { Link } from "react-router"

function AddWalletBanner() {
	return (
		<div className="mt-24 pl-4">
			<div className="relative mb-3 w-auto">
				<TON width={55} height={55} />
				<SOL width={55} height={55} className="absolute left-9 top-0" />
			</div>
			<p className="font-bold text-[32px] leading-10">
				After adding a <br /> wallet, your <br /> portfolio will be <br />{' '}
				displayed here
			</p>

			<Link to="/wallet?active_tab=wallet" className="mt-7 block w-max">
				<Button>Add wallet</Button>
			</Link>
		</div>
	)
}

export {
    AddWalletBanner
}
