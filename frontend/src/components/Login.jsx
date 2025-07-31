import { useState } from "react";
import axios from "axios";

function Login({ onLogin }) {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");

        try {
            const res = await axios.post("/api/v1/users/login", {
                email,
                password,
            });
            onLogin(res.data);
        } catch (err) {
            setError("로그인 실패. 이메일 또는 비밀번호를 확인하세요.");
        }
    };

    return (
        <div className="relative flex size-full min-h-screen flex-col bg-slate-50 group/design-root overflow-x-hidden" style={{ fontFamily: '"Plus Jakarta Sans", "Noto Sans", sans-serif' }}>
            <div className="layout-container flex h-full grow flex-col">
                <header className="flex items-center justify-between whitespace-nowrap border-b border-solid border-b-[#e7eef3] px-10 py-3">
                </header>
                <form className="px-40 flex flex-1 justify-center py-5" onSubmit={handleSubmit}>
                    <div className="layout-content-container flex flex-col w-[512px] max-w-[512px] py-5 max-w-[960px] flex-1">
                        <h2 className="text-[#0d161b] tracking-light text-[28px] font-bold leading-tight px-4 text-center pb-3 pt-5">Welcome back</h2>
                        <div className="flex max-w-[480px] flex-wrap items-end gap-4 px-4 py-3">
                            <label className="flex flex-col min-w-40 flex-1">
                                <p className="text-[#0d161b] text-base font-medium leading-normal pb-2">Email</p>
                                <input
                                    placeholder="Email"
                                    className="form-input flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-xl text-[#0d161b] focus:outline-0 focus:ring-0 border border-[#cfdde7] bg-slate-50 focus:border-[#cfdde7] h-14 placeholder:text-[#4c799a] p-[15px] text-base font-normal leading-normal"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    required
                                />
                            </label>
                        </div>
                        <div className="flex max-w-[480px] flex-wrap items-end gap-4 px-4 py-3">
                            <label className="flex flex-col min-w-40 flex-1">
                                <p className="text-[#0d161b] text-base font-medium leading-normal pb-2">Password</p>
                                <input
                                    type="password"
                                    placeholder="Password"
                                    className="form-input flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-xl text-[#0d161b] focus:outline-0 focus:ring-0 border border-[#cfdde7] bg-slate-50 focus:border-[#cfdde7] h-14 placeholder:text-[#4c799a] p-[15px] text-base font-normal leading-normal"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    required
                                />
                            </label>
                        </div>
                        <p className="text-[#4c799a] text-sm font-normal leading-normal pb-3 pt-1 px-4 underline">Forgot password?</p>
                        {error && <div className="text-red-500 px-4 pb-3">{error}</div>}
                        <div className="flex px-4 py-3">
                            <button
                                className="flex min-w-[84px] max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-full h-12 px-5 flex-1 bg-[#1391eb] text-slate-50 text-base font-bold leading-normal tracking-[0.015em]"
                                type="submit"
                            >
                                <span className="truncate">Log in</span>
                            </button>
                        </div>
                        <p className="text-[#4c799a] text-sm font-normal leading-normal pb-3 pt-1 px-4 text-center underline">Don't have an account? Sign up</p>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default Login;
