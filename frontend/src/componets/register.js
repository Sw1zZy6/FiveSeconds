import "../componets.css";

const register = () => {
    return (
        <div className="register-container">
            <h1>Register</h1>
            <form>
                <input type="text" placeholder="Username" />
                <input type="password" placeholder="Password" />
                <button type="submit">Register</button>
            </form>
        </div>
    );
}

export default register;