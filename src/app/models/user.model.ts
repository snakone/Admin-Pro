export class User {

    constructor(
      public name: string,
      public email: string,
      public password: string,
      public image?: string,
      public role?: string,
      public google?: boolean,
      public id?: string
    ){

    }
}
