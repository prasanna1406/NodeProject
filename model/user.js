let user = {
    id,
    name,
    email,
    password,

    get fullName() {
        return `${this.name}`;
    }
}
alert(user.fullName);