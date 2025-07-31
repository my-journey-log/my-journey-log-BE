import React from "react";

const place = {

};

function Star({ filled }) {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" width="18px" height="18px" fill={filled ? "#309be8" : "#aec5d5"} viewBox="0 0 256 256">
            <path d="M234.5,114.38l-45.1,39.36,13.51,58.6a16,16,0,0,1-23.84,17.34l-51.11-31-51,31a16,16,0,0,1-23.84-17.34L66.61,153.8,21.5,114.38a16,16,0,0,1,9.11-28.06l59.46-5.15,23.21-55.36a15.95,15.95,0,0,1,29.44,0L166,81.17l59.44,5.15a16,16,0,0,1,9.11,28.06Z"/>
        </svg>
    );
}

export default function PlaceDetail() {
    return (
        <div className="min-h-screen bg-slate-50 font-['Plus_Jakarta_Sans','Noto_Sans',sans-serif]">
            {/* 헤더 등은 Layout으로 빼도 됨 */}
            <div className="layout-container flex h-full flex-col">
                {/* 헤더 (생략/공통화 가능) */}
                {/* ... */}
                <div className="px-40 flex flex-1 justify-center py-5">
                    <div className="layout-content-container flex flex-col max-w-[960px] flex-1">
                        {/* 썸네일 */}
                        <div className="w-full bg-center bg-no-repeat bg-cover flex flex-col justify-end overflow-hidden bg-slate-50 rounded-xl min-h-[218px]"
                             style={{ backgroundImage: `url(${place.image})` }}>
                        </div>

                        {/* 제목, 주소 */}
                        <div className="flex flex-wrap justify-between gap-3 p-4">
                            <div className="flex min-w-72 flex-col gap-3">
                                <p className="text-[#0e151b] text-[32px] font-bold">{place.name}</p>
                                <p className="text-[#4e7997] text-sm font-normal">{place.address}</p>
                            </div>
                        </div>
                        {/* 설명 */}
                        <p className="text-[#0e151b] text-base font-normal pb-3 pt-1 px-4">{place.description}</p>

                        {/* 평점/리뷰 bar */}
                        <div className="flex flex-wrap gap-x-8 gap-y-6 p-4">
                            <div className="flex flex-col gap-2">
                                <p className="text-[#0e151b] text-4xl font-black">{place.rating}</p>
                                <div className="flex gap-0.5">
                                    {[1,2,3,4,5].map(i=>(
                                        <Star key={i} filled={i <= Math.round(place.rating)} />
                                    ))}
                                </div>
                                <p className="text-[#0e151b] text-base font-normal">{place.reviewsCount} reviews</p>
                            </div>
                            <div className="grid min-w-[200px] max-w-[400px] flex-1 grid-cols-[20px_1fr_40px] items-center gap-y-3">
                                {place.reviewSummary.map(row => (
                                    <React.Fragment key={row.stars}>
                                        <p className="text-[#0e151b] text-sm">{row.stars}</p>
                                        <div className="flex h-2 flex-1 overflow-hidden rounded-full bg-[#d0dde7]">
                                            <div className="rounded-full bg-[#309be8]" style={{ width: `${row.percent}%` }} />
                                        </div>
                                        <p className="text-[#4e7997] text-sm text-right">{row.percent}%</p>
                                    </React.Fragment>
                                ))}
                            </div>
                        </div>
                        {/* 리뷰 */}
                        <h2 className="text-[#0e151b] text-[22px] font-bold px-4 pb-3 pt-5">Reviews</h2>
                        <div className="flex flex-col gap-8 bg-slate-50 p-4">
                            {place.reviews.map((r, i) => (
                                <div key={i} className="flex flex-col gap-3 bg-slate-50">
                                    <div className="flex items-center gap-3">
                                        <div className="bg-center bg-no-repeat aspect-square bg-cover rounded-full size-10"
                                             style={{ backgroundImage: `url(${r.userImg})` }} />
                                        <div className="flex-1">
                                            <p className="text-[#0e151b] text-base font-medium">{r.user}</p>
                                            <p className="text-[#4e7997] text-sm">{r.date}</p>
                                        </div>
                                    </div>
                                    <div className="flex gap-0.5">
                                        {[1,2,3,4,5].map(i=>(
                                            <Star key={i} filled={i <= r.rating} />
                                        ))}
                                    </div>
                                    <p className="text-[#0e151b] text-base">{r.comment}</p>
                                    <div className="flex gap-9 text-[#4e7997]">
                                        <button className="flex items-center gap-2">
                                            <span>👍</span>
                                            <p>{r.likes}</p>
                                        </button>
                                        <button className="flex items-center gap-2">
                                            <span>👎</span>
                                            <p>{r.dislikes}</p>
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>
                        {/* 부가 정보 */}
                        <h2 className="text-[#0e151b] text-[22px] font-bold px-4 pb-3 pt-5">Additional Information</h2>
                        <div className="p-4 grid grid-cols-[20%_1fr] gap-x-6">
                            <div className="col-span-2 grid grid-cols-subgrid border-t border-t-[#d0dde7] py-5">
                                <p className="text-[#4e7997] text-sm">Hours</p>
                                <p className="text-[#0e151b] text-sm">{place.additional.hours}</p>
                            </div>
                            <div className="col-span-2 grid grid-cols-subgrid border-t border-t-[#d0dde7] py-5">
                                <p className="text-[#4e7997] text-sm">Phone</p>
                                <p className="text-[#0e151b] text-sm">{place.additional.phone}</p>
                            </div>
                            <div className="col-span-2 grid grid-cols-subgrid border-t border-t-[#d0dde7] py-5">
                                <p className="text-[#4e7997] text-sm">Website</p>
                                <p className="text-[#0e151b] text-sm">{place.additional.website}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
