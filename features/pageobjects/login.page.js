import Page from './page';

class LoginPage extends Page {
   
    get inputUsername () { return $('#user-name') }
    get inputPassword () { return $('#password') }
    get btnLogin () { return $('#login-button') }

       async login (username, password) {
        await (await this.inputUsername).setValue(username);
        await (await this.inputPassword).setValue(password);
        await (await this.btnLogin).click();
    }
    open(){
        return super.open('');
    }
}

export default new LoginPage();
