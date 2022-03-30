create database if not exists `shop` default CHARACTER set utf8;

use shop;

create table if not exists `commodities` (
  `id` int unsigned auto_increment,
  `title` varchar(100) not null,
  `price` float default 0, 
  `price_unit` varchar(10) not null,
  `count` int not null,
  primary key (`id`)
) engine=InnoDB default charset=utf8;

create table if not exists `orders` (
  `id` int unsigned auto_increment,
  `buyCount` int not null,
  `total_price` float default 0,
  `fare` float default 0,
  `created` int not null, 
  `phone` varchar(20) not null,
  `name` varchar(50) not null,
  `address` varchar(100) not null,
  `remarks` varchar(200),
  `commodities` varchar(200),
  primary key (`id`)
) engine=InnoDB default charset=utf8;

create table if not exists `order_state` (
  `id` int unsigned auto_increment,
  `state` int not null,
  `desc` varchar(20) not null,
  primary key (`id`)
) engine=InnoDB default charset=utf8;

insert into order_state (state, `desc`) values (0, 'TO_BE_PAY');
insert into order_state (state, `desc`) values (1, 'TO_BE_SHIPPED');
insert into order_state (state, `desc`) values (2, 'TO_BE_REFUNDED');
insert into order_state (state, `desc`) values (3, 'TO_BE_RETURNED');
insert into order_state (state, `desc`) values (4, 'DONE');
insert into order_state (state, `desc`) values (5, 'CANNEL');
insert into order_state (state, `desc`) values (6, 'DEL');

insert into commodities (`title`, `price`, `price_unit`, `count`) values ('测试商品', 12.22, '公斤', 100);
insert into commodities (`title`, `price`, `price_unit`, `count`) values ('测试商品', 12.22, '公斤', 100);
insert into commodities (`title`, `price`, `price_unit`, `count`) values ('测试商品', 12.22, '公斤', 100);
insert into commodities (`title`, `price`, `price_unit`, `count`) values ('测试商品', 12.22, '公斤', 100);
insert into commodities (`title`, `price`, `price_unit`, `count`) values ('测试商品', 12.22, '公斤', 100);
insert into commodities (`title`, `price`, `price_unit`, `count`) values ('测试商品', 12.22, '公斤', 100);
insert into commodities (`title`, `price`, `price_unit`, `count`) values ('测试商品', 12.22, '公斤', 100);
insert into commodities (`title`, `price`, `price_unit`, `count`) values ('测试商品', 12.22, '公斤', 100);
insert into commodities (`title`, `price`, `price_unit`, `count`) values ('测试商品', 12.22, '公斤', 100);
insert into commodities (`title`, `price`, `price_unit`, `count`) values ('测试商品', 12.22, '公斤', 100);
