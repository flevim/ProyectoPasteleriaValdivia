CREATE DATABASE  base_pasteleria;

#Seleecionar base de datos
USE base_pasteleria;

CREATE TABLE IF NOT EXISTS user(
	id INT NOT NULL,
    username VARCHAR(16) NOT NULL,
    contraseña VARCHAR(32) NOT NULL,
    email VARCHAR(255),
    nombre VARCHAR(45),
    apellido VARCHAR(45),
    ciudad VARCHAR(45),
    codigo_postal INT,
    telefono INT,
    vistas INT,
    PRIMARY KEY(id)

)ENGINE=INNODB;

CREATE TABLE IF NOT EXISTS rol(
	id INT NOT NULL,
    nombre VARCHAR(255),
    PRIMARY KEY(id),
    user_id INT NOT NULL,
    CONSTRAINT fk_id
    FOREIGN KEY(user_id)
    REFERENCES user(id)
)ENGINE=INNODB;

CREATE TABLE IF NOT EXISTS carrito(
	id INT NOT NULL,
    total INT NOT NULL,
    PRIMARY KEY(id),
    user_id INT NOT NULL,
    CONSTRAINT fk_id_carrito
    FOREIGN KEY(user_id)
    REFERENCES user(id)
)ENGINE=INNODB;

CREATE TABLE IF NOT EXISTS producto(
	id INT NOT NULL,
    nombre VARCHAR(255),
    precio INT NOT NULL,
    descripcion VARCHAR(45),
    categoria VARCHAR(45),
    descuento VARCHAR(45),
	PRIMARY KEY(id)
)ENGINE=INNODB;


CREATE TABLE IF NOT EXISTS item_carrito(
	id INT NOT NULL,
    cantidad INT NOT NULL,
    PRIMARY KEY(id),
    producto_id INT NOT NULL,
    CONSTRAINT fk_producto_id
    FOREIGN KEY(producto_id)
    REFERENCES producto(id),
    carrito_id INT NOT NULL,
    CONSTRAINT fk_carrito_id
    FOREIGN KEY(carrito_id)
    REFERENCES carrito(id)
)ENGINE=INNODB;

CREATE TABLE IF NOT EXISTS pago(
	id INT NOT NULL,
    proveedor VARCHAR(45),
    monto INT NOT NULL,
    estado VARCHAR(45),
	PRIMARY KEY(id)
)ENGINE=INNODB;


CREATE TABLE IF NOT EXISTS item_orden(
	id INT NOT NULL,
    cantidad INT NOT NULL,
	PRIMARY KEY(id),
	producto_id INT NOT NULL,
    CONSTRAINT fk_producto_carrito_id
    FOREIGN KEY(producto_id)
    REFERENCES producto(id),
	orden_id INT NOT NULL,
    CONSTRAINT fk_orden_id
    FOREIGN KEY(orden_id)
    REFERENCES orden(id)
)ENGINE=INNODB;


CREATE TABLE IF NOT EXISTS orden(
	id INT NOT NULL,
    direccion_envio VARCHAR(255),
    fecha_orden TIMESTAMP,
    total INT NOT NULL,
	PRIMARY KEY(id),
	pago_id INT NOT NULL,
    CONSTRAINT fk_pago_id
    FOREIGN KEY(pago_id)
    REFERENCES pago(id),
	user_id INT NOT NULL,
    CONSTRAINT fk_user_id
    FOREIGN KEY(user_id)
    REFERENCES user(id)
)ENGINE=INNODB;


