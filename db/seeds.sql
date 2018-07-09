


/*
    // sequelize does have datatype value TIMESTAMP. add this column aftr the User table is created.
    // created_dt: {
    //   type: TIMESTAMP,
    //   allowNull: false, 
    //   defaultValue: CURRENT_TIMESTAMP
    // }

    */

insert into lookup_events
  (event_name, description, image_name, image_stored_at) VALUES
  ('Vikings', 'The best in mid-west', 'vikings', '/images/pref_imgs/vikings.png');
insert into lookup_events (event_name, description, image_name, image_stored_at) VALUES 
('Twins', 'The baseball team in twin cities', 'twins', '/images/pref_imgs/twins.png');

insert into lookup_events
  (event_name, description, image_name, image_stored_at) VALUES
  ('Timberwolves', 'The best in mid-west', 'timberwolves', '/images/pref_imgs/wolves.png');
insert into lookup_events (event_name, description, image_name, image_stored_at) VALUES 
('Wilds', 'The team wild', 'wild', '/images/pref_imgs/wild.png');

insert into lookup_events
  (event_name, description, image_name, image_stored_at) VALUES
  ('United', 'The Team UNITED', 'united', '/images/pref_imgs/united.png');
insert into lookup_events (event_name, description, image_name, image_stored_at) VALUES 
('Saints', 'The team Saints', 'saints', '/images/pref_imgs/saints.png');

insert into lookup_events (event_name, description, image_name, image_stored_at) VALUES 
('Lynx', 'The team Lynx', 'lynx', '/images/pref_imgs/lynx.png');

insert into lookup_events
  (event_name, description, image_name, image_stored_at) VALUES
  ('Gophers', 'The Team Gophers', 'gophers', '/images/pref_imgs/gophers.png');




-- user_interest
INSERT into  user_interests (user_id, lookup_event_id) VALUES (1, 1);
INSERT into  user_interests (user_id, lookup_event_id) VALUES (1, 2);
INSERT into  user_interests (user_id, lookup_event_id) VALUES (1, 3);
INSERT into  user_interests (user_id, lookup_event_id) VALUES (1, 4);
INSERT into  user_interests (user_id, lookup_event_id) VALUES (1, 5);


        

1	Vikings	Minneapolis	1350.00	You will not get another chance to buy this tickets at this price.	2018-07-05 04:54:22	2018-07-05 04:54:22	1
2	Timberwolves	Minneapolis	870.00	This team is growing fast.	2018-07-05 04:55:14	2018-07-05 04:55:14	1
3	Saints	Miami	560.00	The regular tema	2018-07-05 04:55:56	2018-07-05 04:55:56	1
							