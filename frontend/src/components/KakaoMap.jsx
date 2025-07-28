import { useEffect, useRef } from "react";

function KakaoMap() {
    const mapRef = useRef(null);

    useEffect(() => {
        if (!window.kakao || !window.kakao.maps) {
            const script = document.createElement("script");
            script.src =
                "https://dapi.kakao.com/v2/maps/sdk.js?appkey=e7cd40de368883583525cde467f28757&autoload=false";
            script.async = true;
            document.head.appendChild(script);

            script.onload = () => {
                window.kakao.maps.load(() => {
                    drawMap();
                });
            };
        } else {
            window.kakao.maps.load(() => {
                drawMap();
            });
        }

        function drawMap() {
            if (!mapRef.current) return;
            new window.kakao.maps.Map(mapRef.current, {
                center: new window.kakao.maps.LatLng(37.5665, 126.9780),
                level: 3,
            });
        }
    }, []);

    return (
        <div
            ref={mapRef}
            style={{
                width: "90vw",
                height: "70vh",
                margin: "32px auto",
                borderRadius: "16px",
                boxShadow: "0 2px 8px rgba(0,0,0,0.15)",
                background: "#fff",
            }}
        ></div>
    );
}

export default KakaoMap;
