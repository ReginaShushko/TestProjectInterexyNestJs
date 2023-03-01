import { Controller, Get, Post, UseGuards } from "@nestjs/common";
import { Body } from "@nestjs/common/decorators/http/route-params.decorator";
import { ApiOperation } from "@nestjs/swagger";
import { ApiResponse, ApiTags } from "@nestjs/swagger/dist";
import { CreateUserDto } from "./dto/create-user.dto";
import { UsersService } from "./users.service";
import { User } from "./users.model";
import { Roles } from "src/auth/roles-auth.decorator";
import { RoleGuard } from './../auth/roles.guard';
import { addRoleDto } from './dto/add-role.dto';
import { BanUserDto } from './dto/ban-user.dto';

@ApiTags("Users")
@Controller("users")
export class UsersController {
  constructor(private userService: UsersService) {}

  @ApiOperation({ summary: "User creation" })
  @ApiResponse({ status: 200, type: User })
  @Post()
  create(@Body() userDto: CreateUserDto) {
    return this.userService.createUser(userDto);
  }

  @ApiOperation({ summary: "Get all users" })
  @ApiResponse({ status: 200, type: [User] })
  @Roles("ADMIN")
  @UseGuards(RoleGuard)
  @Post()
  getAll() {
    return this.userService.getAllUsers();
  }

  @ApiOperation({ summary: "Role assign" })
  @ApiResponse({ status: 200 })
  @Roles("ADMIN")
  @UseGuards(RoleGuard)
  @Post("/role")
  addRole(@Body() dto: addRoleDto) {
    return this.userService.addRole(dto);
  }

  @ApiOperation({ summary: "Banned user" })
  @ApiResponse({ status: 200 })
  @Roles("ADMIN")
  @UseGuards(RoleGuard)
  @Get("/ban")
  ban(@Body() dto: BanUserDto) {
    return this.userService.ban(dto);
  }
}
