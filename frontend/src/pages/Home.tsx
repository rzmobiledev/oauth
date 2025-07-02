import LoginAction from '../utils/login.action'

export function Home() {
    
    const {isPending, register, handleSubmit, errors, onSubmit, onOauthLogin, signup} = LoginAction()
    
    return <div className="login-container">
    <div className="login-wrapper">
        <form className="form-sign" onSubmit={handleSubmit(onSubmit)}>
            <h1 className="title-signin">Signin</h1>
            <div>
                {errors?.email && <span className="error">{errors.email.message}</span>}
                <input type="email" placeholder="john.doe@example.com" required {...register('email')} className={errors?.email ? 'error': ''}/>
            </div>
            <div>
                {errors?.password && <span className="error">{errors.password.message}</span>}
                <input type="password" placeholder="password123" {...register('password')} className={errors?.password ? 'error': ''}/>
            </div>
            <button type="submit" className="signin" disabled={isPending}>{isPending ? 'Processing...' : 'Signin'}</button>
            <span className="clue">or signin with</span>
            <button type="button" className="google" onClick={onOauthLogin}>Google</button>
        </form>

        <div className="welcome">
            <h1>Welcome Back</h1>
            <p>Welcome back! We are so happy to have you here. it's great to see you again. We hope you had a safe and enjoyable time away.</p>
            <div className="signup" onClick={signup}>No Account yet? Signup</div>
        </div>
</div>
</div>
}