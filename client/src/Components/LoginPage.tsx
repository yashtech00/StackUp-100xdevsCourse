
export const LoginPage = () => {
    return (
        <div>
            <img width={300} alt="image" src="https://i.pinimg.com/736x/3c/8c/0a/3c8c0a7ffd3e0dd67f1b8749a7ac2861.jpg"/>
            <div>
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