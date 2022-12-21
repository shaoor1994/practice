import {
    Model, Table, Column, DataType, Index, Sequelize, ForeignKey, HasMany, BelongsTo,
  } from "sequelize-typescript";

  import { ulid } from "ulidx";
import { UserTable } from "./UserTable";

  export interface CompanyAttributes {

  companyName: string;
  companyCode: string;
  id?: string;
  createdAt?: Date;
  updatedAt?: Date;
  statusId?: number;

}

@Table({
    tableName: "companies",
    timestamps: true,
  })

  export class CompanyTable extends Model<CompanyAttributes, CompanyAttributes> implements CompanyAttributes {
  
    @Column({
    	field: "companyname",
    	allowNull: true,
    	type: DataType.STRING(255),
    })
    	companyName: string;


      @Column({
        field: "statusId",
        allowNull: true,
        type: DataType.INTEGER,
      })
        statusId?: number;
        @Column({
            field: "compantcode",
            allowNull: true,
            type: DataType.STRING(255),
        })
        companyCode: string;


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
               field: "createdAt",
                  allowNull: true,
                  type: DataType.DATE,
              })
                  createdAt?: Date;
          
              @Column({
                field:"updatedAt",
                  allowNull: true,
                  type: DataType.DATE,
              })
                  updatedAt?: Date;

                  @ForeignKey(() => UserTable)
  @Column({
    field: "userName",
    allowNull: true,
    type: DataType.STRING(36),
  })
    userName?: string;

    @BelongsTo(() => UserTable)
    user: UserTable;
  }