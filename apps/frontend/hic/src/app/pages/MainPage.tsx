import { SideBar, ChannelBar, ContentContainer } from "@hapel/page-components"

export const MainPage = () => {
    return (
        <div className="flex">
            <SideBar />
            <ChannelBar />
            {/* <ContentContainer /> */}
        </div>
    )
}

