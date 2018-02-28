USE newlafarnet;
select * from users where username='rflores';
select * from users order by fecha_modificacion desc;
select * from log_auditoria order by fechaTransaccion desc;

DROP TRIGGER logLafarnetUserUpdate;
DELIMITER ///

CREATE TRIGGER logLafarnetUserUpdate AFTER UPDATE ON users
FOR EACH ROW

BEGIN
IF NEW.estado = 3 THEN
    INSERT INTO log_auditoria (tabla, llavePrimaria, campo, valorAnterior, valorNuevo, tipoTransaccion, fechaTransaccion, usuario)
        VALUES('users', NEW.userid, 'estado', OLD.estado, NEW.estado, 'DELETE', now(), NEW.usuario_modificacion);
ELSE 
	IF NEW.first_name <> OLD.first_name THEN  
        INSERT INTO log_auditoria (tabla, llavePrimaria, campo, valorAnterior, valorNuevo, tipoTransaccion, fechaTransaccion, usuario)
        VALUES('users', NEW.userid, 'first_name', OLD.first_name, NEW.first_name, 'UPDATE', now(), NEW.usuario_modificacion);    
    END IF;
    
    IF NEW.last_name <> OLD.last_name THEN  
        INSERT INTO log_auditoria (tabla, llavePrimaria, campo, valorAnterior, valorNuevo, tipoTransaccion, fechaTransaccion, usuario)
        VALUES('users', NEW.userid, 'last_name', OLD.last_name, NEW.last_name, 'UPDATE', now(), NEW.usuario_modificacion);    
    END IF;

    IF NEW.email_address <> OLD.email_address THEN  
        INSERT INTO log_auditoria (tabla, llavePrimaria, campo, valorAnterior, valorNuevo, tipoTransaccion, fechaTransaccion, usuario)
        VALUES('users', NEW.userid, 'email_address', OLD.email_address, NEW.email_address, 'UPDATE', now(), NEW.usuario_modificacion);    
    END IF;

    IF NEW.username <> OLD.username THEN  
        INSERT INTO log_auditoria (tabla, llavePrimaria, campo, valorAnterior, valorNuevo, tipoTransaccion, fechaTransaccion, usuario)
        VALUES('users', NEW.userid, 'username', OLD.username, NEW.username, 'UPDATE', now(), NEW.usuario_modificacion);    
    END IF;

    IF NEW.password <> OLD.password THEN  
        INSERT INTO log_auditoria (tabla, llavePrimaria, campo, valorAnterior, valorNuevo, tipoTransaccion, fechaTransaccion, usuario)
        VALUES('users', NEW.userid, 'password', OLD.password, NEW.password, 'UPDATE', now(), NEW.usuario_modificacion);    
    END IF;

    IF NEW.id_cargo <> OLD.id_cargo THEN  
        INSERT INTO log_auditoria (tabla, llavePrimaria, campo, valorAnterior, valorNuevo, tipoTransaccion, fechaTransaccion, usuario)
        VALUES('users', NEW.userid, 'id_cargo', OLD.id_cargo, NEW.id_cargo, 'UPDATE', now(), NEW.usuario_modificacion);    
    END IF;
    
    IF NEW.id_regional <> OLD.id_regional THEN  
        INSERT INTO log_auditoria (tabla, llavePrimaria, campo, valorAnterior, valorNuevo, tipoTransaccion, fechaTransaccion, usuario)
        VALUES('users', NEW.userid, 'id_regional', OLD.id_regional, NEW.id_regional, 'UPDATE', now(), NEW.usuario_modificacion);    
    END IF;

    IF NEW.id_superior <> OLD.id_superior THEN  
        INSERT INTO log_auditoria (tabla, llavePrimaria, campo, valorAnterior, valorNuevo, tipoTransaccion, fechaTransaccion, usuario)
        VALUES('users', NEW.userid, 'id_superior', OLD.id_superior, NEW.id_superior, 'UPDATE', now(), NEW.usuario_modificacion);    
    END IF;

    IF NEW.id_area <> OLD.id_area THEN  
        INSERT INTO log_auditoria (tabla, llavePrimaria, campo, valorAnterior, valorNuevo, tipoTransaccion, fechaTransaccion, usuario)
        VALUES('users', NEW.userid, 'id_area', OLD.id_area, NEW.id_area, 'UPDATE', now(), NEW.usuario_modificacion);    
    END IF;

    IF NEW.id_seccion <> OLD.id_seccion THEN  
        INSERT INTO log_auditoria (tabla, llavePrimaria, campo, valorAnterior, valorNuevo, tipoTransaccion, fechaTransaccion, usuario)
        VALUES('users', NEW.userid, 'id_seccion', OLD.id_seccion, NEW.id_seccion, 'UPDATE', now(), NEW.usuario_modificacion);    
    END IF;

    IF NEW.foto <> OLD.foto THEN  
        INSERT INTO log_auditoria (tabla, llavePrimaria, campo, valorAnterior, valorNuevo, tipoTransaccion, fechaTransaccion, usuario)
        VALUES('users', NEW.userid, 'foto', OLD.foto, NEW.foto, 'UPDATE', now(), NEW.usuario_modificacion);    
    END IF;

    IF NEW.estado <> OLD.estado THEN  
        INSERT INTO log_auditoria (tabla, llavePrimaria, campo, valorAnterior, valorNuevo, tipoTransaccion, fechaTransaccion, usuario)
        VALUES('users', NEW.userid, 'estado', OLD.estado, NEW.estado, 'UPDATE', now(), NEW.usuario_modificacion);    
    END IF;
END IF;


    
END;
///

DELIMITER ;

drop trigger logLafarnetUserInsert;
DELIMITER ///
 
CREATE TRIGGER logLafarnetUserInsert AFTER INSERT ON users
FOR EACH ROW

BEGIN
    INSERT INTO log_auditoria (tabla, llavePrimaria, campo, valorAnterior, valorNuevo, tipoTransaccion, fechaTransaccion, usuario)
    VALUES('users', NEW.userid, 'first_name', NULL, NEW.first_name, 'INSERT', now(), NEW.usuario_modificacion);    

    INSERT INTO log_auditoria (tabla, llavePrimaria, campo, valorAnterior, valorNuevo, tipoTransaccion, fechaTransaccion, usuario)
    VALUES('users', NEW.userid, 'last_name', NULL, NEW.last_name, 'INSERT', now(), NEW.usuario_modificacion);   

    INSERT INTO log_auditoria (tabla, llavePrimaria, campo, valorAnterior, valorNuevo, tipoTransaccion, fechaTransaccion, usuario)
    VALUES('users', NEW.userid, 'email_address', NULL, NEW.email_address, 'INSERT', now(), NEW.usuario_modificacion);    

    INSERT INTO log_auditoria (tabla, llavePrimaria, campo, valorAnterior, valorNuevo, tipoTransaccion, fechaTransaccion, usuario)
    VALUES('users', NEW.userid, 'username', NULL, NEW.username, 'INSERT', now(), NEW.usuario_modificacion);    

    INSERT INTO log_auditoria (tabla, llavePrimaria, campo, valorAnterior, valorNuevo, tipoTransaccion, fechaTransaccion, usuario)
    VALUES('users', NEW.userid, 'password', NULL, NEW.password, 'INSERT', now(), NEW.usuario_modificacion);    

    INSERT INTO log_auditoria (tabla, llavePrimaria, campo, valorAnterior, valorNuevo, tipoTransaccion, fechaTransaccion, usuario)
    VALUES('users', NEW.userid, 'id_cargo', NULL, NEW.id_cargo, 'INSERT', now(), NEW.usuario_modificacion);    

    INSERT INTO log_auditoria (tabla, llavePrimaria, campo, valorAnterior, valorNuevo, tipoTransaccion, fechaTransaccion, usuario)
    VALUES('users', NEW.userid, 'id_regional', NULL, NEW.id_regional, 'INSERT', now(), NEW.usuario_modificacion);    

    INSERT INTO log_auditoria (tabla, llavePrimaria, campo, valorAnterior, valorNuevo, tipoTransaccion, fechaTransaccion, usuario)
    VALUES('users', NEW.userid, 'id_superior', NULL, NEW.id_superior, 'INSERT', now(), NEW.usuario_modificacion);    

    INSERT INTO log_auditoria (tabla, llavePrimaria, campo, valorAnterior, valorNuevo, tipoTransaccion, fechaTransaccion, usuario)
    VALUES('users', NEW.userid, 'id_area', NULL, NEW.id_area, 'INSERT', now(), NEW.usuario_modificacion);    

    INSERT INTO log_auditoria (tabla, llavePrimaria, campo, valorAnterior, valorNuevo, tipoTransaccion, fechaTransaccion, usuario)
    VALUES('users', NEW.userid, 'id_seccion', NULL, NEW.id_seccion, 'INSERT', now(), NEW.usuario_modificacion);    

    INSERT INTO log_auditoria (tabla, llavePrimaria, campo, valorAnterior, valorNuevo, tipoTransaccion, fechaTransaccion, usuario)
    VALUES('users', NEW.userid, 'foto', NULL, NEW.foto, 'INSERT', now(), NEW.usuario_modificacion);    

    INSERT INTO log_auditoria (tabla, llavePrimaria, campo, valorAnterior, valorNuevo, tipoTransaccion, fechaTransaccion, usuario)
    VALUES('users', NEW.userid, 'estado', NULL, NEW.estado, 'INSERT', now(), NEW.usuario_modificacion);    
END
///

DELIMITER ;

CREATE TABLE log_auditoria (
	id int auto_increment primary key,
    tabla nvarchar(50),
    llavePrimaria int,
    campo nvarchar(50),
    valorAnterior nvarchar(50),
    valorNuevo nvarchar(50),
    tipoTransaccion nvarchar(30),
    fechaTransaccion datetime,
    usuario nvarchar(30)
);

0	127	13:29:20	CREATE TRIGGER logLafarnetUserInsert BEFORE INSERT ON users
 FOR EACH ROW
 
 BEGIN
     INSERT INTO log_auditoria (tabla, llavePrimaria, campo, valorAnterior, valorNuevo, tipoTransaccion, fechaTransaccion, usuario)
     VALUES('users', NEW.userid, 'first_name', NULL, NEW.first_name, 'INSERT', now(), NEW.usuario_modificacion)	Error Code: 1064. You have an error in your SQL syntax; check the manual that corresponds to your MySQL server version for the right syntax to use near '' at line 6	0.000 sec