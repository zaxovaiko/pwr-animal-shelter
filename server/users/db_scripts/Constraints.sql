
DO
$do$
BEGIN
	--CONSTRAINTS
	
	--users
	IF EXISTS (
		SELECT FROM information_schema.tables
   		WHERE  table_schema = 'public'
  		AND    table_name   = 'users_user'
		)
	THEN
		IF EXISTS (SELECT constraint_name 
                   from information_schema.constraint_column_usage 
                   where table_name = 'users_user'  and constraint_name = 'user_pesel_length_gte_11') 
		THEN
        	ALTER TABLE public.users_user
				DROP CONSTRAINT user_pesel_length_gte_11;
    	END IF;
		ALTER TABLE public.users_user
				ADD CONSTRAINT user_pesel_length_gte_11 CHECK (length(pesel::text) = 11);
	END IF;
	
	--animals
	IF EXISTS (
		SELECT FROM information_schema.tables
   		WHERE  table_schema = 'public'
  		AND    table_name   = 'animals_animal'
		)
	THEN
		IF EXISTS (SELECT constraint_name 
                   from information_schema.constraint_column_usage 
                   where table_name = 'animals_animal'  and constraint_name = 'animal_height_gte_1') 
		THEN
        	ALTER TABLE public.animals_animal
				DROP CONSTRAINT animal_height_gte_1;
    	END IF;
		ALTER TABLE public.animals_animal
				ADD CONSTRAINT animal_height_gte_1 CHECK (height >= 1);
				
		IF EXISTS (SELECT constraint_name 
                   from information_schema.constraint_column_usage 
                   where table_name = 'animals_animal'  and constraint_name = 'animal_weight_gte_1') 
		THEN
        	ALTER TABLE public.animals_animal
				DROP CONSTRAINT animal_weight_gte_1;
    	END IF;
		ALTER TABLE public.animals_animal
				ADD CONSTRAINT animal_weight_gte_1 CHECK (weight >= 1);
	END IF;
	
	--locations
	IF EXISTS (
		SELECT FROM information_schema.tables
   		WHERE  table_schema = 'public'
  		AND    table_name   = 'locations_animallocation'
		)
	THEN
	
		IF EXISTS (SELECT constraint_name 
                   from information_schema.constraint_column_usage 
                   where table_name = 'locations_animallocation'  and constraint_name = 'animal_location_date_to_gte_date_from') 
		THEN
        	ALTER TABLE public.locations_animallocation
				DROP CONSTRAINT animal_location_date_to_gte_date_from;
    	END IF;
		ALTER TABLE public.locations_animallocation
				ADD CONSTRAINT animal_location_date_to_gte_date_from CHECK (date_from <= date_to);
	
		IF EXISTS (SELECT constraint_name 
                   from information_schema.constraint_column_usage 
                   where table_name = 'locations_animallocation'  and constraint_name = 'animal_location_date_from_lte_timezone_now') 
		THEN
        	ALTER TABLE public.locations_animallocation
				DROP CONSTRAINT animal_location_date_from_lte_timezone_now;
    	END IF;
		ALTER TABLE public.locations_animallocation
				ADD CONSTRAINT animal_location_date_from_lte_timezone_now CHECK (date_from <= (NOW()::timestamp));
		
		IF EXISTS (SELECT constraint_name 
                   from information_schema.constraint_column_usage 
                   where table_name = 'locations_animallocation'  and constraint_name = 'animal_location_date_to_lte_timezone_now') 
		THEN
        	ALTER TABLE public.locations_animallocation
				DROP CONSTRAINT animal_location_date_to_lte_timezone_now;
    	END IF;
		ALTER TABLE public.locations_animallocation
				ADD CONSTRAINT animal_location_date_to_lte_timezone_now CHECK (date_to <= (NOW()::timestamp));
	END IF;
	
	--adoptions
	IF EXISTS (
		SELECT FROM information_schema.tables
   		WHERE  table_schema = 'public'
  		AND    table_name   = 'adoptions_animaladoption'
		)
	THEN
		IF EXISTS (SELECT constraint_name 
                   from information_schema.constraint_column_usage 
                   where table_name = 'adoptions_animaladoption'  and constraint_name = 'animal_adoption_date_lte_timezone_now') 
		THEN
        	ALTER TABLE public.adoptions_animaladoption
				DROP CONSTRAINT animal_adoption_date_lte_timezone_now;
    	END IF;
		ALTER TABLE public.adoptions_animaladoption
				ADD CONSTRAINT animal_adoption_date_lte_timezone_now CHECK (date <= (NOW()::timestamp));
	END IF;
	
	--reservations
	IF EXISTS (
		SELECT FROM information_schema.tables
   		WHERE  table_schema = 'public'
  		AND    table_name   = 'reservations_animalreservation'
		)
	THEN
		IF EXISTS (SELECT constraint_name 
                   from information_schema.constraint_column_usage 
                   where table_name = 'reservations_animalreservation'  and constraint_name = 'animal_reservation_date_lte_timezone_now') 
		THEN
        	ALTER TABLE public.reservations_animalreservation
				DROP CONSTRAINT animal_reservation_date_lte_timezone_now;
    	END IF;
		ALTER TABLE public.reservations_animalreservation
				ADD CONSTRAINT animal_reservation_date_lte_timezone_now CHECK (date <= (NOW()::timestamp));
	END IF;
	
	--arrivals
	IF EXISTS (
		SELECT FROM information_schema.tables
   		WHERE  table_schema = 'public'
  		AND    table_name   = 'arrivals_animalarrival'
		)
	THEN
		IF EXISTS (SELECT constraint_name 
                   from information_schema.constraint_column_usage 
                   where table_name = 'arrivals_animalarrival'  and constraint_name = 'animal_arrival_date_lte_timezone_now') 
		THEN
        	ALTER TABLE public.arrivals_animalarrival
				DROP CONSTRAINT animal_arrival_date_lte_timezone_now;
    	END IF;
		ALTER TABLE public.arrivals_animalarrival
				ADD CONSTRAINT animal_arrival_date_lte_timezone_now CHECK (date <= (NOW()::timestamp));
	END IF;
END --COMMIT
$do$;
	
	--CONSTRAINTS END
	
	--TRIGGERS
DO
$triggers$
BEGIN

	--adoption
--OGR\15
CREATE OR REPLACE FUNCTION animal_adoption_animal_status_when_adopt_func()
RETURNS trigger AS
$$
	DECLARE
	BEGIN
		IF EXISTS (
      		SELECT 1
      		FROM public.animals_animal aa
			JOIN public.animals_animalstatus ast ON ast.id = aa.animal_status_id 
   			WHERE aa.id = NEW.animal_id AND ast.value <> 'Gotowe do adopcji' AND ast.value <> 'Zarezerwowane'
   		)THEN
		 	RAISE EXCEPTION 'Status zwierzęcia nie pozwala na adopcję' USING ERRCODE='09000';
		END IF;
		RETURN NEW;
    END;
$$ LANGUAGE 'plpgsql';

DROP TRIGGER IF EXISTS animal_adoption_animal_status_when_adopt
	ON public.adoptions_animaladoption;	
CREATE TRIGGER animal_adoption_animal_status_when_adopt
	BEFORE INSERT
	ON public.adoptions_animaladoption
	FOR EACH ROW
	EXECUTE PROCEDURE animal_adoption_animal_status_when_adopt_func();
--OGR\15 END

--OGR\16
CREATE OR REPLACE FUNCTION animal_adoption_check_reservation_when_adopt_func()
RETURNS trigger AS
$$
	DECLARE
	animal_status character varying(100);
	BEGIN
		SELECT animalStatus.value
		INTO animal_status
		FROM public.animals_animal aa
		JOIN public.animals_animalstatus animalStatus ON animalStatus.id = aa.animal_status_id 
   		WHERE aa.id = NEW.animal_id;
		IF animal_status = 'Zarezerwowane'
			THEN
			IF NOT EXISTS (
      			SELECT 1
      			FROM public.reservations_animalreservation ar
				JOIN public.reservations_reservationstatus resStatus ON resStatus.id = ar.reservation_status_id 
   				WHERE ar.animal_id = NEW.animal_id AND ar.user_id = NEW.user_id AND resStatus.value = 'Aktywna'
   			)THEN
		 		RAISE EXCEPTION 'Zwierzę jest zerazerwowane przez innego użytkownika' USING ERRCODE='09000';
			END IF;
		END IF;
		RETURN NEW;
    END;
$$ LANGUAGE 'plpgsql';

DROP TRIGGER IF EXISTS animal_adoption_check_reservation_when_adopt
	ON public.adoptions_animaladoption;	
CREATE TRIGGER animal_adoption_check_reservation_when_adopt
	BEFORE INSERT
	ON public.adoptions_animaladoption
	FOR EACH ROW
	EXECUTE PROCEDURE animal_adoption_check_reservation_when_adopt_func();
--OGR\16 END


CREATE OR REPLACE FUNCTION animal_adoption_set_animal_location_func()
RETURNS trigger AS
$$
	DECLARE
	BEGIN
		UPDATE public.locations_animallocation
		SET date_to = NOW()::timestamp
		WHERE animal_id = NEW.animal_id AND date_to IS NULL;
		RETURN NEW;
    END;
$$ LANGUAGE 'plpgsql';

DROP TRIGGER IF EXISTS animal_adoption_set_animal_location
	ON public.adoptions_animaladoption;	
CREATE TRIGGER animal_adoption_set_animal_location
	BEFORE INSERT 
	ON public.adoptions_animaladoption
	FOR EACH ROW
	EXECUTE PROCEDURE animal_adoption_set_animal_location_func();
	
CREATE OR REPLACE FUNCTION animal_adoption_set_animal_status_func()
RETURNS trigger AS
$$
	DECLARE
	adopted_animal_status_id integer;
	BEGIN
		SELECT ast.id
		INTO adopted_animal_status_id
		FROM public.animals_animalstatus ast
		WHERE ast.value = 'Zaadoptowane';
		UPDATE public.animals_animal aa
		SET animal_status_id = adopted_animal_status_id
		WHERE aa.id = NEW.animal_id;
		RETURN NEW;
    END;
$$ LANGUAGE 'plpgsql';

DROP TRIGGER IF EXISTS animal_adoption_set_animal_status
	ON public.adoptions_animaladoption;	
CREATE TRIGGER animal_adoption_set_animal_status
	AFTER INSERT 
	ON public.adoptions_animaladoption
	FOR EACH ROW
	EXECUTE PROCEDURE animal_adoption_set_animal_status_func();

--reservations

--OGR\18
CREATE OR REPLACE FUNCTION animal_reservation_check_animal_status_func()
RETURNS trigger AS
$$
	DECLARE
	BEGIN
		IF EXISTS (
      		SELECT 1
      		FROM public.animals_animal aa
			JOIN public.animals_animalstatus ast ON ast.id = aa.animal_status_id 
   			WHERE aa.id = NEW.animal_id AND ast.value <> 'Gotowe do adopcji'
   		)THEN
		 	RAISE EXCEPTION 'Status zwierzęcia nie pozwala na rezerwację' USING ERRCODE='09000';
		END IF;
		RETURN NEW;
    END;
$$ LANGUAGE 'plpgsql';

DROP TRIGGER IF EXISTS animal_reservation_check_animal_status
	ON public.reservations_animalreservation;	
CREATE TRIGGER animal_reservation_check_animal_status
	BEFORE INSERT 
	ON public.reservations_animalreservation
	FOR EACH ROW
	EXECUTE PROCEDURE animal_reservation_check_animal_status_func();
--OGR\18 END


--OGR\19
CREATE OR REPLACE FUNCTION animal_reservation_check_user_reservation_count_func()
RETURNS trigger AS
$$
	DECLARE
	user_reservations integer;
	BEGIN
		SELECT COUNT(*)
		INTO user_reservations
		FROM public.reservations_animalreservation ar
   		JOIN public.reservations_reservationstatus resStatus ON resStatus.id = ar.reservation_status_id 
   		WHERE  ar.user_id = NEW.user_id AND resStatus.value = 'Aktywna';
		IF user_reservations > 1
			THEN
		 		RAISE EXCEPTION 'Użytkownik osiągnął limit aktywnych rezerwacji' USING ERRCODE='09000';
		END IF;
		RETURN NEW;
    END;
$$ LANGUAGE 'plpgsql';

DROP TRIGGER IF EXISTS animal_reservation_check_user_reservation_count
	ON public.adoptions_animaladoption;	
CREATE TRIGGER animal_reservation_check_user_reservation_count
	BEFORE INSERT
	ON public.adoptions_animaladoption
	FOR EACH ROW
	EXECUTE PROCEDURE animal_reservation_check_user_reservation_count_func();
--OGR\19 END


CREATE OR REPLACE FUNCTION animal_reservation_set_animal_status_func()
RETURNS trigger AS
$$
	DECLARE
	reserved_animal_status_id integer;
	BEGIN
		SELECT ast.id
		INTO reserved_animal_status_id
		FROM public.animals_animalstatus ast
		WHERE ast.value = 'Zarezerwowane';
		UPDATE public.animals_animal aa
		SET animal_status_id = reserved_animal_status_id
		WHERE aa.id = NEW.animal_id;
		RETURN NEW;
    END;
$$ LANGUAGE 'plpgsql';

DROP TRIGGER IF EXISTS animal_reservation_set_animal_status
	ON public.reservations_animalreservation;	
CREATE TRIGGER animal_reservation_set_animal_status
	AFTER INSERT
	ON public.reservations_animalreservation
	FOR EACH ROW
	EXECUTE PROCEDURE animal_reservation_set_animal_status_func();
	


--location
--OGR\28
DROP TRIGGER IF EXISTS animal_location_end_old_animal_location
	ON public.locations_animallocation;	
CREATE TRIGGER animal_location_end_old_animal_location
	BEFORE INSERT
	ON public.locations_animallocation
	FOR EACH ROW
	EXECUTE PROCEDURE animal_adoption_set_animal_location_func();
--OGR\28 END

--OGR\29
CREATE OR REPLACE FUNCTION animal_location_check_capacity_func()
RETURNS trigger AS
$$
	DECLARE
	room_capacity integer;
	actual_animal_count integer;
	BEGIN
		SELECT r.capacity
		INTO room_capacity
		FROM public.locations_room r
   		WHERE  r.id = NEW.room_id;
		SELECT COUNT(*)
		INTO actual_animal_count
		FROM public.locations_animallocation al
   		WHERE room_id = NEW.room_id AND date_to IS NULL;
		IF actual_animal_count >= room_capacity
			THEN
		 		RAISE EXCEPTION 'Pokój jest zapełniony' USING ERRCODE='09000';
		END IF;
		RETURN NEW;
    END;
$$ LANGUAGE 'plpgsql';

DROP TRIGGER IF EXISTS animal_location_check_capacity
	ON public.locations_animallocation;	
CREATE TRIGGER animal_location_check_capacity
	BEFORE INSERT
	ON public.locations_animallocation
	FOR EACH ROW
	EXECUTE PROCEDURE animal_location_check_capacity_func();
--OGR\29 END

--users
CREATE OR REPLACE FUNCTION pesel_get_date(text) RETURNS date AS
$BODY$
    SELECT
        -- zwrocenie daty
        date (
            -- stulecie
            (CASE
                WHEN 80 < m THEN '18'
                WHEN 60 < m THEN '22'
                WHEN 40 < m THEN '21'
                WHEN 20 < m THEN '20'
                ELSE '19'
            END )::text||
            -- zawsze 2 cyfry
            lpad(y::text, 2, '0')||
            '-'||
            -- wyciagniecie miesiaca
            -- zawsze 2 cyfry
            lpad((CASE
                WHEN 80 < m THEN m-80
                WHEN 60 < m THEN m-60
                WHEN 40 < m THEN m-40
                WHEN 20 < m THEN m-20
                ELSE m
            END )::text, 2, '0')||
            '-'||
            d::text
        )
    FROM (
        SELECT substring($1 FROM 1 FOR 2)::int AS y, substring($1 FROM 3 FOR 2)::int AS m, substring($1 FROM 5 FOR 2)::int AS d
    ) AS elements;
$BODY$
LANGUAGE 'sql' IMMUTABLE;
ALTER FUNCTION pesel_get_date ( text ) OWNER TO postgres;

--czy użytkownik jest pełnoletni
CREATE OR REPLACE FUNCTION animal_reservation_check_user_age_func()
RETURNS trigger AS
$$
	DECLARE
	BEGIN
		IF EXISTS (
			select uu.id
			from public.users_user uu
      		where date_part('year', age(NOW()::date, pesel_get_date (uu.pesel))) < 18
			AND uu.id = NEW.user_id
   		)THEN
		 	RAISE EXCEPTION 'Użytkownik jest niepełnoletni' USING ERRCODE='09000';
		END IF;
		RETURN NEW;
    END;
$$ LANGUAGE 'plpgsql';

DROP TRIGGER IF EXISTS animal_reservation_check_user_age
	ON public.reservations_animalreservation;	
CREATE TRIGGER animal_reservation_check_user_age
	BEFORE INSERT 
	ON public.reservations_animalreservation
	FOR EACH ROW
	EXECUTE PROCEDURE animal_reservation_check_user_age_func();


CREATE OR REPLACE FUNCTION pesel_generate_check_digit(text)
  RETURNS integer AS
$BODY$
    -- wyciagniecie ostatniej cyfry z sumy pomnozonych cyfr numery pesel przez odpowiednia wage
    SELECT MOD(10 - SUBSTR(s, char_length(s),1)::int, 10)::int FROM (
        SELECT
            sum((ARRAY[1,3,7,9,1,3,7,9,1,3])[n]*digit)::text as s
        FROM (
            SELECT
                -- wyciegniecie ntej cyfry
                -- MOD( ( SUBSTRING($1::text FROM 0 FOR 11)::bigint / (10^n)::int8 ), 10::int8) AS digit, n
                SUBSTRING($1 FROM n FOR 1)::bigint AS digit, n
            FROM
                generate_series(1, 10) AS n
        ) AS foo
    ) AS foo2;
$BODY$
  LANGUAGE 'sql' IMMUTABLE;
ALTER FUNCTION pesel_generate_check_digit(text) OWNER TO postgres;


CREATE OR REPLACE FUNCTION pesel_is_valid(text) RETURNS BOOLEAN AS
$BODY$
    -- wyciagniecie cyfry kontrolej i porownanie jej z wygenerowana cyfra
    SELECT (SUBSTRING(lpad($1,11,'0') FROM 11 )) = pesel_generate_check_digit(SUBSTRING($1 FROM 0 FOR 11))::text;
$BODY$
LANGUAGE 'sql' IMMUTABLE;
ALTER FUNCTION pesel_is_valid ( text ) OWNER TO postgres;



--czy pesel jest odpowiedni
CREATE OR REPLACE FUNCTION user_user_check_pesel_func()
RETURNS trigger AS
$$
	DECLARE
	BEGIN
		IF not pesel_is_valid (NEW.pesel)
		THEN
		 	RAISE EXCEPTION 'Pesel jest niepoprawny' USING ERRCODE='09000';
		END IF;
		RETURN NEW;
    END;
$$ LANGUAGE 'plpgsql';

DROP TRIGGER IF EXISTS user_user_check_pesel
	ON public.users_user;	
CREATE TRIGGER user_user_check_pesel
	BEFORE INSERT OR UPDATE
	ON public.users_user
	FOR EACH ROW
	EXECUTE PROCEDURE user_user_check_pesel_func();


CREATE OR REPLACE FUNCTION make_animal_ready_for_adoption (animal_id bigint) RETURNS void
LANGUAGE plpgsql
AS $$
declare
reservation_status_ready_for_adoption_id integer;
begin
	SELECT id
	INTO reservation_status_ready_for_adoption_id
	FROM public.animals_animalstatus
	WHERE value = 'Gotowe do adopcji';
	UPDATE public.animals_animal
	SET animal_status_id = reservation_status_ready_for_adoption_id
	WHERE id = animal_id;
end;
$$;
ALTER FUNCTION make_animal_ready_for_adoption (animal_id bigint) OWNER TO postgres;

CREATE OR REPLACE FUNCTION make_reservation_expired (reservation_id bigint) RETURNS void
LANGUAGE plpgsql
AS $$
declare
reservation_status_expired_id integer;
begin
	SELECT rrs.id
	INTO reservation_status_expired_id
	FROM public.reservations_reservationstatus as rrs
	WHERE value = 'Anulowana';
	UPDATE public.reservations_animalreservation
	SET reservation_status_id = reservation_status_expired_id
	WHERE id = reservation_id;
end;
$$;
ALTER FUNCTION make_reservation_expired  (reservation_id bigint) OWNER TO postgres;

CREATE OR REPLACE FUNCTION update_reservation_statuses () RETURNS void
LANGUAGE plpgsql
AS $$
begin
	PERFORM make_reservation_expired(rar.id), make_animal_ready_for_adoption(rar.animal_id)
	FROM public.reservations_animalreservation as rar
	WHERE date_part('day', age(NOW()::date, date)) > 2;
end;
$$;
ALTER FUNCTION update_reservation_statuses () OWNER TO postgres;


CREATE OR REPLACE FUNCTION animal_reservations_set_animal_status_after_cancell_func()
RETURNS trigger AS
$$
	DECLARE
	reservation_status_cancelled_id integer;
	 reservation_status_ready_for_adoption_id integer;
	BEGIN
		SELECT rrs.id
		INTO reservation_status_cancelled_id
		FROM public.reservations_reservationstatus rrs
		WHERE rrs.value = 'Anulowana';
		SELECT id
		INTO reservation_status_ready_for_adoption_id
		FROM public.animals_animalstatus
		WHERE value = 'Gotowe do adopcji';
		IF NEW.reservation_status_id = reservation_status_cancelled_id
		THEN
			UPDATE public.animals_animal
			SET animal_status_id = reservation_status_ready_for_adoption_id
			WHERE id = NEW.animal_id;
		END IF;
		RETURN NEW;
    END;
$$ LANGUAGE 'plpgsql';

DROP TRIGGER IF EXISTS animal_reservations_set_animal_status_after_cancell
	ON public.reservations_animalreservation;
CREATE TRIGGER animal_reservations_set_animal_status_after_cancell
	AFTER UPDATE
	ON public.reservations_animalreservation
	FOR EACH ROW
	EXECUTE PROCEDURE animal_reservations_set_animal_status_after_cancell_func();

END --COMMIT
$triggers$;

--TRIGGERS END





