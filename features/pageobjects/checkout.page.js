class Checkout {

get inputFirstName(){
    return $('#first-name');
}

get inputLastName(){
    return $('#last-name');
}

get inputZipCode(){
    return $('#postal-code');
}

async fillForm(obj){
    await (await this.inputFirstName).setValue(obj.firstName);
    await (await this.inputLastName).setValue(obj.lastName);
    await (await this.inputZipCode).setValue(obj.zipCode);
}

get btnContinue(){
    return $('#continue');
}

get btnFinish(){
    return $('#finish');
}

}

export default new Checkout();