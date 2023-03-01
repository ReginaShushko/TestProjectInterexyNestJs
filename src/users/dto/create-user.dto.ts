import { ApiProperty } from "@nestjs/swagger";
import { IsString, IsEmail, Length  } from "class-validator";

export class CreateUserDto {
  @ApiProperty({ example: "user@email.com", description: "Postal address" })
  @IsString({ message: "Must be string" })
  @IsEmail({}, {message: "Invalid email"})
  readonly email: string;

  @ApiProperty({ example: "12345678", description: "Password" })
  @IsString({ message: "Must be string" })
  @Length(4, 16, { message: "Between 4 to 16" })
  readonly password: string;
}
