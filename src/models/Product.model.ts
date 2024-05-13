import { Table, Column, Model, DataType, Default } from "sequelize-typescript";
//HasMany, HasOne, HasAssociation sirven para relacionar tablas

@Table({
    tableName: 'products'
})

class Product extends Model {
    @Column({
        type: DataType.STRING(100),
        allowNull: false,
        //unique: true,
    })
    declare name: string;

    @Column({
        type: DataType.FLOAT,
    })
    price: number;

    @Default(true)
    @Column({
        type: DataType.BOOLEAN,
    })
    availability: boolean;
}

export default Product;