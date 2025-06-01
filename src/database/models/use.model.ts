import { Table, Column, Model, DataType, PrimaryKey } from "sequelize-typescript";

@Table({
  tableName: "users", // utai gui ma dekhine name (phpmyadmin ma)
  modelName: "user", //project vitra mathi ko table lai access garne name (ModelName)
  timestamps: true,
})

// Class ModelName extends Inherit(mathi import gareko model vanne class taan vanna khojeko)
class User extends Model {

    @Column({
        primaryKey:true,
        type:DataType.UUID,
        defaultValue:DataType.UUIDV4
    })

  @Column({
    type: DataType.STRING,
  })
  declare username: string;

  @Column({
    type: DataType.STRING,
  })
  declare password: string;

  @Column({
    type: DataType.STRING,
  })
  declare email: string;

  @Column({
    type: DataType.ENUM("teacher", "institute", "super-admin", "student"),
    defaultValue: "student",
  })
  declare role: string;
}

export default User;
