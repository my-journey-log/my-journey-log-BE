import React from "react";

export default function TripCalendar() {
    return (
        <div
            className="relative flex size-full min-h-screen flex-col bg-slate-50 group/design-root overflow-x-hidden"
            style={{ fontFamily: '"Plus Jakarta Sans", "Noto Sans", sans-serif' }}
        >
            <div className="layout-container flex h-full grow flex-col">
                <header className="flex items-center justify-between whitespace-nowrap border-b border-solid border-b-[#e7eef3] px-10 py-3">
                    <div className="flex items-center gap-8">
                        <div className="flex items-center gap-4 text-[#0e151b]">
                            <div className="size-4">
                                <svg
                                    viewBox="0 0 48 48"
                                    fill="none"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <path
                                        d="M44 11.2727C44 14.0109 39.8386 16.3957 33.69 17.6364C39.8386 18.877 44 21.2618 44 24C44 26.7382 39.8386 29.123 33.69 30.3636C39.8386 31.6043 44 33.9891 44 36.7273C44 40.7439 35.0457 44 24 44C12.9543 44 4 40.7439 4 36.7273C4 33.9891 8.16144 31.6043 14.31 30.3636C8.16144 29.123 4 26.7382 4 24C4 21.2618 8.16144 18.877 14.31 17.6364C8.16144 16.3957 4 14.0109 4 11.2727C4 7.25611 12.9543 4 24 4C35.0457 4 44 7.25611 44 11.2727Z"
                                        fill="currentColor"
                                    ></path>
                                </svg>
                            </div>
                            <h2 className="text-[#0e151b] text-lg font-bold leading-tight tracking-[-0.015em]">
                                Wanderlust
                            </h2>
                        </div>
                        <div className="flex items-center gap-9">
                            <a className="text-[#0e151b] text-sm font-medium leading-normal" href="#">
                                Explore
                            </a>
                            <a className="text-[#0e151b] text-sm font-medium leading-normal" href="#">
                                Create
                            </a>
                            <a className="text-[#0e151b] text-sm font-medium leading-normal" href="#">
                                Trips
                            </a>
                            <a className="text-[#0e151b] text-sm font-medium leading-normal" href="#">
                                Inbox
                            </a>
                        </div>
                    </div>
                    <div className="flex flex-1 justify-end gap-8">
                        <label className="flex flex-col min-w-40 !h-10 max-w-64">
                            <div className="flex w-full flex-1 items-stretch rounded-xl h-full">
                                <div
                                    className="text-[#4e7997] flex border-none bg-[#e7eef3] items-center justify-center pl-4 rounded-l-xl border-r-0"
                                    data-icon="MagnifyingGlass"
                                    data-size="24px"
                                    data-weight="regular"
                                >
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        width="24px"
                                        height="24px"
                                        fill="currentColor"
                                        viewBox="0 0 256 256"
                                    >
                                        <path
                                            d="M229.66,218.34l-50.07-50.06a88.11,88.11,0,1,0-11.31,11.31l50.06,50.07a8,8,0,0,0,11.32-11.32ZM40,112a72,72,0,1,1,72,72A72.08,72.08,0,0,1,40,112Z"
                                        ></path>
                                    </svg>
                                </div>
                                <input
                                    placeholder="Search"
                                    className="form-input flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-xl text-[#0e151b] focus:outline-0 focus:ring-0 border-none bg-[#e7eef3] focus:border-none h-full placeholder:text-[#4e7997] px-4 rounded-l-none border-l-0 pl-2 text-base font-normal leading-normal"
                                    defaultValue=""
                                />
                            </div>
                        </label>
                        <button className="flex max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-xl h-10 bg-[#e7eef3] text-[#0e151b] gap-2 text-sm font-bold leading-normal tracking-[0.015em] min-w-0 px-2.5">
                            <div
                                className="text-[#0e151b]"
                                data-icon="Bell"
                                data-size="20px"
                                data-weight="regular"
                            >
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="20px"
                                    height="20px"
                                    fill="currentColor"
                                    viewBox="0 0 256 256"
                                >
                                    <path
                                        d="M221.8,175.94C216.25,166.38,208,139.33,208,104a80,80,0,1,0-160,0c0,35.34-8.26,62.38-13.81,71.94A16,16,0,0,0,48,200H88.81a40,40,0,0,0,78.38,0H208a16,16,0,0,0,13.8-24.06ZM128,216a24,24,0,0,1-22.62-16h45.24A24,24,0,0,1,128,216ZM48,184c7.7-13.24,16-43.92,16-80a64,64,0,1,1,128,0c0,36.05,8.28,66.73,16,80Z"
                                    ></path>
                                </svg>
                            </div>
                        </button>
                        <div
                            className="bg-center bg-no-repeat aspect-square bg-cover rounded-full size-10"
                            style={{
                                backgroundImage:
                                    "url('https://lh3.googleusercontent.com/aida-public/AB6AXuAfnqKY6oa769pCkFuqNxUXEJNbSTl2OVEX38uhSFG5LFT_M4zIXalz4EVSdsSpgKsKzqk_czBfz0uelobVDf_QXW4UM2uTm4oDFB7OOBGQ9yewuvAuV48r3Lk9MeEGMb4B-mAmTk0e5ANq_ito7ekHa_xYpbljTfUFPRfrfFvDeRl5Y5yCIwg-2ysgjDcgry6SPXZs81IbjDkZ-XCNs8wAcTM34HTUItbBrytrLTrdg5jKPTs8VXn2Y-FXsWs8Qpj4I7ia6KECI-l9')",
                            }}
                        ></div>
                    </div>
                </header>
                <div className="px-40 flex flex-1 justify-center py-5">
                    <div className="layout-content-container flex flex-col max-w-[960px] flex-1">
                        {/* 상단 탭 및 버튼 */}
                        <div className="flex flex-wrap justify-between gap-3 p-4">
                            <p className="text-[#0e151b] tracking-light text-[32px] font-bold leading-tight min-w-72">
                                My Trips
                            </p>
                            <button className="flex min-w-[84px] max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-xl h-8 px-4 bg-[#e7eef3] text-[#0e151b] text-sm font-medium leading-normal">
                                <span className="truncate">New Trip</span>
                            </button>
                        </div>

                        {/* 탭 메뉴 */}
                        <div className="pb-3">
                            <div className="flex border-b border-[#d0dde7] px-4 gap-8">
                                <a
                                    className="flex flex-col items-center justify-center border-b-[3px] border-b-[#309be8] text-[#0e151b] pb-[13px] pt-4"
                                    href="#"
                                >
                                    <p className="text-[#0e151b] text-sm font-bold leading-normal tracking-[0.015em]">
                                        Calendar
                                    </p>
                                </a>
                                <a
                                    className="flex flex-col items-center justify-center border-b-[3px] border-b-transparent text-[#4e7997] pb-[13px] pt-4"
                                    href="#"
                                >
                                    <p className="text-[#4e7997] text-sm font-bold leading-normal tracking-[0.015em]">
                                        List
                                    </p>
                                </a>
                            </div>
                        </div>

                        {/* 캘린더 및 일정 리스트 */}
                        <div className="flex flex-wrap items-center justify-center gap-6 p-4">
                            {/* 캘린더 1 */}
                            <div className="flex min-w-72 max-w-[336px] flex-1 flex-col gap-0.5">
                                <div className="flex items-center p-1 justify-between">
                                    <button>
                                        <div
                                            className="text-[#0e151b] flex size-10 items-center justify-center"
                                            data-icon="CaretLeft"
                                            data-size="18px"
                                            data-weight="regular"
                                        >
                                            <svg
                                                xmlns="http://www.w3.org/2000/svg"
                                                width="18px"
                                                height="18px"
                                                fill="currentColor"
                                                viewBox="0 0 256 256"
                                            >
                                                <path d="M165.66,202.34a8,8,0,0,1-11.32,11.32l-80-80a8,8,0,0,1,0-11.32l80-80a8,8,0,0,1,11.32,11.32L91.31,128Z"></path>
                                            </svg>
                                        </div>
                                    </button>
                                    <p className="text-[#0e151b] text-base font-bold leading-tight flex-1 text-center pr-10">
                                        July 2024
                                    </p>
                                </div>
                                <div className="grid grid-cols-7">
                                    {["S", "M", "T", "W", "T", "F", "S"].map((day) => (
                                        <p
                                            key={day}
                                            className="text-[#0e151b] text-[13px] font-bold leading-normal tracking-[0.015em] flex h-12 w-full items-center justify-center pb-0.5"
                                        >
                                            {day}
                                        </p>
                                    ))}
                                    {/* 날짜 버튼들 */}
                                    {[
                                        1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18,
                                        19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30,
                                    ].map((date) => {
                                        const isSelected = date === 5;
                                        return (
                                            <button
                                                key={date}
                                                className={`h-12 w-full text-sm font-medium leading-normal ${
                                                    isSelected ? "text-slate-50" : "text-[#0e151b]"
                                                } flex items-center justify-center rounded-full ${
                                                    isSelected ? "bg-[#309be8]" : ""
                                                }`}
                                            >
                                                <div className="flex size-full items-center justify-center rounded-full">
                                                    {date}
                                                </div>
                                            </button>
                                        );
                                    })}
                                </div>
                            </div>

                            {/* 캘린더 2 */}
                            <div className="flex min-w-72 max-w-[336px] flex-1 flex-col gap-0.5">
                                <div className="flex items-center p-1 justify-between">
                                    <p className="text-[#0e151b] text-base font-bold leading-tight flex-1 text-center pl-10">
                                        August 2024
                                    </p>
                                    <button>
                                        <div
                                            className="text-[#0e151b] flex size-10 items-center justify-center"
                                            data-icon="CaretRight"
                                            data-size="18px"
                                            data-weight="regular"
                                        >
                                            <svg
                                                xmlns="http://www.w3.org/2000/svg"
                                                width="18px"
                                                height="18px"
                                                fill="currentColor"
                                                viewBox="0 0 256 256"
                                            >
                                                <path d="M181.66,133.66l-80,80a8,8,0,0,1-11.32-11.32L164.69,128,90.34,53.66a8,8,0,0,1,11.32-11.32l80,80A8,8,0,0,1,181.66,133.66Z"></path>
                                            </svg>
                                        </div>
                                    </button>
                                </div>
                                <div className="grid grid-cols-7">
                                    {["S", "M", "T", "W", "T", "F", "S"].map((day) => (
                                        <p
                                            key={day}
                                            className="text-[#0e151b] text-[13px] font-bold leading-normal tracking-[0.015em] flex h-12 w-full items-center justify-center pb-0.5"
                                        >
                                            {day}
                                        </p>
                                    ))}
                                    {[...Array(30).keys()].map((i) => {
                                        const date = i + 1;
                                        return (
                                            <button
                                                key={date}
                                                className="h-12 w-full text-[#0e151b] text-sm font-medium leading-normal flex items-center justify-center rounded-full"
                                            >
                                                <div className="flex size-full items-center justify-center rounded-full">
                                                    {date}
                                                </div>
                                            </button>
                                        );
                                    })}
                                </div>
                            </div>
                        </div>

                        {/* 일정 목록 */}
                        <h3 className="text-[#0e151b] text-lg font-bold leading-tight tracking-[-0.015em] px-4 pb-2 pt-4">
                            July 2024
                        </h3>
                        <div className="flex items-center gap-4 bg-slate-50 px-4 py-3">
                            <div
                                className="bg-center bg-no-repeat aspect-video bg-cover rounded-lg h-14 w-fit"
                                style={{
                                    backgroundImage:
                                        "url('https://lh3.googleusercontent.com/aida-public/AB6AXuAdbe6t28hNU3KvBrz5-aOtGhxjc327ZM1VH148Sgua1mVXHVaQNNLp9-eR7WXS8huBO5oVqqGNtNV4DYTpgVSiNm2G61LuM6OZO1oBhj54VdpSttm9Sr5pRAl4X3Ro19Osaz1UbNwjfctpX1HmXS3lCvPNTAIAhdKr38IKaLaGRzZBE9vQg8Y9BW64WwMri4I6kRAZbx-5F1QF3B4G0TL70ubuL6Er9Eudzl1CaA7UTFBzuLOZYsAwtyuY15lpUducNngoLCJf1qKG')",
                                }}
                            ></div>
                            <div className="flex flex-col justify-center">
                                <p className="text-[#0e151b] text-base font-medium leading-normal line-clamp-1">
                                    Weekend Getaway to the Coast
                                </p>
                                <p className="text-[#4e7997] text-sm font-normal leading-normal line-clamp-2">
                                    July 12 - 14
                                </p>
                            </div>
                        </div>
                        <div className="flex items-center gap-4 bg-slate-50 px-4 py-3">
                            <div
                                className="bg-center bg-no-repeat aspect-video bg-cover rounded-lg h-14 w-fit"
                                style={{
                                    backgroundImage:
                                        "url('https://lh3.googleusercontent.com/aida-public/AB6AXuAG9faBotfRlyL8p22x8bbOU8P8E6L-GsSCzEUnf2EPFBIr9O1b801kx7O8rutN66ejGnt3h6AxvhTyBHTF77Z6gkNbkjHwzSyVDwvqZCBIyLpRu4bqMFKBCdFCC-nQhb7YlHXOMe_rGSFKtM1aQWLtjMt_SzjTYRgvLnVc_18f2D-AFTIxk_Jiy0MnI6BIehSecwhoGvFh3XNLDgRduI1qqfZ6AqpLT0xgZGG5KBYJ8KfMyCRuLLs-3vnxzaBV1azDYNVCkz1lzslj')",
                                }}
                            ></div>
                            <div className="flex flex-col justify-center">
                                <p className="text-[#0e151b] text-base font-medium leading-normal line-clamp-1">
                                    Exploring the Mountains
                                </p>
                                <p className="text-[#4e7997] text-sm font-normal leading-normal line-clamp-2">
                                    July 20 - 25
                                </p>
                            </div>
                        </div>
                        <h3 className="text-[#0e151b] text-lg font-bold leading-tight tracking-[-0.015em] px-4 pb-2 pt-4">
                            August 2024
                        </h3>
                        <div className="flex items-center gap-4 bg-slate-50 px-4 py-3">
                            <div
                                className="bg-center bg-no-repeat aspect-video bg-cover rounded-lg h-14 w-fit"
                                style={{
                                    backgroundImage:
                                        "url('https://lh3.googleusercontent.com/aida-public/AB6AXuB7mAauwkojdfm53mwiQ6jSLDXL0E4Z5lNdsf-149R8-3JEn-6ALOWJhM61potmdQ4lzXNAfcZjjr6VV-sIshMTuFk9FvNP3k-JoOiL5vczMDxqB1fLKU0sdpH5Pvge20TixCv10umjES6My2tzWC9Vcgt-fml2G9fFSWsZ5lQYA_mKaIhUVycyrH6Dfk4drS5BBgolMFIOeXpKx3n2XlLboKyPuklGrVHGwDpWJuxkvZZoPLGfDUa7_CHXAhCzJsyD_2MfI4ISYlAl')",
                                }}
                            ></div>
                            <div className="flex flex-col justify-center">
                                <p className="text-[#0e151b] text-base font-medium leading-normal line-clamp-1">
                                    City Break in Metropolis
                                </p>
                                <p className="text-[#4e7997] text-sm font-normal leading-normal line-clamp-2">
                                    August 5 - 10
                                </p>
                            </div>
                        </div>
                        <div className="flex items-center gap-4 bg-slate-50 px-4 py-3">
                            <div
                                className="bg-center bg-no-repeat aspect-video bg-cover rounded-lg h-14 w-fit"
                                style={{
                                    backgroundImage:
                                        "url('https://lh3.googleusercontent.com/aida-public/AB6AXuC0GivF5YTSOcdT5_aXzRMHcVdpmz-_NnZxH5ycn550z4IW0fhTqilGO9k9XS0nZeAR_DqW1p_JdrbeoEvD5NQHphEcuuD9LJO5b5zUJnViQEQbZLvMdzVxnr3xzMZbOZPK4_S4HZQ2H_7eGxk73nTUGapALj_UrRYdlds-Nf0xoTrz-pPalPLOfZ44U-nZvgDi5CTxPd54t-MgkzrYXwCiAUyFbIe7a87X2s-g7AhilZNBcNXM7gI2Uz0SJhVokLsGHEOXXqMgOSQe')",
                                }}
                            ></div>
                            <div className="flex flex-col justify-center">
                                <p className="text-[#0e151b] text-base font-medium leading-normal line-clamp-1">
                                    Relaxing Beach Vacation
                                </p>
                                <p className="text-[#4e7997] text-sm font-normal leading-normal line-clamp-2">
                                    August 18 - 22
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
