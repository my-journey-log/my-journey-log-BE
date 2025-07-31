import React, { useState } from "react";

const dummyFollowings = [
    {
        id: 1,
        name: "Sophia Clark",
        profileImgUrl: "https://lh3.googleusercontent.com/aida-public/AB6AXuC-xAFC6OTUrg0ogp2hlJqLuqbQLMrxT9l-qHv9L8MXmfYvFjtmuVCTThVOh0D0oNSa2D-zR5P316ieR7pTC2pAwlf-HD7rVzqGcrI4D_49LdCc1qxz44BWC22ehBfiyrpGiFJhV5S-BN7cJuSVoM1Vyh4Z-aJV9yzv9IvdK79G2RL2KG1J5ldwSR3sHFdrVAk7WqM_PJESMrbd6xCcoOHkeHeakEnEc8-o33b985fKFdThsE_b29IUdG33Hytnu0yeIgIonTgt9-4x",
        bio: "Travel enthusiast",
    }
];

function FollowingList() {
    const [search, setSearch] = useState("");
    const [followings, setFollowings] = useState(dummyFollowings);

    const filtered = followings.filter(u =>
        u.name.toLowerCase().includes(search.toLowerCase())
    );

    return (
        <div className="min-h-screen bg-slate-50 font-['Plus_Jakarta_Sans','Noto_Sans',sans-serif]">
            <div className="layout-container flex h-full flex-col">
                {/* header */}
                <header className="flex items-center justify-between border-b border-[#e7eef3] px-10 py-3">
                    <div className="flex items-center gap-8">
                        <div className="flex items-center gap-4 text-[#0e151b]">
                            <div className="size-4">
                                {/* ...svg */}
                            </div>
                            <h2 className="text-lg font-bold">Wanderlust</h2>
                        </div>
                        <div className="flex items-center gap-9">
                            <a className="text-sm font-medium" href="#">Home</a>
                            <a className="text-sm font-medium" href="#">Explore</a>
                            <a className="text-sm font-medium" href="#">Create</a>
                        </div>
                    </div>
                    <div className="flex flex-1 justify-end gap-8">
                        {/* 검색, 알림, 프로필 ...생략 */}
                    </div>
                </header>
                {/* 본문 */}
                <div className="px-40 flex flex-1 justify-center py-5">
                    <div className="layout-content-container flex flex-col max-w-[960px] flex-1">
                        <div className="flex flex-wrap justify-between gap-3 p-4">
                            <p className="text-[#0e151b] text-[32px] font-bold min-w-72">Following</p>
                        </div>
                        <div className="px-4 py-3">
                            <label className="flex flex-col min-w-40 h-12 w-full">
                                <div className="flex w-full flex-1 items-stretch rounded-xl h-full">
                                    <div className="text-[#4e7997] flex border-none bg-[#e7eef3] items-center justify-center pl-4 rounded-l-xl border-r-0">
                                        {/* ...svg */}
                                    </div>
                                    <input
                                        placeholder="Find people"
                                        className="form-input flex w-full min-w-0 flex-1 rounded-xl text-[#0e151b] border-none bg-[#e7eef3] h-full placeholder:text-[#4e7997] px-4 rounded-l-none border-l-0 pl-2 text-base font-normal"
                                        value={search}
                                        onChange={e => setSearch(e.target.value)}
                                    />
                                </div>
                            </label>
                        </div>
                        {filtered.map(u => (
                            <div key={u.id} className="flex items-center gap-4 bg-slate-50 px-4 min-h-[72px] py-2 justify-between">
                                <div className="flex items-center gap-4">
                                    <div
                                        className="bg-center bg-no-repeat aspect-square bg-cover rounded-full h-14 w-fit"
                                        style={{ backgroundImage: `url(${u.profileImgUrl})` }}
                                    />
                                    <div className="flex flex-col justify-center">
                                        <p className="text-[#0e151b] text-base font-medium">{u.name}</p>
                                        <p className="text-[#4e7997] text-sm font-normal">{u.bio}</p>
                                    </div>
                                </div>
                                <div className="shrink-0">
                                    <button
                                        className="flex min-w-[84px] max-w-[480px] cursor-pointer items-center justify-center rounded-xl h-8 px-4 bg-[#e7eef3] text-[#0e151b] text-sm font-medium"
                                    >
                                        <span className="truncate">Unfollow</span>
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default FollowingList;
