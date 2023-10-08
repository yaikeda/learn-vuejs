import {describe, it, expect, beforeEach} from 'vitest'
import {mount} from '@vue/test-utils'
import sinon from 'sinon'
import KbnLoginForm from '@/components/molecules/KbnLoginForm.vue'

describe('KbnLoginForm', () => {
    describe('プロパティ', () => {
        describe('validation', () => {
            let loginForm // 変数作成
            beforeEach(async () => { // それぞれのテストの前に　→　describe?it?
                loginForm = mount(KbnLoginForm, {propsData: {onlogin: () => {}}})
                await loginForm.vm.$nextTick()
            })

            describe('email', () => {
                describe('required', () => {
                    describe('何も入力されていない', () => {
                        it('validatidation.email.requiredがinvalidであること', () => {
                            loginForm.setData({email: ''})
                            expect(loginForm.vm.validation.email.required).toEqual(false)
                        })
                    })

                    describe('入力あり', () => {
                        it('validation.email.requiredがvalidであること', () => {
                            loginForm.setData({email: 'foo@domain.com'})
                            expect(loginForm.vm.validation.email.required).toEqual(true)
                        })
                    })
                })

                describe('format', () => {
                    describe('メールアドレス形式でないフォーマット', () => {
                        it('validation.email.formatがinvalidであること', () => {
                            loginForm.setData({email: 'foobar'})
                            expect(loginForm.vm.validation.email.format).toEqual(false)
                        })
                    })

                    describe('メールアドレス形式のフォーマット', () => {
                        it('validation.email.requiredがvalidであること', () => {
                            loginForm.setData({email: 'foo@domain.com'})
                            expect(loginForm.vm.validation.email.format).toEqual(true)
                        })
                    })
                })
            })

            describe('password', () => {
                describe('required', () => {
                    it('validation.password.requiredがinvalidであること', () => {
                        loginForm.setData({password: ''})
                        expect(loginForm.vm.validation.password.required).toEqual(false)
                    })
                })

                describe('入力あり', () => {
                    it('validation.password.requiredがvalidであること', () => {
                        loginForm.setData({password: 'xxxx'})
                        expect(loginForm.vm.validation.password.required).toEqual(true)
                    })
                })
            })
        })
    })

    describe('valid', () => {
        let loginForm
        beforeEach(async () => {
            loginForm = mount(KbnLoginForm, {
                propsData: {onlogin: () => {}}
            })
            await loginForm.vm.$nextTick()
        })

        describe('バリデーション項目すべてOK', () => {
            it('validになること', () => {
                loginForm.setData({
                    email: 'foo@domain.com',
                    password: '12345678'
                })
                expect(loginForm.vm.valid).toEqual(true)
            })
        })

        describe('バリデーションNG項目あり', () => {
            it('invalidになること', () => {
                loginForm.setData({
                    email: 'foo@domain.com',
                    password: ''
                })
                expect(loginForm.vm.valid).toEqual(false)
            })
        })
    })

    describe('disableLoginAction', () => {
        let loginForm
        beforeEach(async () => {
            loginForm = mount(KbnLoginForm, {
                propsData: {onlogin: () => {}}
            })
            await loginForm.vm.$nextTick()
        })

        describe('バリデーションNG項目ある', () => {
            it('ログイン処理は無効', () => {
                loginForm.setData({
                    email: 'foo@domain.com',
                    password: ''
                })
                expect(loginForm.vm.disableLoginAction).to.equal(true)
            })
        })

        describe('バリデーション項目すべてOKかつログイン処理中ではない', () => {
            it('ログイン処理は有効', () => {
                loginForm.setData({
                    email: 'foo@domain.com',
                    password: '12345678'
                })
                expect(loginForm.vm.disableLoginAction).to.equal(false)
            })
        })

        describe('バリデーション項目すべてOKかつログイン処理中', () => {
            it('ログイン処理は無効', () => {
                loginForm.setData({
                    email: 'foo@domain.com',
                    password: '12345678',
                    progress: true
                })
                expect(loginForm.vm.disableLoginAction).to.equal(true)
            })
        })
    })

    describe('onlogin', () => {
        let loginForm
        let onloginStub
        beforeEach(async () => {
            onloginStub = sinon.stub()
            loginForm = mount(KbnLoginForm, {
                propsData: {onlogin: onloginStub}
            })
            loginForm.setData({
                email: 'foo@domain.com',
                password: '12345678'
            })
            await loginForm.vm.$nextTick()
        })

        describe('resolve', () => {
            it('resolveされること', async () => {
                onloginStub.resolves();

                loginForm.find('button').trigger('click');
                expect(onloginStub.called).to.equal(false);
                expect(loginForm.vm.error).to.equal('');
                expect(loginForm.vm.disableLoginAction).to.equal(true);

                await loginForm.vm.$nextTick();
                expect(onloginStub.called).to.equal(true);
                const authInfo = onloginStub.args[0][0];
                expect(authInfo.email).to.equal(loginForm.vm.email);
                expect(authInfo.password).to.equal(loginForm.vm.password);

                await loginForm.vm.$nextTick();
                expect(loginForm.vm.error).to.equal('');
                expect(loginForm.vm.disableLoginAction).to.equal(false);
            })
        })

        describe('reject', () => {
            it('rejectされること', async () => {
                onloginStub.rejects(new Error('login error!'));

                loginForm.find('button').trigger('click');
                expect(onloginStub.called).to.equal(false);
                expect(loginForm.vm.error).to.equal('');
                expect(loginForm.vm.disableLoginAction).to.equal(true);

                await loginForm.vm.$nextTick();
                expect(onloginStub.called).to.equal(true)
                const authInfo = onloginStub.args[0][0]
                expect(authInfo.email).to.equal(loginForm.vm.email)
                expect(authInfo.password).to.equal(loginForm.vm.password)
            
                await loginForm.vm.$nextTick();
                expect(loginForm.vm.error).to.equal('login error!')
                expect(loginForm.vm.disableLoginAction).to.equal(false)
            })
        })
    })
})