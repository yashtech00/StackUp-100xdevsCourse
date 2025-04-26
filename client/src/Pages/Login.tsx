import { Auth } from "../Components/Auth";
import { Quote } from "../Components/Quote";

export default function Login  () {
    return (
        <div className=" ">
            <div className="grid grid-cols-2">
                <div>
                    <Auth type={ "login"} />
                </div>
                <div>
                    <Quote/>
                </div>
            </div>
      </div>
    )
}