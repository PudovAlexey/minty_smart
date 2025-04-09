import { useAuth, useGet, useList, useUpdate } from "@shared/api/codegen/queries";
import "@shared/api/queryClient/axios";

function ProfilePage() {
    const { mutate } = useAuth();
    // const { mutate } = useUpdate();
    // const {data} = useList();
    // const { data } = useGet({
    //     path: {
    //         id: '5c4290af-514f-467c-8d00-a310cf13ecd3'
    //     }
    // })

    // console.log(data);

    const handleSend = () => {
        mutate({
            body: {
                "auth_date": "1736370178",
                "first_name": "Alice",
                "hash": "e678f621cfecade601abb4e829bf5160044ea683550b062220ec11020103d060",
                "last_name": "Arius",
                "photo_url": "https://avatars.steamstatic.com/fb7e3235647f6b86d2cfff168afb0c3662f8ed23_full.jpg",
                "query_id": "AAE2VXYbAAAAADZVdhu1UMfV",
                "signature": "5N0NPaCQH1-_TapyOyXtwru6fOEh9JOqZBaqdlqavTuBDVT4MkACTBoiAq-9VzuLPspI-vDWmZ_3cjp-wj1LBw",
                "telegram_id": 765432111,
                "username": "AliceTheCat"
            }
        })
        // mutate({
        // })
        //     mutate({
        //         body: {
        //             "auth_date": "1736370178",
        //             "first_name": "Alice",
        //             "hash": "e678f621cfecade601abb4e829bf5160044ea683550b062220ec11020103d060",
        //             "last_name": "Arius",
        //             "photo_url": "https://avatars.steamstatic.com/fb7e3235647f6b86d2cfff168afb0c3662f8ed23_full.jpg",
        //             "query_id": "AAE2VXYbAAAAADZVdhu1UMfV",
        //             "signature": "5N0NPaCQH1-_TapyOyXtwru6fOEh9JOqZBaqdlqavTuBDVT4MkACTBoiAq-9VzuLPspI-vDWmZ_3cjp-wj1LBw",
        //             "telegram_id": 765432222,
        //             "username": "AliceTheCat"
        //     }
        // })

        // mutate({
        //     body: {
        //         "photo_url": "https://avatars.steamstatic.com/myUrl_full.jpg",
        //         "points": 456,
        //     },
        //     path: {
        //         id: '5c4290af-514f-467c-8d00-a310cf13ecd3',
        //     },
        // })
    }

    return (
        <div>
            <div>ProfilePage</div>
            <button onClick={handleSend}>Click</button>
        </div>
    )
}

export {
    ProfilePage
}