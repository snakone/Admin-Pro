export class User {

    constructor(
      public name: string,
      public email: string,
      public password: string,
      public lastName?: string,
      public id?: string,
      public image?: string,
      public role?: string,
      public google?: boolean
    ){

    }
}
