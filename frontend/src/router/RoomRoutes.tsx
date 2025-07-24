import { Route, Routes } from "react-router-dom";

import BathRoom from "../components/Roomcomponent/BathRoom";
import LivingRoom from "../components/Roomcomponent/LivingRoom";
import BedRoom from "../components/Roomcomponent/BedRoom";
import Kitchen from "../components/Roomcomponent/Kitchen";
import KitsRoom from "../components/Roomcomponent/KidRoom";

export default function RoomRoutes() {
    return (
        <Routes>
            <Route path="/rooms/living-room" element={<LivingRoom />} />
            <Route path="/rooms/bathroom" element={<BathRoom />} />
            <Route path="/rooms/bedroom" element={<BedRoom />} />
            <Route path="/rooms/kitchen" element={<Kitchen />} />
            <Route path="/rooms/kids-room" element={<KitsRoom />} />
        </Routes>
    );
}
