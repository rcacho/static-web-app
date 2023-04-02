

IF object_id('calendar_user', 'U') is null
    SELECT * FROM calendar_user;
ELSE
    CREATE TABLE calendar_user_2 (
	 id INT IDENTITY (1, 1) PRIMARY KEY
	,active_directory_oid UNIQUEIDENTIFIER
);


CREATE TABLE calendar.app_user (
	 id INT IDENTITY (1, 1) PRIMARY KEY
	,active_directory_oid UNIQUEIDENTIFIER UNIQUE
);

CREATE TABLE calendar.category (
	 id INT IDENTITY (1, 1) PRIMARY KEY
	,user_id INT NOT NULL
	,name VARCHAR(255) NOT NULL
	,icon VARCHAR(50) NOT NULL
	,color VARCHAR(50) NOT NULL
	,is_deleted boolean NOT NULL DEFAULT false
	,UNIQUE(name)
	,CONSTRAINT FK_User_Category FOREIGN KEY (user_id)
        REFERENCES calendar.app_user (id)
        ON DELETE CASCADE
        ON UPDATE CASCADE	
);

CREATE TABLE calendar.event (
	 id INT IDENTITY (1, 1) PRIMARY KEY
	,user_id int
	,event_date date NOT NULL
	,category_id int NOT NULL
	,event_description VARCHAR(255) 
	,is_deleted bit NOT NULL DEFAULT 0
	,UNIQUE(category_id, event_date)
	,CONSTRAINT FK_Category_Event FOREIGN KEY (category_id)
        REFERENCES calendar.category (id)
        ON DELETE CASCADE
        ON UPDATE CASCADE
	,CONSTRAINT FK_User_Event FOREIGN KEY (user_id)
        REFERENCES calendar.app_user (id)
);

CREATE TABLE calendar.category_filter (
	 id INT IDENTITY (1, 1) PRIMARY KEY
	,category_id int NOT NULL
	,user_id int NOT NULL
	,UNIQUE(category_id, user_id)
	,CONSTRAINT FK_Category_Filter FOREIGN KEY (category_id)
        REFERENCES calendar.category (id)
        ON DELETE CASCADE
        ON UPDATE CASCADE
	,CONSTRAINT FK_User_Filter FOREIGN KEY (user_id)
        REFERENCES calendar.app_user (id)
);

CREATE TABLE calendar.notification (
	 id INT IDENTITY (1, 1) PRIMARY KEY
	,event_id int NOT NULL
	,user_id int NOT NULL
	,update_type int NOT NULL
	,time_added datetime NOT NULL DEFAULT CURRENT_TIMESTAMP
	,UNIQUE (user_id, event_id, time_added)
	,CONSTRAINT FK_Event_Notification FOREIGN KEY (event_id)
        REFERENCES calendar.event (id)
        ON DELETE CASCADE
        ON UPDATE CASCADE
	,CONSTRAINT FK_User_Notification FOREIGN KEY (user_id)
	REFERENCES calendar.app_user (id)
);


CREATE PROCEDURE calendar.usp_GetErrorInfo  
AS  
SELECT  
    ERROR_NUMBER() AS ErrorNumber  
    ,ERROR_SEVERITY() AS ErrorSeverity  
    ,ERROR_STATE() AS ErrorState  
    ,ERROR_PROCEDURE() AS ErrorProcedure  
    ,ERROR_LINE() AS ErrorLine  
    ,ERROR_MESSAGE() AS ErrorMessage;  

CREATE PROCEDURE calendar.insert_category (@oid UNIQUEIDENTIFIER, @name VARCHAR(255), @icon VARCHAR(50), @color VARCHAR(50)) AS
BEGIN
	DECLARE @id int
	BEGIN TRY
			
		IF NOT EXISTS (SELECT * FROM calendar.app_user WHERE active_directory_oid = @oid)
			INSERT INTO calendar.app_user (active_directory_oid) VALUES (@oid);
			
		SELECT @id = id FROM calendar.app_user WHERE active_directory_oid = @oid
			
		INSERT INTO calendar.category (user_id, name, icon, color) VALUES (@id, @name, @icon, @color)

	END TRY
	BEGIN CATCH
		EXECUTE calendar.usp_GetErrorInfo;
	END CATCH
END;

CREATE PROCEDURE calendar.insert_event @oid UNIQUEIDENTIFIER, @category_id int, @event_date date, @description VARCHAR(255) = null, @e_id OUT AS
BEGIN
    DECLARE @id int;
    DECLARE @event_id TABLE (id INT);
    
    BEGIN TRY
        IF NOT EXISTS (SELECT * FROM calendar.app_user WHERE active_directory_oid = @oid)
            INSERT INTO calendar.app_user (active_directory_oid) VALUES (@oid);
        
        BEGIN
            SELECT @id = id FROM calendar.app_user WHERE active_directory_oid = @oid;
            
            INSERT INTO calendar.event (category_id, user_id, event_date, event_description) OUTPUT inserted.id INTO @event_id VALUES (@category_id, @id, @event_date, @description);
            
            INSERT INTO calendar.notification (event_id, user_id, update_type) VALUES ((SELECT id FROM @event_id), @id, 0);


	    RETURN (SELECT id FROM @event_id);
        END
    END TRY
    BEGIN CATCH
        EXECUTE calendar.usp_GetErrorInfo;
    END CATCH
END;

CREATE PROCEDURE calendar.update_event (@oid UNIQUEIDENTIFIER, @event_id int, @category_id int, @event_date date, @description VARCHAR(255) = null) AS  
BEGIN
    DECLARE @id int;
    
    BEGIN TRY
	BEGIN TRANSACTION
        IF NOT EXISTS (SELECT * FROM calendar.app_user WHERE active_directory_oid = @oid)
            INSERT INTO calendar.app_user (active_directory_oid) VALUES (@oid);
        
        BEGIN
            SELECT @id = id FROM calendar.app_user WHERE active_directory_oid = @oid;
            
	        UPDATE calendar.event SET category_id = @category_id, event_date = @event_date, event_description = @description WHERE id = @event_id;
            
            INSERT INTO calendar.notification (event_id, user_id, update_type) VALUES (@event_id, @id, 1);
        END
	COMMIT;
    END TRY
    BEGIN CATCH
        EXECUTE calendar.usp_GetErrorInfo;
	ROLLBACK;
    END CATCH
END;


CREATE PROCEDURE calendar.delete_event (@oid UNIQUEIDENTIFIER, @event_id int) AS
BEGIN
	BEGIN TRY	
		BEGIN TRANSACTION 

		UPDATE calendar.event SET is_deleted = 1 WHERE id = @event_id

		INSERT INTO calendar.notification (event_id, user_id, update_type) SELECT @event_id, id, 3 FROM calendar.app_user WHERE active_directory_oid = @oid

		COMMIT  
	END TRY
	BEGIN CATCH
		EXECUTE calendar.usp_GetErrorInfo
		ROLLBACK;
	END CATCH
END;

CREATE PROCEDURE calendar.insert_filter  (@category_id int, @oid UNIQUEIDENTIFIER) AS 
BEGIN
        DECLARE @user_id table (id int)
        DECLARE @id int
	BEGIN TRY
			BEGIN TRANSACTION
			SAVE TRANSACTION insert_filter_tran

			IF NOT EXISTS (SELECT * FROM calendar.app_user WHERE active_directory_oid = @oid)
				INSERT INTO calendar.app_user (active_directory_oid) VALUES (@oid);
			
			BEGIN
			SELECT @id = id FROM calendar.app_user WHERE active_directory_oid = @oid
			
			INSERT INTO calendar.category_filter (category_id, user_id) VALUES (@category_id, @id)
			END

		COMMIT TRANSACTION insert_filter_tran;
	END TRY
	BEGIN CATCH
		EXECUTE calendar.usp_GetErrorInfo; 
		ROLLBACK TRANSACTION insert_filter_tran;
	END CATCH
END;
