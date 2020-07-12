const development = {
    name:'development',
    asset_path: './assets',
    session_cookie_key: 'blahsomething',
    db: 'codeial_development',
    smtp: {
        service: 'gmail',
        host: 'smtp.gmail.com',
        port: 587,
        secure: false,
        auth: {
            user:'agarg2311@gmail.com',//enter user
            pass:'user password'//enter password
        }
    },
    google_client_id: "923597261684-ssm2suco784sb7391i8j841gjp3jlfuf.apps.googleusercontent.com",
    google_client_secret: "41_0aKZ4R3hQwvvNpDrZx4QW",
    google_callback_url: "http://localhost:8000/users/auth/google/callback",
    jwt_secret: 'codeial',

}

const production = {
    name:'production'
}

module.exports = development;