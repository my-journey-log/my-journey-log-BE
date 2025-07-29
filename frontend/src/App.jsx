import { useState } from "react";
import Login from "./components/Login";

function App() {
    const [user, setUser] = useState(null);

    if (!user) {
        return <Login onLogin={setUser} />;
    }

    return (
        <div>
            <h1>안녕하세요, {user.nickname || user.email}!</h1>
            {/* 로그인 후 메인화면 */}
        </div>
    );
}

export default App;
