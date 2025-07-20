import { Route, Routes } from "react-router-dom";

import BathRoom from "../components/Roomcomponent/BathRoom";
import LivingRoom from "../components/Roomcomponent/LivingRoom";
import BedRoom from "../components/Roomcomponent/BedRoom";
import Kitchen from "../components/Roomcomponent/Kitchen";

export default function RoomRoutes() {
    return (
        <Routes>
            <Route path="/rooms/living-room" element={<LivingRoom />} />
            <Route path="/rooms/bathroom" element={<BathRoom />} />
            <Route path="/rooms/bedroom" element={<BedRoom />} />
            <Route path="/rooms/kitchen" element={<Kitchen />} />
        </Routes>
    );
}
