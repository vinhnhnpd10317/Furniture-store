import { Route, Routes } from "react-router-dom";

import BathRoom from "../components/Roomcomponent/BathRoom";
import LivingRoom from "../components/Roomcomponent/LivingRoom";

export default function RoomRoutes(){
    return(
        <Routes>
            <Route path="/rooms/living-room" element={<LivingRoom/>}/>
            <Route path="/rooms/bathroom" element={<BathRoom/>}/>
        </Routes>
    )
}