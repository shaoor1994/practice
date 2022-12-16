import {
    Model, Table, Column, DataType, Index, Sequelize, ForeignKey,
  } from "sequelize-typescript";

  import { ulid } from "ulidx";

  export interface UserAttributes {

  userName: string;
  password: string;
  id?: string;
  createdAt?: Date;
  updatedAt?: Date;

}

@Table({
    tableName: "user",
    timestamps: true,
  })

  export class UserTable extends Model<UserAttributes, UserAttributes> implements UserAttributes {

    @Column({
    	field: "username",
    	allowNull: true,
    	type: DataType.STRING(255),
    })
    	userName: string;


        @Column({
            field: "password",
            allowNull: true,
            type: DataType.STRING(255),
        })
            password: string;


            @Column({
                primaryKey: true,
                allowNull: false,
                type: DataType.STRING(36),
                defaultValue: function () {
                  return ulid();
                },
              })
          @Index({
            name: "PRIMARY",
            length: 36,
            using: "BTREE",
            unique: true,
          })
                id?: string;
          
              @Column({
                  allowNull: true,
                  type: DataType.DATE,
              })
                  createdAt?: Date;
          
              @Column({
                  allowNull: true,
                  type: DataType.DATE,
              })
                  updatedAt?: Date;
  }