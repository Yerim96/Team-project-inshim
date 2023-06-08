create database inshim;
show databases;
use inshim;
show tables;

CREATE TABLE userinfo (
	userinfo_id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
	user_id VARCHAR(20) NOT NULL,
	user_pw VARCHAR(20) NOT NULL,
	user_name VARCHAR(20) NOT NULL,
	user_country VARCHAR(20) NOT NULL
);

CREATE TABLE route (
	route_id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
	route_city VARCHAR(20) NOT NULL,
	route_day VARCHAR(20) NOT NULL,
	route_start VARCHAR(20) NOT NULL
);

CREATE TABLE essay (
    userinfo_id INT NOT NULL,
    essay_comment TEXT NOT NULL,
    essay_day DATE NOT NULL,
    essay_star INT NOT NULL,
    route_id INT NOT NULL,
	FOREIGN KEY (userinfo_id) REFERENCES userinfo (userinfo_id) ON UPDATE CASCADE On DELETE CASCADE,
    FOREIGN KEY (route_id) REFERENCES route (route_id) ON UPDATE CASCADE On DELETE CASCADE
);

CREATE TABLE fav (
    userinfo_id INT NOT NULL,
    route_id INT NOT NULL,
    FOREIGN KEY (userinfo_id) REFERENCES userinfo (userinfo_id) ON UPDATE CASCADE On DELETE CASCADE,
    FOREIGN KEY (route_id) REFERENCES route (route_id) ON UPDATE CASCADE On DELETE CASCADE
);

CREATE TABLE detail (
    route_id INT NOT NULL,
    detail_comment TEXT NOT NULL,
    detail_pic TEXT NOT NULL,
    FOREIGN KEY (route_id) REFERENCES route (route_id) ON UPDATE CASCADE On DELETE CASCADE
);

desc userinfo;

insert into userinfo (user_id, user_pw, user_name, user_country) values ('hyeon', '1234', '이용자', '북한');
insert into route (route_city, route_day, route_start) values
('서울', '1박2일',''),
('서울', '2박3일',''),
('부산', '1박2일',''),
('부산', '2박3일',''),
('제주도','1박2일',''),
('제주도','2박3일','');

insert into detail(route_id, detail_comment, detail_pic) values
(1, '홍대, 압구정, 강남', ''),
(2, '을지로, 강남, 강북여의도, 신촌', ''),
(3, '송도케이블카, 광안리', ''),
(4, '광안대교, 아쿠아리움, 깡통시장', ''),
(5, '제주도1', ''),
(6, '제주도2', '');

select * from userinfo;
select * from route;
select * from fav;
select * from detail;
select * from essay;

desc detail;
desc fav;

drop table detail;
drop table route;
drop table userinfo;
drop table essay;
drop table fav;