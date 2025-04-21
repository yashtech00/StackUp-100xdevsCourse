
import { Auth } from "../Components/Auth";
import { Quote } from "../Components/Quote";

export default function Signup  () {
    return (
        <div >
            <div className="grid grid-cols-2">
                <div>
                    <Auth type={"signup"} />
                </div>
                <div>
                    <Quote/>
                </div>
            </div>
       </div>
    )
}