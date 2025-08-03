import { useEffect, useRef, useState } from "react";
import axios from "axios";

function KakaoMap() {
    const mapRef = useRef(null);
    const [locationData, setLocationData] = useState(null);

    useEffect(() => {
        axios
            .get(`https://dapi.kakao.com/v2/local/search/address.json?query=서울`, {
                headers: {
                    Authorization: `KakaoAK e7cd40de368883583525cde467f28757`,
                },
            })
            .then((response) => {
                const location = response.data.documents[0].road_address
                    ? response.data.documents[0].road_address
                    : response.data.documents[0].address;
                setLocationData(location);
            })
            .catch((error) => {
                console.error("위치 데이터 로딩 오류:", error);
            });
    }, []);

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

            const map = new window.kakao.maps.Map(mapRef.current, {
                center: new window.kakao.maps.LatLng(37.5665, 126.9780),
                level: 3,
            });

            if (locationData) {
                const position = new window.kakao.maps.LatLng(locationData.y, locationData.x);
                const marker = new window.kakao.maps.Marker({
                    position: position,
                });
                marker.setMap(map);
            }
        }
    }, [locationData]);

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
