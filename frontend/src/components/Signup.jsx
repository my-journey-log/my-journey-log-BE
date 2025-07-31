import { useState } from "react";

function Signup() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [nickname, setNickname] = useState("");
    const [agreeTerms, setAgreeTerms] = useState(false);
    const [agreePrivacy, setAgreePrivacy] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!agreeTerms || !agreePrivacy) {
            alert("약관 및 개인정보 동의가 필요합니다.");
            return;
        }
        // TODO: 회원가입 API 연동 예정
        alert(`회원가입 정보\n이메일: ${email}\n닉네임: ${nickname}`);
    };

    return (
        <div
            className="relative flex size-full min-h-screen flex-col bg-slate-50 group/design-root overflow-x-hidden"
            style={{
                fontFamily: '"Plus Jakarta Sans", "Noto Sans", sans-serif',
                "--checkbox-tick-svg":
                    "url('data:image/svg+xml,%3csvg viewBox=%270 0 16 16%27 fill=%27rgb(248,250,252)%27 xmlns=%27http://www.w3.org/2000/svg%27%3e%3cpath d=%27M12.207 4.793a1 1 0 010 1.414l-5 5a1 1 0 01-1.414 0l-2-2a1 1 0 011.414-1.414L6.5 9.086l4.293-4.293a1 1 0 011.414 0z%27/%3e%3c/svg%3e')",
            }}
        >
            <div className="layout-container flex h-full grow flex-col">
                <header className="flex items-center justify-between whitespace-nowrap border-b border-solid border-b-[#e7eef3] px-10 py-3">
                    <div className="flex items-center gap-4 text-[#0d161b]">
                        <div className="size-4">
                            <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path
                                    d="M44 11.2727C44 14.0109 39.8386 16.3957 33.69 17.6364C39.8386 18.877 44 21.2618 44 24C44 26.7382 39.8386 29.123 33.69 30.3636C39.8386 31.6043 44 33.9891 44 36.7273C44 40.7439 35.0457 44 24 44C12.9543 44 4 40.7439 4 36.7273C4 33.9891 8.16144 31.6043 14.31 30.3636C8.16144 29.123 4 26.7382 4 24C4 21.2618 8.16144 18.877 14.31 17.6364C8.16144 16.3957 4 14.0109 4 11.2727C4 7.25611 12.9543 4 24 4C35.0457 4 44 7.25611 44 11.2727Z"
                                    fill="currentColor"
                                ></path>
                            </svg>
                        </div>
                        <h2 className="text-[#0d161b] text-lg font-bold leading-tight tracking-[-0.015em]">Wanderlust</h2>
                    </div>
                    <div className="flex flex-1 justify-end gap-8">
                        <div className="flex items-center gap-9">
                            <a className="text-[#0d161b] text-sm font-medium leading-normal" href="#">Explore</a>
                            <a className="text-[#0d161b] text-sm font-medium leading-normal" href="#">Create</a>
                            <a className="text-[#0d161b] text-sm font-medium leading-normal" href="#">Community</a>
                        </div>
                        <button
                            className="flex min-w-[84px] max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-full h-10 px-4 bg-[#e7eef3] text-[#0d161b] text-sm font-bold leading-normal tracking-[0.015em]"
                            type="button"
                        >
                            <span className="truncate">Log in</span>
                        </button>
                    </div>
                </header>
                <div className="px-40 flex flex-1 justify-center py-5">
                    <form
                        className="layout-content-container flex flex-col w-[512px] max-w-[512px] py-5 max-w-[960px] flex-1"
                        onSubmit={handleSubmit}
                    >
                        <h2 className="text-[#0d161b] tracking-light text-[28px] font-bold leading-tight px-4 text-center pb-3 pt-5">Sign up</h2>
                        <div className="px-4">
                            <label className="flex gap-x-3 py-3 flex-row">
                                <input
                                    type="checkbox"
                                    className="h-5 w-5 rounded border-[#cfdde7] border-2 bg-transparent text-[#1391eb] checked:bg-[#1391eb] checked:border-[#1391eb] checked:bg-[image:--checkbox-tick-svg] focus:ring-0 focus:ring-offset-0 focus:border-[#cfdde7] focus:outline-none"
                                    checked={agreeTerms}
                                    onChange={e => setAgreeTerms(e.target.checked)}
                                />
                                <p className="text-[#0d161b] text-base font-normal leading-normal">I agree to the Terms of Service</p>
                            </label>
                            <label className="flex gap-x-3 py-3 flex-row">
                                <input
                                    type="checkbox"
                                    className="h-5 w-5 rounded border-[#cfdde7] border-2 bg-transparent text-[#1391eb] checked:bg-[#1391eb] checked:border-[#1391eb] checked:bg-[image:--checkbox-tick-svg] focus:ring-0 focus:ring-offset-0 focus:border-[#cfdde7] focus:outline-none"
                                    checked={agreePrivacy}
                                    onChange={e => setAgreePrivacy(e.target.checked)}
                                />
                                <p className="text-[#0d161b] text-base font-normal leading-normal">I agree to the Privacy Policy</p>
                            </label>
                        </div>
                        <div className="flex max-w-[480px] flex-wrap items-end gap-4 px-4 py-3">
                            <label className="flex flex-col min-w-40 flex-1">
                                <input
                                    placeholder="Email"
                                    className="form-input flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-xl text-[#0d161b] focus:outline-0 focus:ring-0 border-none bg-[#e7eef3] focus:border-none h-14 placeholder:text-[#4c799a] p-4 text-base font-normal leading-normal"
                                    value={email}
                                    onChange={e => setEmail(e.target.value)}
                                    required
                                />
                            </label>
                        </div>
                        <div className="flex max-w-[480px] flex-wrap items-end gap-4 px-4 py-3">
                            <label className="flex flex-col min-w-40 flex-1">
                                <input
                                    placeholder="Password"
                                    type="password"
                                    className="form-input flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-xl text-[#0d161b] focus:outline-0 focus:ring-0 border-none bg-[#e7eef3] focus:border-none h-14 placeholder:text-[#4c799a] p-4 text-base font-normal leading-normal"
                                    value={password}
                                    onChange={e => setPassword(e.target.value)}
                                    required
                                />
                            </label>
                        </div>
                        <div className="flex max-w-[480px] flex-wrap items-end gap-4 px-4 py-3">
                            <label className="flex flex-col min-w-40 flex-1">
                                <input
                                    placeholder="Nickname"
                                    className="form-input flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-xl text-[#0d161b] focus:outline-0 focus:ring-0 border-none bg-[#e7eef3] focus:border-none h-14 placeholder:text-[#4c799a] p-4 text-base font-normal leading-normal"
                                    value={nickname}
                                    onChange={e => setNickname(e.target.value)}
                                    required
                                />
                            </label>
                        </div>
                        <div className="flex px-4 py-3">
                            <button
                                className="flex min-w-[84px] max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-full h-10 px-4 flex-1 bg-[#1391eb] text-slate-50 text-sm font-bold leading-normal tracking-[0.015em]"
                                type="submit"
                            >
                                <span className="truncate">Sign up</span>
                            </button>
                        </div>
                        <p className="text-[#4c799a] text-sm font-normal leading-normal pb-3 pt-1 px-4 text-center underline">
                            Already have an account? Log in
                        </p>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default Signup;
