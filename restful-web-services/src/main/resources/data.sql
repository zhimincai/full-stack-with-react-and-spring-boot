INSERT INTO todo(id, username, description, complete, target_date, note)
VALUES(10001, 'bbchai', 'Learn JPA', false, sysdate(), '...');

INSERT INTO todo(id, username, description, complete, target_date, note)
VALUES(10002, 'bbchai', 'Learn Data Spring', false, sysdate(), '...');

INSERT INTO todo(id, username, description, complete, target_date, note)
VALUES(10003, 'bbchai', 'Learn MicroServices', false, sysdate(), '...');



/* level 1-4: register, pourover, milk, shot*/
INSERT INTO employee(id, username, employee_name, position, level, start_date, shift_limit_weekly)
VALUES(10001, 'Mazarine Coffee', 'Chin', 'Manager', 4, sysdate(), 5);

INSERT INTO employee(id, username, employee_name, position, level, start_date, shift_limit_weekly)
VALUES(10002, 'Mazarine Coffee', 'Cindy', 'Barista', 4, sysdate(), 4);

INSERT INTO employee(id, username, employee_name, position, level, start_date, shift_limit_weekly)
VALUES(10003, 'Mazarine Coffee', 'Jimmy', 'Barista', 4, sysdate(), 3);



INSERT INTO availibility_weekly(id, username, av_mon, av_tue, av_wed, av_thur, av_fri, av_sat, av_sun)
VALUES(10001, 'Mazarine Coffee', 1, 1, 2, 2, 1, 0, 0);

INSERT INTO availibility_weekly(id, username, av_mon, av_tue, av_wed, av_thur, av_fri, av_sat, av_sun)
VALUES(10002, 'Mazarine Coffee', 1, 1, 0, 1, 1, 0, 0);

INSERT INTO availibility_weekly(id, username, av_mon, av_tue, av_wed, av_thur, av_fri, av_sat, av_sun)
VALUES(10003, 'Mazarine Coffee', 2, 2, 1, 0, 0, 1, 2);

