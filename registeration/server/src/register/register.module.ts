export class InputsSchema {
  firstName: string;
  lastName: string;
  email: string;
  password: string;

}

// import { IsEmail, IsNotEmpty, IsString, MinLength, MaxLength } from 'class-validator';

// export class InputsSchema {
//   @IsString()
//   @IsNotEmpty()
//   @MaxLength(12)
//   firstName: string;

//   @IsString()
//   @IsNotEmpty()
//   @MaxLength(12)
//   lastName: string;

//   @IsEmail()
//   email: string;

//   @IsString()
//   @MinLength(8)
//   password: string;
// }
