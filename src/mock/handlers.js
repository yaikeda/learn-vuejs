import {rest} from 'msw'

const users = {
    'aaa@bbb.ccc': {
        password: 'ddd',
        userId: 1,
        token: '1234567890abcdef'
    }
}

export const handlers = [
    rest.post('/auth/login', (req, res, ctx) => {
        const {email, password} = req.body
        const user = users[email]
        if (user) {
            if (user.password !== password) {
                return res(
                    ctx.status(401),
                    ctx.json({message: 'ログインに失敗しました。'})
                )
                //res.status(401).json({message: 'ログインに失敗しました。'})
            } else {
                return res(
                    ctx.json({userId: user.userId, token: user.token}),
                )
                //res.json({userId: user.userId, token: user.token})
            }
        } else {
            return res (
                ctx.status(404),
                ctx.json({message: 'ユーザが登録されていません。'})
            )
            //res.status(404).json({message: 'ユーザーが登録されていません。'})
        }
    }),
]