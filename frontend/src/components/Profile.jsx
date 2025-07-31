import React, { useEffect, useState } from "react";

function Profile() {
    const [user, setUser] = useState({
        nickname: "Sophia Clark",
        bio: "Travel enthusiast exploring the world, one adventure at a time.",
        profileImgUrl: "https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?auto=format&fit=facearea&w=400&h=400",
        followers: 120,
        following: 80,
        tags: ["Adventure", "Hiking", "Photography", "Foodie", "Culture"],
        trips: [
            {
                title: "Exploring the Scottish Highlands",
                imageUrl: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=400&q=80",
            },
            {
                title: "A Week in the Swiss Alps",
                imageUrl: "https://images.unsplash.com/photo-1465101046530-73398c7f28ca?auto=format&fit=crop&w=400&q=80",
            },
            {
                title: "Discovering the Charm of Tuscany",
                imageUrl: "https://images.unsplash.com/photo-1465378552550-16399b2b7e99?auto=format&fit=crop&w=400&q=80",
            },
        ],
    });


    return (
        <div className="relative flex min-h-screen flex-col bg-slate-50 font-['Plus_Jakarta_Sans','Noto_Sans',sans-serif] overflow-x-hidden">
            <div className="layout-container flex h-full grow flex-col">
                {/* Header */}
                <header className="flex items-center justify-between border-b border-[#e7eef3] px-10 py-3">
                    <div className="flex items-center gap-8">
                        <div className="flex items-center gap-4 text-[#0e151b]">
                            <div className="size-4">
                                {/* 아이콘 */}
                                <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path
                                        d="M44 11.2727C44 14.0109 39.8386 16.3957 33.69 17.6364C39.8386 18.877 44 21.2618 44 24C44 26.7382 39.8386 29.123 33.69 30.3636C39.8386 31.6043 44 33.9891 44 36.7273C44 40.7439 35.0457 44 24 44C12.9543 44 4 40.7439 4 36.7273C4 33.9891 8.16144 31.6043 14.31 30.3636C8.16144 29.123 4 26.7382 4 24C4 21.2618 8.16144 18.877 14.31 17.6364C8.16144 16.3957 4 14.0109 4 11.2727C4 7.25611 12.9543 4 24 4C35.0457 4 44 7.25611 44 11.2727Z"
                                        fill="currentColor"
                                    ></path>
                                </svg>
                            </div>
                            <h2 className="text-lg font-bold leading-tight tracking-[-0.015em]">Wanderlust</h2>
                        </div>
                        <div className="flex items-center gap-9">
                            <a className="text-sm font-medium" href="#">Home</a>
                            <a className="text-sm font-medium" href="#">Explore</a>
                            <a className="text-sm font-medium" href="#">Create</a>
                        </div>
                    </div>
                    <div className="flex flex-1 justify-end gap-8">
                        <input
                            className="rounded-xl h-10 bg-[#e7eef3] border-none px-4 text-base font-normal text-[#4e7997]"
                            placeholder="Search"
                        />
                        <button className="rounded-xl h-10 bg-[#e7eef3] flex items-center px-3">
                            <svg xmlns="http://www.w3.org/2000/svg" width="20px" height="20px" fill="currentColor" viewBox="0 0 256 256">
                                <path
                                    d="M221.8,175.94C216.25,166.38,208,139.33,208,104a80,80,0,1,0-160,0c0,35.34-8.26,62.38-13.81,71.94A16,16,0,0,0,48,200H88.81a40,40,0,0,0,78.38,0H208a16,16,0,0,0,13.8-24.06ZM128,216a24,24,0,0,1-22.62-16h45.24A24,24,0,0,1,128,216ZM48,184c7.7-13.24,16-43.92,16-80a64,64,0,1,1,128,0c0,36.05,8.28,66.73,16,80Z"
                                ></path>
                            </svg>
                        </button>
                        <div
                            className="bg-center bg-no-repeat aspect-square bg-cover rounded-full size-10"
                            style={{ backgroundImage: `url('${user.profileImgUrl}')` }}
                        ></div>
                    </div>
                </header>

                {/* 프로필 본문 */}
                <div className="px-40 flex flex-1 justify-center py-5">
                    <div className="layout-content-container flex flex-col max-w-[960px] flex-1">
                        {/* 프로필 요약 */}
                        <div className="flex p-4">
                            <div className="flex w-full flex-col gap-4 items-center">
                                <div className="flex gap-4 flex-col items-center">
                                    <div
                                        className="bg-center bg-no-repeat aspect-square bg-cover rounded-full min-h-32 w-32"
                                        style={{ backgroundImage: `url('${user.profileImgUrl}')` }}
                                    />
                                    <div className="flex flex-col items-center justify-center">
                                        <p className="text-[22px] font-bold tracking-[-0.015em] text-center">{user.nickname}</p>
                                        <p className="text-[#4e7997] text-base font-normal text-center">{user.bio}</p>
                                        <p className="text-[#4e7997] text-base font-normal text-center">
                                            {user.followers} followers · {user.following} following
                                        </p>
                                    </div>
                                </div>
                                <button className="rounded-xl h-10 px-4 bg-[#e7eef3] text-[#0d161b] text-sm font-bold w-full max-w-[480px]">
                                    <span>Follow</span>
                                </button>
                            </div>
                        </div>

                        {/* 태그 */}
                        <div className="flex gap-3 p-3 flex-wrap pr-4">
                            {user.tags.map(tag => (
                                <div key={tag} className="flex h-8 items-center rounded-xl bg-[#e7eef3] pl-4 pr-4">
                                    <p className="text-[#0e151b] text-sm font-medium">{tag}</p>
                                </div>
                            ))}
                        </div>

                        {/* 여행기 */}
                        <h2 className="text-[22px] font-bold tracking-[-0.015em] px-4 pb-3 pt-5">Trips</h2>
                        <div className="grid grid-cols-[repeat(auto-fit,minmax(158px,1fr))] gap-3 p-4">
                            {user.trips.map(trip => (
                                <div key={trip.title} className="flex flex-col gap-3 pb-3">
                                    <div
                                        className="w-full bg-center bg-no-repeat aspect-square bg-cover rounded-xl"
                                        style={{ backgroundImage: `url('${trip.imageUrl}')` }}
                                    />
                                    <p className="text-base font-medium">{trip.title}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Footer */}
                <footer className="flex justify-center">
                    <div className="flex max-w-[960px] flex-1 flex-col">
                        <footer className="flex flex-col gap-6 px-5 py-10 text-center">
                            <div className="flex flex-wrap items-center justify-center gap-6">
                                <a className="text-[#4e7997] text-base font-normal min-w-40" href="#">About</a>
                                <a className="text-[#4e7997] text-base font-normal min-w-40" href="#">Contact</a>
                                <a className="text-[#4e7997] text-base font-normal min-w-40" href="#">Terms of Service</a>
                                <a className="text-[#4e7997] text-base font-normal min-w-40" href="#">Privacy Policy</a>
                            </div>
                            <p className="text-[#4e7997] text-base font-normal">@2024 Wanderlust. All rights reserved.</p>
                        </footer>
                    </div>
                </footer>
            </div>
        </div>
    );
}

export default Profile;
