import { Route, Routes } from "react-router-dom";
import LivingRoom from "../components/Roomcomponent/Livingroom";

export default function RoomRoutes(){
    return(
        <Routes>
            <Route path="/rooms/living-room" element={<LivingRoom/>}/>
        </Routes>
    )
}