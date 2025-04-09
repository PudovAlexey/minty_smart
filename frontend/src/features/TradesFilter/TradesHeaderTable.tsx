export const TradesTabletHeader = () => {
	return (
		<div className="flex justify-between pb-3 border-b mb-3.5 border-foreground/20 leading-none text-[10px] text-foreground/50 font-bold uppercase">
			<div className="w-6">date</div>
			<div className="w-[22px]">type</div>
			<div className="w-16">size</div>
			<div className="w-[100px]">price</div>
			<div className="w-[66px] text-right">wallet</div>
		</div>
	)
}
