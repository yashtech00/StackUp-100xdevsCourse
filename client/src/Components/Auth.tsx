
export const Auth = ({type} : {type:"signup" | "login"}) => {
    return (
        <div>
            <div className="">
                <form>
                    <div className="">
                        <label>UserName</label>
                        <input
                            placeholder="Enter Username"
                        />
                    </div>
                    <div className="">
                        <label>Email</label>
                        <input
                            placeholder="Enter Email"
                        />
                    </div>
                    <div className="">
                        <label>Password</label>
                        <input
                            placeholder="Enter Password"
                        />
                    </div>

                </form>
            </div>

        </div>
    )
}