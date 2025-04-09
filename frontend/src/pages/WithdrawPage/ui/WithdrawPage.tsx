import { useParams } from "react-router"

function WithdrawPage() {
    const { chain } = useParams();
    return <div>{`Withdraw Page here for ${chain as string}`}</div>
}

export {
    WithdrawPage
}