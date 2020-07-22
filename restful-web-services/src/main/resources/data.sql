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

INSERT INTO employee(id, username, employee_name, position, level, start_date, shift_limit_weekly)
VALUES(10004, 'Mazarine Coffee', 'Stella', 'Barista', 4, sysdate(), 3);

INSERT INTO employee(id, username, employee_name, position, level, start_date, shift_limit_weekly)
VALUES(10005, 'Mazarine Coffee', 'Lis', 'Barista', 4, sysdate(), 5);

INSERT INTO employee(id, username, employee_name, position, level, start_date, shift_limit_weekly)
VALUES(10006, 'Mazarine Coffee', 'Annie', 'Barista', 1, sysdate(), 3);

INSERT INTO employee(id, username, employee_name, position, level, start_date, shift_limit_weekly)
VALUES(10007, 'Mazarine Coffee', 'Filmore', 'Barista', 2, sysdate(), 5);

INSERT INTO employee(id, username, employee_name, position, level, start_date, shift_limit_weekly)
VALUES(10008, 'Mazarine Coffee', 'BlueBottle', 'Barista', 2, sysdate(), 4);

INSERT INTO employee(id, username, employee_name, position, level, start_date, shift_limit_weekly)
VALUES(10009, 'Mazarine Coffee', 'ASha', 'Barista', 0, sysdate(), 3);



INSERT INTO availibility_weekly(id, username, av_mon, av_tue, av_wed, av_thur, av_fri, av_sat, av_sun)
VALUES(10001, 'Mazarine Coffee', 1, 1, 2, 2, 1, 0, 0);

INSERT INTO availibility_weekly(id, username, av_mon, av_tue, av_wed, av_thur, av_fri, av_sat, av_sun)
VALUES(10002, 'Mazarine Coffee', 4, 0, 0, 1, 1, 0, 0);

INSERT INTO availibility_weekly(id, username, av_mon, av_tue, av_wed, av_thur, av_fri, av_sat, av_sun)
VALUES(10003, 'Mazarine Coffee', 0, 4, 1, 0, 0, 1, 2);

INSERT INTO availibility_weekly(id, username, av_mon, av_tue, av_wed, av_thur, av_fri, av_sat, av_sun)
VALUES(10004, 'Mazarine Coffee', 5, -1, 5, 3, 1, 0, 0);

INSERT INTO availibility_weekly(id, username, av_mon, av_tue, av_wed, av_thur, av_fri, av_sat, av_sun)
VALUES(10005, 'Mazarine Coffee', -1, 5, 4, 1, 1, 0, 0);

INSERT INTO availibility_weekly(id, username, av_mon, av_tue, av_wed, av_thur, av_fri, av_sat, av_sun)
VALUES(10006, 'Mazarine Coffee', 3, 3, 6, 0, 0, 1, 2);

INSERT INTO availibility_weekly(id, username, av_mon, av_tue, av_wed, av_thur, av_fri, av_sat, av_sun)
VALUES(10007, 'Mazarine Coffee', 6, 2, 3, 2, 1, 0, 0);

INSERT INTO availibility_weekly(id, username, av_mon, av_tue, av_wed, av_thur, av_fri, av_sat, av_sun)
VALUES(10008, 'Mazarine Coffee', 2, 6, 3, 1, 1, 0, 0);

INSERT INTO availibility_weekly(id, username, av_mon, av_tue, av_wed, av_thur, av_fri, av_sat, av_sun)
VALUES(10009, 'Mazarine Coffee', 6, 3, 6, 0, 0, 1, 2);



INSERT INTO shift(id, username, description, position, level, time_slot, day_of_week, note, assigned_id)
VALUES(1, 'Mazarine Coffee', 'Opening shift. Responsible for dailing expresso shots and preparing expresso beverage', 
'Barista', 4, 0, 1, 'Please remember to get registers and drip coffee ready before 7am.', -1);

INSERT INTO shift(id, username, description, position, level, time_slot, day_of_week, note, assigned_id)
VALUES(2, 'Mazarine Coffee', 'Morning milk shift. Responsible for preparing expresso drinks with shot barista, and serve other beverages.', 
'Barista', 2, 1, 1, 'Notice register if wait time is more than 10 mins.', -1);

INSERT INTO shift(id, username, description, position, level, time_slot, day_of_week, note, assigned_id)
VALUES(3, 'Mazarine Coffee', 'Morning junior shift. Responsible for taking orders and prepare pourover and other beverages.', 
'Barista', 1, 2, 1, 'Organize tickets.', -1);

INSERT INTO shift(id, username, description, position, level, time_slot, day_of_week, note, assigned_id)
VALUES(4, 'Mazarine Coffee', 'Morning junior shift. Responsible for taking orders and prepare beverage when it is possible.', 
'Barista', 0, 3, 1, '...', -1);

INSERT INTO shift(id, username, description, position, level, time_slot, day_of_week, note, assigned_id)
VALUES(5, 'Mazarine Coffee', 'Closing shift. Responsible for preparing expresso beverage and cleaning machines.', 
'Barista', 3, 4, 1, 'last call.', -1);

INSERT INTO shift(id, username, description, position, level, time_slot, day_of_week, note, assigned_id)
VALUES(6, 'Mazarine Coffee', 'Closing milk shift. Responsible for preparing expresso drinks with shot barista, and serve other beverages.', 
'Barista', 2, 5, 1, 'Notice register if wait time is more than 10 mins; organize tickets.', -1);

INSERT INTO shift(id, username, description, position, level, time_slot, day_of_week, note, assigned_id)
VALUES(7, 'Mazarine Coffee', 'Closing junior shift. Responsible for taking orders and prepare pourover and other beverages.', 
'Barista', 1, 6, 1, 'Closing registers.', -1);


INSERT INTO shift(id, username, description, position, level, time_slot, day_of_week, note, assigned_id)
VALUES(8, 'Mazarine Coffee', 'Opening shift. Responsible for dailing expresso shots and preparing expresso beverage', 
'Barista', 4, 0, 2, 'Please remember to get registers and drip coffee ready before 7am.', -1);

INSERT INTO shift(id, username, description, position, level, time_slot, day_of_week, note, assigned_id)
VALUES(9, 'Mazarine Coffee', 'Morning milk shift. Responsible for preparing expresso drinks with shot barista, and serve other beverages.', 
'Barista', 2, 1, 2, 'Notice register if wait time is more than 10 mins.', -1);

INSERT INTO shift(id, username, description, position, level, time_slot, day_of_week, note, assigned_id)
VALUES(10, 'Mazarine Coffee', 'Morning junior shift. Responsible for taking orders and prepare pourover and other beverages.', 
'Barista', 1, 2, 2, 'Organize tickets.', -1);

INSERT INTO shift(id, username, description, position, level, time_slot, day_of_week, note, assigned_id)
VALUES(11, 'Mazarine Coffee', 'Morning junior shift. Responsible for taking orders and prepare beverage when it is possible.', 
'Barista', 0, 3, 2, '...', -1);

INSERT INTO shift(id, username, description, position, level, time_slot, day_of_week, note, assigned_id)
VALUES(12, 'Mazarine Coffee', 'Closing shift. Responsible for preparing expresso beverage and cleaning machines.', 
'Barista', 3, 4, 2, 'last call.', -1);

INSERT INTO shift(id, username, description, position, level, time_slot, day_of_week, note, assigned_id)
VALUES(13, 'Mazarine Coffee', 'Closing milk shift. Responsible for preparing expresso drinks with shot barista, and serve other beverages.', 
'Barista', 2, 5, 2, 'Notice register if wait time is more than 10 mins; organize tickets.', -1);

INSERT INTO shift(id, username, description, position, level, time_slot, day_of_week, note, assigned_id)
VALUES(14, 'Mazarine Coffee', 'Closing junior shift. Responsible for taking orders and prepare pourover and other beverages.', 
'Barista', 1, 6, 2, 'Closing registers.', -1);


INSERT INTO shift(id, username, description, position, level, time_slot, day_of_week, note, assigned_id)
VALUES(15, 'Mazarine Coffee', 'Opening shift. Responsible for dailing expresso shots and preparing expresso beverage', 
'Barista', 4, 0, 3, 'Please remember to get registers and drip coffee ready before 7am.', -1);

INSERT INTO shift(id, username, description, position, level, time_slot, day_of_week, note, assigned_id)
VALUES(16, 'Mazarine Coffee', 'Morning milk shift. Responsible for preparing expresso drinks with shot barista, and serve other beverages.', 
'Barista', 2, 1, 3, 'Notice register if wait time is more than 10 mins.', -1);

INSERT INTO shift(id, username, description, position, level, time_slot, day_of_week, note, assigned_id)
VALUES(17, 'Mazarine Coffee', 'Morning junior shift. Responsible for taking orders and prepare pourover and other beverages.', 
'Barista', 1, 2, 3, 'Organize tickets.', -1);

INSERT INTO shift(id, username, description, position, level, time_slot, day_of_week, note, assigned_id)
VALUES(18, 'Mazarine Coffee', 'Morning junior shift. Responsible for taking orders and prepare beverage when it is possible.', 
'Barista', 0, 3, 3, '...', -1);

INSERT INTO shift(id, username, description, position, level, time_slot, day_of_week, note, assigned_id)
VALUES(19, 'Mazarine Coffee', 'Closing shift. Responsible for preparing expresso beverage and cleaning machines.', 
'Barista', 3, 4, 3, 'last call.', -1);

INSERT INTO shift(id, username, description, position, level, time_slot, day_of_week, note, assigned_id)
VALUES(20, 'Mazarine Coffee', 'Closing milk shift. Responsible for preparing expresso drinks with shot barista, and serve other beverages.', 
'Barista', 2, 5, 3, 'Notice register if wait time is more than 10 mins; organize tickets.', -1);

INSERT INTO shift(id, username, description, position, level, time_slot, day_of_week, note, assigned_id)
VALUES(21, 'Mazarine Coffee', 'Closing junior shift. Responsible for taking orders and prepare pourover and other beverages.', 
'Barista', 1, 6, 3, 'Closing registers.', -1);