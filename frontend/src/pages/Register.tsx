import RegisterAction from '../utils/register.action';

export function Register() {
    const {success, isPending, register, handleSubmit, errors, onSubmit, backToLoginPage} = RegisterAction()
    
    return <div className="login-container">
        <div className="login-wrapper">
        {!success ? <>
                    <form className="form-sign" onSubmit={handleSubmit(onSubmit)}>
                        <h1 className="title-signin">Signup</h1>
                        <div>
                            {errors.name && <span className="error">{errors.name.message}</span>}
                            <input type="text" placeholder="John Doe" {...register('name')}/>
                        </div>
                        <div>
                        {errors.email && <span className="error">{errors.email.message}</span>}
                            <input type="email" placeholder="john.doe@example.com" {...register('email')}/>
                        </div>
                        <div>
                        {errors.password && <span className="error">{errors.password.message}</span>}
                            <input type="password" placeholder="password123" {...register('password')}/>
                        </div>
                        <div>
                        {errors.confirmPassword && <span className="error">{errors.confirmPassword.message}</span>}
                            <input type="password" placeholder="password123" {...register('confirmPassword')}/>
                        </div>

                        <button type="submit" className="signin" disabled={isPending}>
                            {isPending ? 'Loading...' : 'Signup'}
                        </button>
                    </form>
                    <div className="welcome">
                        <h1>Welcome Back</h1>
                        <p>Welcome back! We are so happy to have you here. it's great to see you again. We hope you had a safe and enjoyable time away.</p>
                        <div className="signup" onClick={backToLoginPage}>Already Signup? Back to login</div>
                    </div>
                </>
            :
                <>
                    <form className="form-sign" style={{width: '0%'}}></form>
                    <div className="welcome" style={{width: '100%', paddingLeft: 20, paddingRight: 20}}>
                        <h1 style={{textAlign: 'center', textWrap: 'nowrap', marginBottom: 20}}>Congrats. User created!</h1>
                        <p>Now you can login using bellow link</p>
                        <div className="signup" onClick={backToLoginPage}>Already Signup? Back to login</div>
                    </div>
                </>
        }
        </div>
    </div> 
}