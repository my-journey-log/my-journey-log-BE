import React, { useState } from "react";

export default function PostCreate() {
    const [content, setContent] = useState("");
    const [visibility, setVisibility] = useState("Public");

    const handlePost = () => {
        alert(`Post Content: ${content}\nVisibility: ${visibility}`);
    };

    const handleCancel = () => {
        setContent("");
        setVisibility("Public");
    };

    return (
        <div className="min-h-screen bg-slate-50 font-['Plus_Jakarta_Sans','Noto_Sans',sans-serif]">
            <div className="layout-container flex h-full flex-col">
                <header className="flex items-center justify-between border-b border-solid border-b-[#e7eef3] px-10 py-3">
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
                    <div className="flex gap-2">
                        <button
                            onClick={handlePost}
                            className="flex min-w-[84px] max-w-[480px] cursor-pointer items-center justify-center rounded-xl h-10 px-4 bg-[#309be8] text-slate-50 text-sm font-bold leading-normal tracking-[0.015em]"
                        >
                            Post
                        </button>
                        <button
                            onClick={handleCancel}
                            className="flex min-w-[84px] max-w-[480px] cursor-pointer items-center justify-center rounded-xl h-10 px-4 bg-[#e7eef3] text-[#0e151b] text-sm font-bold leading-normal tracking-[0.015em]"
                        >
                            Cancel
                        </button>
                    </div>
                </header>

                <div className="px-40 flex flex-1 justify-center py-5">
                    <div className="layout-content-container flex flex-col w-[512px] max-w-[512px] py-5 max-w-[960px] flex-1">
                        <div className="flex max-w-[480px] flex-wrap items-end gap-4 px-4 py-3">
                            <label className="flex flex-col min-w-40 flex-1">
                <textarea
                    placeholder="Share your experience"
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                    className="form-input flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-xl text-[#0e151b] focus:outline-0 focus:ring-0 border-none bg-[#e7eef3] focus:border-none min-h-36 placeholder:text-[#4e7997] p-4 text-base font-normal leading-normal"
                />
                            </label>
                        </div>

                        <div className="flex w-full grow bg-slate-50 @container p-4">
                            <div
                                className="w-full gap-1 overflow-hidden bg-slate-50 @[480px]:gap-2 aspect-[3/2] rounded-xl flex"
                                style={{
                                    backgroundImage:
                                        'url("https://lh3.googleusercontent.com/aida-public/AB6AXuAcGb8j8JCW7c6a6o2qm8-YmmK1xqoEKMA7EvuRG-0Cd3AP1w5q2S46W-_nLqwMVmCYbq8W7MxEL0fx5086eKKaDMfOyioav4ckx08DghzLN9HzGvQ40aIzeTAMNLrOTBKZI_H_GgubjJvyK0DJD-bMw7bmNnMGuA4ml44K3QJkQxK8szRHQg7o8OZqbKgDj57ztDuKrglNjN7gem3ruvItIm94ekeT5LaerNVawWnHz7H0EyJJOrg1qcUtoicJ-yuub3-FkN2b_ACD")',
                                }}
                            ></div>
                        </div>

                        <div className="flex gap-3 p-3 flex-wrap pr-4">
                            {["Location", "Date", "Travelers"].map((tag) => (
                                <div
                                    key={tag}
                                    className="flex h-8 shrink-0 items-center justify-center gap-x-2 rounded-xl bg-[#e7eef3] pl-4 pr-4"
                                >
                                    <p className="text-[#0e151b] text-sm font-medium leading-normal">
                                        {tag}
                                    </p>
                                </div>
                            ))}
                        </div>

                        <div className="flex flex-wrap gap-3 p-4">
                            {["Public", "Friends", "Private"].map((option) => (
                                <label
                                    key={option}
                                    className="text-sm font-medium leading-normal flex items-center justify-center rounded-xl border border-[#d0dde7] px-4 h-11 text-[#0e151b] cursor-pointer relative
                    has-[:checked]:border-[3px] has-[:checked]:px-3.5 has-[:checked]:border-[#309be8]"
                                >
                                    {option}
                                    <input
                                        type="radio"
                                        name="visibility"
                                        className="invisible absolute"
                                        checked={visibility === option}
                                        onChange={() => setVisibility(option)}
                                    />
                                </label>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
