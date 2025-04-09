type BannerCaroucelProps = {
    items: React.ReactNode[]
}

function BannerCaroucel({ items }: BannerCaroucelProps) {
    return (
        <div className="flex w-screen min-h-32 flex-nowrap overflow-y-hidden overflow-x-auto scrollbar-hide mb-6">
            {items}
        </div>
    )
}

export {
    BannerCaroucel
}