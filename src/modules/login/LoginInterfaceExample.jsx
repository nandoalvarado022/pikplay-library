const LoginInterfaceExample = ({
    buttonText,
    handleEnviarCodigo
}) => {
    return (
        <div>
            <h1>Login</h1>
            <input type="text" id="phoneLogin" placeholder="Número de celular" />
            <button onClick={handleEnviarCodigo}>{buttonText}</button>
        </div>
    );
}

export default LoginInterfaceExample;
